# Digital Immortality — memories notes app (Firebase demo)

A React notes app ("memories") backed by Firebase: sign in with Google,
save text memories to Firestore, list them, sign out. Built on Remix
(`app/`), with a standalone `app.js` variant as well.

## Firebase config — how to supply your key

- **No Firebase key is hardcoded in the working tree.** Both `app.js` and
  `app/routes/index.jsx` import the shared config from `firebase.config.js`,
  which reads `FIREBASE_API_KEY` (and the other `FIREBASE_*` values) from the
  environment and falls back to `YOUR_*` placeholders.
- Copy `.env.example` to `.env` and fill in your project's values from the
  Firebase console (Project settings → General → Your apps).
- `.env` is gitignored.

**Important:** the Firebase web API key was previously hardcoded in this
repo and is still present in git history (history was deliberately not
rewritten). Rotate the key in the Firebase console
(Project settings → API keys) and restrict it (HTTP referrers / API
restrictions) before any real use.

## How to run

**Prerequisites:** Node.js 18+

1. `npm install`
2. Create `.env` from `.env.example` with your Firebase config
3. `npm run dev` (Remix dev server)

## Current state (honest)

- `index.html` serves a static landing page; the Remix app in `app/`
  (route `app/routes/index.jsx`) and the standalone `app.js` hold the real
  notes-app functionality.
- Without a real `FIREBASE_API_KEY`, the app loads but Firebase calls
  (sign-in, Firestore) fail — by design, since no key is bundled.

## License

See LICENSE.
