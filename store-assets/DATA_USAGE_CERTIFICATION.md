# Data Usage Compliance Certification

Chrome Web Store field: **Privacy practices → Certify that your data usage complies with
the Developer Program Policies**

This is a set of checkboxes, not a text field. Only the developer account holder can tick
them. This document records the factual basis for each certification so it can be ticked
accurately, and so the claims can be re-verified against the code before any future release.

## What to tick

| Certification | Answer | Basis |
|---|---|---|
| I do not sell or transfer user data to third parties, outside of the approved use cases | **Certify** | The extension makes no network requests. There is no data to sell or transfer. |
| I do not use or transfer user data for purposes that are unrelated to my item's single purpose | **Certify** | The only stored value is the on/off toggle, used solely to remember the user's setting. |
| I do not use or transfer user data to determine creditworthiness or for lending purposes | **Certify** | No user data is collected or transmitted. |

## Data collection disclosure

In the **"What user data do you plan to collect?"** section, leave **every category
unchecked**: personally identifiable information, health information, financial and payment
information, authentication information, personal communications, location, web history,
and user activity. Do not check "Website content" — the extension reads page text in the
tab in order to rewrite it, but never collects, stores, or transmits it.

## Supporting statement

If a free-text field or a reviewer follow-up asks for detail, paste the text between the
markers.

---BEGIN PASTE---
This extension collects no user data. It makes no network requests of any kind: no analytics, no telemetry, no error reporting, no advertising, and no calls to any first-party or third-party server. Nothing is sold, transferred, or shared, because nothing leaves the user's browser.

The extension reads text on the Google Maps page in order to rewrite two place names in that page, and reads the map coordinates from the page URL in order to position its overlay label. Both operations happen entirely within the browser tab and the results are never stored or transmitted.

The only data written anywhere is a single boolean preference, "internationalNamesEnabled", saved through chrome.storage.sync so the user's on/off choice persists. That value is handled by Chrome's own sync and is never accessible to the developer.

The complete source is public at https://github.com/amites/international-google-maps and can be verified against the uploaded package.
---END PASTE---

## Privacy policy

Paste this into the **Privacy policy URL** field on the Privacy practices tab:

```
https://raw.githubusercontent.com/amites/international-google-maps/main/store-assets/PRIVACY_POLICY.md
```

This serves [PRIVACY_POLICY.md](PRIVACY_POLICY.md) from the `main` branch. The URL only
resolves once the file is committed and pushed to `main`, so push before submitting.

Note that `raw.githubusercontent.com` returns `text/plain`, so the page displays as
unformatted source rather than rendered Markdown. That is acceptable to reviewers. If you
later want a rendered page, the same file at
`https://github.com/amites/international-google-maps/blob/main/store-assets/PRIVACY_POLICY.md`
is a drop-in replacement.
