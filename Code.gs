/**
 * One Pitch-No Bitch — registration intake script.
 *
 * Handles two kinds of submissions from the site, each appended to its own
 * tab in this spreadsheet, and sends the submitter a confirmation email:
 *   - Team registrations   (src/components/RegisterForm.jsx)   → "Team Registrations" tab
 *   - Free agent sign-ups  (src/components/FreeAgentForm.jsx)  → "Free Agents" tab
 *
 * SETUP:
 * 1. Create a new Google Sheet (e.g. "One Pitch-No Bitch Registrations").
 * 2. In that Sheet: Extensions > Apps Script.
 * 3. Delete any starter code in the editor and paste this whole file in.
 * 4. Run the `setupSheet` function once (select it in the dropdown next to
 *    the Run button, click Run) to create both tabs with header rows and
 *    authorize the script. Approve the permission prompts — this now
 *    includes "Send email as you", since confirmation emails are sent via
 *    MailApp from the same Google account that owns this Sheet/script.
 * 5. Click Deploy > New deployment.
 *      - Select type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy and authorize again if prompted.
 * 6. Copy the "Web app URL" it gives you (ends in /exec).
 * 7. Paste that URL into src/lib/scriptUrl.js, replacing the SCRIPT_URL
 *    placeholder. Both the team registration form and the free agent form
 *    read from that one file, so you only need to paste it once.
 *
 * That's it — every form submission appends a row to the matching tab in
 * this Sheet AND emails the submitter a confirmation.
 *
 * "Paid" (both tabs) and "Assigned Team" (Free Agents only) are manual
 * tracking columns — the form never fills them in. Check/update them by
 * hand in the Sheet as payments come in and free agents get placed.
 *
 * IMPORTANT: setupSheet() clears each tab before writing headers. Only
 * (re)run it on a brand-new Sheet. If you already have live registrations
 * and just need these new columns, add "Paid" / "Assigned Team" as headers
 * directly in the Sheet UI instead — don't re-run setupSheet, or you'll
 * wipe existing rows.
 *
 * Note on email quota: MailApp.sendEmail() sends from the Google account
 * that owns this script. A regular Gmail account gets ~100 emails/day;
 * a Google Workspace account gets ~1,500/day. With an 8-team cap plus a
 * modest free agent pool, this tournament won't come close to either.
 */

// Keep these in sync with the matching values in src/data/tournament.js —
// Apps Script can't import that file directly, so the handful of details
// used in the confirmation emails are duplicated here. Update both places
// if the date, price, deadline, payment info, or contact info changes.
var TOURNAMENT = {
  name: 'One Pitch-No Bitch',
  organizer: 'Quinntessential Softball',
  date: 'September 26, 2026',
  location: 'Lower Woodlands Ballfield (Field 3 & Field 6)',
  entryFeeUSD: 250,
  freeAgentFeeUSD: 25,
  paymentDeadline: 'September 19, 2026',
  paymentMemoNote: "Team Name and Coach's Last Name",
  paymentOptions: [
    'CashApp: $ThomasPeel (https://cash.app/$ThomasPeel)',
    'Venmo: scan the QR code on the registration page',
    'Cash: contact the Tournament Director to arrange',
  ],
  contactName: 'Quinn',
  contactEmail: 'emailquinnpeel@gmail.com',
  contactPhone: '801-834-0974',
};

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  setupTab_(ss, 'Team Registrations', [
    'Timestamp',
    'Team Name',
    "Coach's Name",
    'Email',
    'Phone',
    'Notes',
    'Paid',
  ]);

  setupTab_(ss, 'Free Agents', [
    'Timestamp',
    'Player Name',
    'Gender',
    'Email',
    'Phone',
    'Experience / Notes',
    'Assigned Team',
    'Paid',
  ]);
}

