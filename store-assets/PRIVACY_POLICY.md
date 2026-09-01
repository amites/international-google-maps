# Privacy Policy — International Names for Google Maps

Last updated: 2026-08-31

## Summary

This extension collects no data. It makes no network requests. Nothing you do in it leaves
your browser.

## What the extension accesses

The extension runs only on `https://www.google.com/maps` and `https://maps.google.com`. It
has no access to any other website.

On those pages it reads:

- **Page text and the `aria-label` and `title` attributes**, in order to replace two place
  names with their internationally recognized equivalents.
- **The map coordinates and zoom level in the page URL, and the size and position of the map
  canvas**, in order to draw its own label at the right point on screen and keep it there as
  you pan and zoom.

Both operations happen entirely inside the browser tab. The results are used immediately to
update what you see and are never stored or transmitted.

## What the extension stores

One value: `internationalNamesEnabled`, a single true/false setting recording whether you
have the extension switched on. It is saved through `chrome.storage.sync`, which means
Chrome replicates it across Chrome profiles you are signed in to. It is handled by Chrome's
own sync infrastructure and is not accessible to the developer.

No other information is stored.

## What the extension does not do

- It makes no network requests of any kind.
- It contains no analytics, telemetry, crash reporting, advertising, or tracking.
- It does not collect, store, or transmit personally identifiable information, location,
  browsing history, search queries, page content, credentials, or any other user data.
- It does not sell, transfer, or share data with anyone, because it holds none to share.
- It loads no code from any remote server. All code ships inside the extension package.

## Removing your data

Uninstalling the extension removes the stored preference. You can also clear it by signing
out of Chrome sync or clearing Chrome's synced data.

## Source code

The complete source is public and can be verified against the published package:
https://github.com/amites/international-google-maps

## Changes to this policy

Any change will be published in this file in the repository, with the "Last updated" date
above revised.

## Contact

support@technowizardry.it
