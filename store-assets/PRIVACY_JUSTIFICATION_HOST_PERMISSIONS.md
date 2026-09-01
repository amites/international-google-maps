# Host Permission Justification

Chrome Web Store field: **Privacy practices → Host permission justification**
Paste the text between the markers into the form. Plain text only.

## Hosts requested

Declared in `manifest.json` under `content_scripts[0].matches` (the extension declares no
separate `host_permissions` key and requests no other origin):

- `https://www.google.com/maps*`
- `https://maps.google.com/*`

---BEGIN PASTE---
The extension's only function is to display the place names "Lake Ontario" and "Gulf of Mexico" on Google Maps, so it needs to run on the Google Maps pages themselves. It requests exactly two match patterns and no others: https://www.google.com/maps* and https://maps.google.com/*.

Access to those pages is required to do the two things the extension does. It reads and rewrites text nodes and the aria-label and title attributes on the Maps page so that the page text and screen-reader output show the international names. It also reads the map center and zoom level from the page URL and measures the map canvas element, so it can position its own small overlay label at the correct point on screen and keep it there as the user pans and zooms.

Both patterns are needed because Google serves Maps from both hostnames. The extension does not request broad host access, does not use activeTab or tabs, and cannot run on any other site. It reads page content only in the browser tab and never transmits it anywhere.
---END PASTE---