function setupTab_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  sheet.clear();
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  var data = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.formType === 'freeAgent') {
    var freeAgentSheet = getOrCreateSheet_(ss, 'Free Agents', [
      'Timestamp',
      'Player Name',
      'Gender',
      'Email',
      'Phone',
      'Experience / Notes',
      'Assigned Team',
      'Paid',
    ]);
    freeAgentSheet.appendRow([
      new Date(),
      data.playerName || '',
      data.gender || '',
      data.email || '',
      data.phone || '',
      data.notes || '',
      '', // Assigned Team — filled in by hand once a captain claims this player
      '', // Paid — filled in by hand once the $25 placement fee is received
    ]);
    sendFreeAgentConfirmationEmail_(data);
  } else {
    var teamSheet = getOrCreateSheet_(ss, 'Team Registrations', [
      'Timestamp',
      'Team Name',
      "Coach's Name",
      'Email',
      'Phone',
      'Notes',
      'Paid',
    ]);
    teamSheet.appendRow([
      new Date(),
      data.teamName || '',
      data.coachName || '',
      data.email || '',
      data.phone || '',
      data.notes || '',
      '', // Paid — filled in by hand once the entry fee is received
    ]);
    sendTeamConfirmationEmail_(data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you sanity-check the deployment URL in a browser tab
// (visiting it directly does a GET, not a POST, so it won't add a row).
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'One Pitch-No Bitch intake is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Emails a team registration confirmation. Wrapped in try/catch so that an
 * email hiccup (bad address, quota, etc.) never stops the row from being
 * saved — the Sheet is always the source of truth.
 */
function sendTeamConfirmationEmail_(data) {
  if (!data.email) return;

  var subject = "You're registered for " + TOURNAMENT.name + '! 🥎';
  var body =
    'Hi ' + (data.coachName || 'there') + ',\n\n' +
    'Thanks for registering "' + (data.teamName || 'your team') + '" for ' + TOURNAMENT.name +
    ', hosted by ' + TOURNAMENT.organizer + '!\n\n' +
    'IMPORTANT — this form reserves nothing on its own. Your spot is not guaranteed until your $' +
    TOURNAMENT.entryFeeUSD + ' entry fee is paid in full ("No Pay, No Play"), before the deadline of ' +
    TOURNAMENT.paymentDeadline + '. Registration closes automatically once 8 teams have paid.\n\n' +
    'Event details:\n' +
    '  Date: ' + TOURNAMENT.date + '\n' +
    '  Location: ' + TOURNAMENT.location + '\n\n' +
    'How to pay (include the memo "' + TOURNAMENT.paymentMemoNote + '"):\n' +
    '  - ' + TOURNAMENT.paymentOptions.join('\n  - ') + '\n\n' +
    "We'll follow up once we've confirmed your payment. Questions? Reach out any time:\n" +
    '  ' + TOURNAMENT.contactName + ' — ' + TOURNAMENT.contactEmail + ' — ' + TOURNAMENT.contactPhone + '\n\n' +
    'See you on the field,\n' +
    TOURNAMENT.organizer;

  try {
    MailApp.sendEmail(data.email, subject, body);
  } catch (err) {
    Logger.log('Failed to send team confirmation email to ' + data.email + ': ' + err);
  }
}

/**
 * Emails a free agent sign-up confirmation. Same try/catch guard as above.
 */
function sendFreeAgentConfirmationEmail_(data) {
  if (!data.email) return;

  var subject = "You're on the Free Agent list for " + TOURNAMENT.name + '! 🥎';
  var body =
    'Hi ' + (data.playerName || 'there') + ',\n\n' +
    "You're now in the Free Agent pool for " + TOURNAMENT.name + ', hosted by ' + TOURNAMENT.organizer + '.\n\n' +
    "This doesn't guarantee you a roster spot — team captains short on players can browse the pool and " +
    "reach out to you directly. If enough free agents sign up on their own to field a full team, we'll " +
    "group you together.\n\n" +
    'Your $' + TOURNAMENT.freeAgentFeeUSD + ' fee is only due once you\'re actually placed on a team — ' +
    "nothing is charged now.\n\n" +
    'Event details:\n' +
    '  Date: ' + TOURNAMENT.date + '\n' +
    '  Location: ' + TOURNAMENT.location + '\n\n' +
    "We'll be in touch if a team wants you. Questions? Reach out any time:\n" +
    '  ' + TOURNAMENT.contactName + ' — ' + TOURNAMENT.contactEmail + ' — ' + TOURNAMENT.contactPhone + '\n\n' +
    'See you on the field,\n' +
    TOURNAMENT.organizer;

  try {
    MailApp.sendEmail(data.email, subject, body);
  } catch (err) {
    Logger.log('Failed to send free agent confirmation email to ' + data.email + ': ' + err);
  }
}
