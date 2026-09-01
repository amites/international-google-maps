# Remote Code Justification

Chrome Web Store field: **Privacy practices → Are you using remote code?**

## What to select

Select **"No, I am not using remote code."**

This extension executes no remote code. Every line it runs — `content-script.js` and
`popup.js` — is contained in the uploaded package. There is no `eval()`, no `new Function()`,
no injected `<script src>`, no `import()` of a remote module, no WebAssembly, no CDN
dependency, and no network request of any kind. The only external reference anywhere in the
code is the CSS font stack `Roboto, Arial, sans-serif`, which resolves against fonts already
installed on the user's machine and fetches nothing.

## If a justification box is still required

Paste the text between the markers.

---BEGIN PASTE---
This extension does not use remote code. All executable code is contained in the uploaded package: content-script.js and popup.js. The extension makes no network requests, loads no scripts or modules from any server, and uses no eval(), new Function(), remote import, or WebAssembly. The only external-looking reference is the CSS font-family "Roboto, Arial, sans-serif", which uses fonts already present on the user's system and does not fetch anything. Extension behavior can therefore be fully reviewed from the submitted package and cannot change without a new version being uploaded and reviewed.
---END PASTE---
