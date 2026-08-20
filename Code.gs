/**
 * One Pitch-No Bitch — registration intake script.
 *
 * Handles two kinds of submissions from the site, each appended to its own
 * tab in this spreadsheet:
 *   - Team registrations   (src/components/RegisterForm.jsx)   → "Team Registrations" tab
 *   - Free agent sign-ups  (src/components/FreeAgentForm.jsx)  → "Free Agents" tab
 *
 * SETUP:
 * 1. Create a new Google Sheet (e.g. "One Pitch-No Bitch Registrations").
 * 2. In that Sheet: Extensions > Apps Script.
 * 3. Delete any starter code in the editor and paste this whole file in.
 * 4. Run the `setupSheet` function once (select it in the dropdown next to
 *    the Run button, click Run) to create both tabs with header rows and
 *    authorize the script. Approve the permission prompts — they're just
 *    this script accessing this one Sheet.
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
 * That's it — every form submission will append a new row to the matching
 * tab in this Sheet.
 */

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  setupTab_(ss, 'Team Registrations', [
    'Timestamp',
    'Team Name',
    "Coach's Name",
    'Email',
    'Phone',
    'Notes',
  ]);

  setupTab_(ss, 'Free Agents', [
    'Timestamp',
    'Player Name',
    'Gender',
    'Email',
    'Phone',
    'Experience / Notes',
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
    ]);
    freeAgentSheet.appendRow([
      new Date(),
      data.playerName || '',
      data.gender || '',
      data.email || '',
      data.phone || '',
      data.notes || '',
    ]);
  } else {
    var teamSheet = getOrCreateSheet_(ss, 'Team Registrations', [
      'Timestamp',
      'Team Name',
      "Coach's Name",
      'Email',
      'Phone',
      'Notes',
    ]);
    teamSheet.appendRow([
      new Date(),
      data.teamName || '',
      data.coachName || '',
      data.email || '',
      data.phone || '',
      data.notes || '',
    ]);
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
