// Firebase web config for the Digital-Immortality demo.
//
// The API key is NOT hardcoded here. Set FIREBASE_API_KEY (and the other
// FIREBASE_* variables) in a .env file (see .env.example) or in your
// environment. The YOUR_* placeholders keep the module importable without
// a key; Firebase calls will fail until a real key is supplied — by design.
//
// Note: a Firebase *web* API key is meant to be public-ish (it ships in
// client bundles), but it was committed to this repo's source and git
// history, so rotate it in the Firebase console anyway.
const env =
  typeof process !== 'undefined' && process.env ? process.env : {};

export const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY || 'YOUR_FIREBASE_API_KEY',
  authDomain: env.FIREBASE_AUTH_DOMAIN || 'digital-immortality1.firebaseapp.com',
  projectId: env.FIREBASE_PROJECT_ID || 'digital-immortality1',
  storageBucket:
    env.FIREBASE_STORAGE_BUCKET || 'digital-immortality1.firebasestorage.app',
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || '28222298619',
  appId:
    env.FIREBASE_APP_ID || '1:28222298619:web:188e39e8c1af978ea6d35e',
  measurementId: env.FIREBASE_MEASUREMENT_ID || 'G-YKX8YBPX1V',
};
