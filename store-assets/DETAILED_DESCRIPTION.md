# Detailed Description

Chrome Web Store field: **Store listing → Detailed description**
Minimum 25 characters, maximum 16,000. The store renders plain text only, so the text
between the markers contains no Markdown formatting.

---BEGIN PASTE---
International Names for Google Maps shows the internationally recognized names Lake Ontario and Gulf of Mexico while you browse Google Maps.

The extension changes only what you see in your own browser. It does not modify Google's data, does not affect anyone else's map, and makes no claim about official or legal naming authority.

HOW IT WORKS

Google Maps draws geographic labels inside a private WebGL canvas layer that a browser extension cannot read or rewrite. The extension therefore works in two ways:

1. On the page itself, it replaces the alternate names wherever they appear in ordinary page text, and in the aria-label and title attributes, so search results, side panels, tooltips, and screen-reader output all read the international names.

2. On the map view, it draws a small map-colored label at the correct position for each location. The position is recalculated from the map coordinates in the page URL, so the label stays in place as you pan and zoom. The label appears only at the zoom levels where Google's own label would appear: zoom 4 and closer for the Gulf of Mexico, zoom 7 and closer for Lake Ontario. It ignores mouse and touch input, so panning, zooming, and clicking the map behave exactly as they normally do.

CONTROLS

Click the toolbar button to turn the replacements on or off. Your choice is remembered.

SCOPE AND PRIVACY

The extension runs only on https://www.google.com/maps and https://maps.google.com. It has no access to any other website.

It makes no network requests of any kind. It collects nothing, sends nothing, and contains no analytics, tracking, or advertising. The only thing it saves is a single on/off preference. All of its code ships inside the extension package; no code is loaded from a remote server.

OPEN SOURCE

The complete source code is public and can be reviewed at:
https://github.com/amites/international-google-maps
---END PASTE---
