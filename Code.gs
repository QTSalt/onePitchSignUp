/**
 * The One Pitch Showdown — registration intake script.
 *
 * SETUP:
 * 1. Create a new Google Sheet (e.g. "One Pitch Showdown Registrations").
 * 2. In that Sheet: Extensions > Apps Script.
 * 3. Delete any starter code in the editor and paste this whole file in.
 * 4. Run the `setupSheet` function once (select it in the dropdown next to
 *    the Run button, click Run) to add the header row and authorize the
 *    script. Approve the permission prompts — they're just this script
 *    accessing this one Sheet.
 * 5. Click Deploy > New deployment.
 *      - Select type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy and authorize again if prompted.
 * 6. Copy the "Web app URL" it gives you (ends in /exec).
 * 7. Paste that URL into index.html, replacing the SCRIPT_URL placeholder
 *    near the top of the <script> block at the bottom of the page.
 *
 * That's it — every form submission will append a new row to this Sheet.
 */

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow([
    'Timestamp',
    'Team Name',
    "Coach's Name",
    'Email',
    'Phone',
    'Notes',
  ]);
  sheet.setFrozenRows(1);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = (e && e.parameter) || {};

  sheet.appendRow([
    new Date(),
    data.teamName || '',
    data.coachName || '',
    data.email || '',
    data.phone || '',
    data.notes || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you sanity-check the deployment URL in a browser tab
// (visiting it directly does a GET, not a POST, so it won't add a row).
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'The One Pitch Showdown intake is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
