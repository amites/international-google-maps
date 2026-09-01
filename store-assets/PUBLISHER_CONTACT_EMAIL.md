# Publisher Contact Email

Chrome Web Store fields: **Settings → Contact email**, then **Verify**

Two separate blockers are reported for this, and both are account-level actions that only
the developer account holder can perform. They cannot be satisfied from the repository.

## 1. Provide the contact email

1. Open the Chrome Web Store Developer Dashboard.
2. Go to **Settings** (the account-level page, not the item edit page).
3. Enter the address in **Contact email**.
4. Save.

Address to use: `support@technowizardry.it`

Notes on choosing it:

- It becomes publicly visible on the store listing and is where Google sends policy and
  review correspondence, so it must be an address that is monitored.
- Prefer a role address over a personal one if the listing may outlive the current owner.
- It must be an address whose inbox is reachable now, because step 2 requires clicking a
  link sent to it.

## 2. Verify the contact email

1. On the same **Settings** page, select **Verify** next to the contact email.
2. Google sends a verification message to that address.
3. Open the message and follow its verification link.
4. Return to the dashboard and confirm the address shows as verified.

If the message does not arrive, check spam, confirm the domain accepts mail from Google,
and use the dashboard's resend control rather than re-entering the address.

## 3. Keep it consistent

Once chosen, use the same address for:

- The support contact on the item's **Store listing** tab, if one is set.
- The contact address named in `PRIVACY_POLICY.md`, which is already set to this address.
  If it ever changes, update both together.
