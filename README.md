# One Pitch-No Bitch — Registration Site

A React + Vite + Tailwind CSS single-page site for registering teams for
Quinntessential Softball's one-pitch slowpitch softball tournament.

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

### Charity Swing-Off

The `charityEvent` object in `src/data/tournament.js` drives the "Charity
Swing-Off" section (`src/components/CharitySwingOff.jsx`) — the post-tournament
fundraiser where players face real fastpitch pitching. Each batter gets 5
pitches; every swing is scored against `scoringTiers`, and the batter's final
match percentage is the average of all 5 results, applied to their declared
donation.

`beneficiary` is currently a placeholder (`INSERT_CHARITY_NAME_HERE`) since the
donation recipient hasn't been finalized — update it once that's decided.

### Free Agent pool

Players without a full team can sign up solo through the "Free Agent Pool"
section (`src/components/FreeAgentSection.jsx` and `FreeAgentForm.jsx`).
Signing up doesn't guarantee a roster spot — it adds the player to a pool
that team captains can browse and reach out to if they need more players. If
enough free agents sign up on their own to field a full team, they're
grouped together. The `$25` fee (set via `freeAgentProgram.feeUSD` in
`src/data/tournament.js`) is only collected once a player is actually placed
on a team, not at sign-up. The team registration section links to this pool
so captains know it's there if they need it.

## Liability waivers

Two standalone waiver pages live in `public/waivers/` and are linked from the
footer of every page ("View Tournament Waiver" and "View Charity Swing-Off
Waiver"), rather than being part of the React app:

- `public/waivers/slowpitch-waiver.html` — covers the main tournament.
- `public/waivers/fastpitch-waiver.html` — covers the Charity Swing-Off, with
  a section specifically calling out the added risk of facing live fastpitch
  pitching (vs. the slowpitch used in the tournament itself).

They're plain static HTML (not wired into the Vite/React build) so they load
and print independently, with a "Print / Save as PDF" button on each page.

**These are general templates, not legal advice.** Liability waiver
enforceability varies significantly by state — some jurisdictions limit or
refuse to enforce releases in certain situations (e.g. gross negligence, or
minors signing for themselves). Each waiver has an "Organizer note — remove
before use" box at the top flagging this; have a licensed attorney in your
state review both documents before relying on them, and remove that note box
once you're ready to use them for real.

## Wiring up registrations to a Google Sheet

Both the team registration form (`src/components/RegisterForm.jsx`) and the
free agent form (`src/components/FreeAgentForm.jsx`) post to the same Google
Apps Script Web App, which appends each submission as a row in a Google
Sheet — team registrations go to a "Team Registrations" tab, free agent
sign-ups go to a "Free Agents" tab. No server or database required.

1. Create a new Google Sheet (e.g. "One Pitch-No Bitch Registrations").
2. Open **Extensions > Apps Script**, delete the placeholder code, and paste
   in the contents of `Code.gs` (in this repo's root).
3. Run the `setupSheet` function once (pick it from the dropdown next to the
   Run button) to create both tabs with header rows and authorize the
   script.
4. **Deploy > New deployment > Web app.** Set "Execute as" to `Me` and "Who
   has access" to `Anyone`. Deploy and authorize if prompted.
5. Copy the deployment URL (ends in `/exec`).
6. Paste that URL into `src/lib/scriptUrl.js`, replacing the `SCRIPT_URL`
   placeholder. Both forms read from that one file, so you only need to
   paste it once.

Until `SCRIPT_URL` is set, both forms still work in the browser (they show
the confirmation screen) but don't save anything anywhere — they log a
console warning to remind you it's not connected yet.

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
