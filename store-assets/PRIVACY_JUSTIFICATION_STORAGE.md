# Storage Permission Justification

Chrome Web Store field: **Privacy practices → Storage justification**
Paste the text between the markers into the form. Plain text only.

## What is actually stored

A single key, `internationalNamesEnabled`, holding one boolean. Written in `popup.js` when
the user flips the toggle; read in `content-script.js` and `popup.js` on load. Nothing else
is ever written. It is stored via `chrome.storage.sync`, so Chrome replicates it across the
user's own signed-in Chrome profiles — no data reaches any server operated by this
extension's developer.

---BEGIN PASTE---
The storage permission is used to remember one setting: whether the user has the extension turned on or off.

The extension writes exactly one key, "internationalNamesEnabled", holding a single true/false value. It is written when the user flips the toggle in the extension popup, and read when the popup or the Google Maps content script loads, so the user's on/off choice persists between page loads and browser sessions instead of resetting every time.

No other data is stored. The extension does not store browsing history, page content, URLs, map searches, locations, identifiers, or any personal or user-provided information. It uses chrome.storage.sync so the on/off preference follows the user across their own signed-in Chrome profiles; that data stays within Chrome's own sync and is never sent to the developer or to any third party. The extension makes no network requests at all.
---END PASTE---
