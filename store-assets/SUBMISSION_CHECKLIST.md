# Chrome Web Store Submission Checklist

Item name: **International Names for Google Maps**
Publisher contact: **support@technowizardry.it**

Tracks the blockers reported by the Developer Dashboard. Each row points at the document
holding the exact text to paste.

## Reported blockers

| # | Dashboard message | Where | Document | Status |
|---|---|---|---|---|
| 1 | A justification for host permission use is required | Privacy practices | [PRIVACY_JUSTIFICATION_HOST_PERMISSIONS.md](PRIVACY_JUSTIFICATION_HOST_PERMISSIONS.md) | Text ready |
| 2 | A justification for remote code use is required | Privacy practices | [PRIVACY_JUSTIFICATION_REMOTE_CODE.md](PRIVACY_JUSTIFICATION_REMOTE_CODE.md) | Text ready — answer is "no remote code" |
| 3 | A justification for storage is required | Privacy practices | [PRIVACY_JUSTIFICATION_STORAGE.md](PRIVACY_JUSTIFICATION_STORAGE.md) | Text ready |
| 4 | The detailed description is too short or is missing | Store listing | [DETAILED_DESCRIPTION.md](DETAILED_DESCRIPTION.md) | Text ready |
| 5 | The single purpose description is required | Privacy practices | [SINGLE_PURPOSE.md](SINGLE_PURPOSE.md) | Text ready |
| 6 | You must certify that your data usage complies with the Developer Program Policies | Privacy practices | [DATA_USAGE_CERTIFICATION.md](DATA_USAGE_CERTIFICATION.md) | Checkboxes — account holder must tick |
| 7 | You must provide a contact email | Settings | [PUBLISHER_CONTACT_EMAIL.md](PUBLISHER_CONTACT_EMAIL.md) | Address chosen — must be entered on the dashboard |
| 8 | You must verify the publisher's contact email | Settings | [PUBLISHER_CONTACT_EMAIL.md](PUBLISHER_CONTACT_EMAIL.md) | Requires clicking the link Google mails to that address |

Items 1–5 are copy-and-paste. Item 6 is a set of checkboxes with the factual basis
documented. Items 7 and 8 require access to the developer account and to the
`support@technowizardry.it` inbox, so they cannot be completed from this repository.

## Before you submit

- [ ] Commit and push everything to `main`. The privacy policy URL points at the raw file on
      `main` and returns 404 until it is pushed.
- [ ] Confirm `icons/icon-128.png` is present in the packaged zip — see issue 1 below.
- [ ] Consider excluding `icons/icon-lg.png` (933 KB, 988×986) from the zip. It is a source
      asset; only the 128×128 is referenced by the manifest.

## Supporting assets in this folder

- [STORE_LISTING.md](STORE_LISTING.md) — short description and listing copy
- [PRIVACY_POLICY.md](PRIVACY_POLICY.md) — served from `main`; URL is in
  [DATA_USAGE_CERTIFICATION.md](DATA_USAGE_CERTIFICATION.md)
- `screenshot-gulf-of-mexico-1280x800.png` — listing screenshot, 1280×800

## Issues found while preparing this

### 1. The icon was being silently excluded from git — RESOLVED

`icons/icon-128.png` existed on disk but never appeared in `git status`, so it would not
have been committed and the packaged zip would have shipped a manifest pointing at a missing
file. Cause: the global ignore file `~/.gitignore_global:48` contains the macOS Finder rule
`Icon?`, and because `core.ignorecase` is `true` on this machine, that five-character
pattern also matches the directory `icons`.

Fixed by adding a repository-level `.gitignore` containing `!icons/`, which re-includes the
directory. Verified with `git check-ignore -v icons/icon-128.png`, which now returns no
match. The icon files are now visible to git and staged for commit.

This affects any clone on a case-insensitive filesystem whose user has the same global rule,
so the repo-level `.gitignore` should stay in place.

### 2. Listing name — RESOLVED

Renamed from "Google Maps International Names" to "International Names for Google Maps" in
`manifest.json` (`name` and `action.default_title`), `README.md`, and all store copy. Leading
with another company's product name risks rejection under Chrome Web Store branding policy
for implying affiliation or endorsement.

### 3. Store listing tone — by design

`README.md` includes pointed political commentary. That is fine in the repository, but the
store-facing text in this folder is deliberately neutral and factual. Listing copy that reads
as political advocacy invites a discretionary policy review. Submit the text in these
documents rather than reusing the README prose.
