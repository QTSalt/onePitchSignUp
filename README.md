# The One Pitch Showdown — Registration Site

A React + Vite + Tailwind CSS single-page site for registering teams for a
one-pitch slowpitch softball tournament.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output goes to `dist/` and can be deployed to any static host
(GitHub Pages, Netlify, Vercel, S3, etc.).

## Editing tournament details

All the tournament content (date, park, pricing, rules, tie-breakers, payment
handle, deadline) lives in one place: `src/data/tournament.js`. Update the
`INSERT_*` placeholder values there once they're finalized — every section of
the site reads from that file.

## Wiring up registrations to a Google Sheet

The registration form (`src/components/RegisterForm.jsx`) posts to a Google
Apps Script Web App, which appends each submission as a row in a Google
Sheet. No server or database required.

1. Create a new Google Sheet (e.g. "One Pitch Showdown Registrations").
2. Open **Extensions > Apps Script**, delete the placeholder code, and paste
   in the contents of `Code.gs` (in this repo's root).
3. Run the `setupSheet` function once (pick it from the dropdown next to the
   Run button) to add a header row and authorize the script.
4. **Deploy > New deployment > Web app.** Set "Execute as" to `Me` and "Who
   has access" to `Anyone`. Deploy and authorize if prompted.
5. Copy the deployment URL (ends in `/exec`).
6. Paste that URL into `src/components/RegisterForm.jsx`, replacing the
   `SCRIPT_URL` placeholder near the top of the file.

Until `SCRIPT_URL` is set, the form still works in the browser (it shows the
confirmation screen) but doesn't save anything anywhere — it logs a console
warning to remind you it's not connected yet.

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
