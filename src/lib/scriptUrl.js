// ---------------------------------------------------------------------
// Google Sheet hookup — shared by RegisterForm.jsx and FreeAgentForm.jsx
// ---------------------------------------------------------------------
// 1. Set up the companion Google Apps Script (see Code.gs at the repo
//    root) bound to a Google Sheet, then deploy it as a Web App
//    ("Execute as: Me", "Who has access: Anyone").
// 2. Paste the deployment URL below, replacing the placeholder.
//    It looks like: https://script.google.com/macros/s/AKfycb.../exec
export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDfhUE8H8sk3aqTwe3yB8o4dC8chMCDcWXLKSF8sgNaF-sDI1bawkN7mO_rgpdlJ0ElA/exec'
// ---------------------------------------------------------------------

export const SCRIPT_URL_CONFIGURED = !SCRIPT_URL.includes(
  'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
)
