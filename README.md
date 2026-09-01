# International Names for Google Maps

A Chrome extension that restores **Lake Ontario** and **Gulf of Mexico** in Google Maps. It only runs on `maps.google.com` and `www.google.com/maps`.

Repository: [amites/international-google-maps](https://github.com/amites/international-google-maps)

## Purpose

This project keeps map labels aligned with established international geographic usage after a politically driven naming change. International standards and common global references for these places have not changed—despite one particularly energetic campaign to make the map a little more about its promoter. This extension provides a small, user-controlled way to keep the familiar names visible.

The extension does not change Google Maps data or make a claim about legal authority. It changes only what its user sees in their browser, leaving the world map slightly less vulnerable to personal-brand management.

## Install locally

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked** and choose this `gmaps-international-names` folder.
4. After source updates, click the extension's **Reload** button on `chrome://extensions`, then reload the Google Maps tab.
5. Open or refresh Google Maps and use the extension button to enable or disable replacements.

## Scope

The extension updates page text plus `aria-label` and `title` attributes where those terms are present. Google Maps draws geographic names in a private WebGL/canvas layer, which an extension cannot safely rewrite. To provide the requested map-view result, the extension adds an opaque, map-colored visual label at each location and recalculates its position from the current Maps URL whenever you pan or zoom. The Gulf label appears from zoom 4 and the Lake label from zoom 7, matching the observed native label thresholds. The overlay blocks no pointer events, so normal map interaction is unchanged.

## Ongoing updates

This extension tracks a moving target. Should any further geographic name be changed for political purposes within the United States, this extension will be updated to restore the internationally recognized name alongside the two it already covers.

Changes of that kind are added as ordinary releases: a new entry in the replacement list, a new overlay label at the relevant coordinates and zoom threshold, and a version bump. If you notice a renaming this extension does not yet cover, open an issue on the [repository](https://github.com/amites/international-google-maps).

## Store submission

Chrome Web Store listing text, permission justifications, and the privacy policy live in [`store-assets/`](store-assets/). [`store-assets/SUBMISSION_CHECKLIST.md`](store-assets/SUBMISSION_CHECKLIST.md) maps each dashboard requirement to the document holding its text.
