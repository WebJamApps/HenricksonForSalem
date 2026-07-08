# Domain-day runbook — 8am session with Mark (2026-07-08)

Goal: Mark Henrickson takes full ownership of the Cloudflare account, registers the campaign
domain with **his own payment card**, and the live site comes up on the new domain.

Josh reads these steps to Mark **one at a time** and waits for each result before moving on.
Dashboard UIs drift — if the screen doesn't match a step, ask what Mark actually sees and adapt.

## Prerequisites (must be true from tonight, before 8am)

- [ ] A Cloudflare account exists under **Josh's email** (temporary owner); its temp password is in Josh's KeePass.
- [ ] A Cloudflare Pages project named `henricksonforsalem` is connected to the `WebJamApps/HenricksonForSalem` repo.
- [ ] The scaffold site is live at https://henricksonforsalem.pages.dev (open it and check before the session).
- [ ] Mark has his **phone with access to his email inbox** (needed to confirm the email swap).
- [ ] Mark has his **payment card** with him.
- [ ] Josh has **KeePass open** — every credential created below gets saved the moment it's created.

## 8am session steps

### 1. Swap the account email from Josh's to Mark's

1. Josh logs in at https://dash.cloudflare.com with his (temporary) credentials.
2. Click the **person icon** (top-right) → **My Profile**.
3. On the profile page find the **Email Address** section (Communication/Preferences area) → click **Change Email Address**.
4. Enter Mark's email address (twice, if asked) and Cloudflare's current password, then confirm.
5. Cloudflare sends a **confirmation link to Mark's email** — Mark opens it on his phone and clicks the link.
   (Delays? See Troubleshooting below.)
6. Verify: the profile page now shows Mark's email as the account email.

### 2. Mark sets his own password (account becomes his)

1. Still in **My Profile**, open the **Authentication** tab.
2. Under **Password**, click **Change** — enter the current (temp) password, then Mark types a **new password of his own** (Josh looks away).
3. **KeePass now:** Mark saves the new password in his own password manager; if he doesn't have one, Josh saves it to KeePass and hands it over securely later. Do NOT continue until it's saved somewhere durable.
4. Recommended: on the same Authentication tab, enable **Two-Factor Authentication** (authenticator app on Mark's phone).
5. **KeePass now:** save the 2FA **recovery codes** the moment Cloudflare displays them — they are shown only once.

### 3. Mark adds his payment card

1. Go to https://dash.cloudflare.com → select the account → **Manage Account** → **Billing**.
2. Open the **Payment info** tab → **Add payment method** (or Edit).
3. Mark enters **his own card** and billing address → Save.
4. Verify: the card on file shows Mark's card. From here on, everything (domain, renewals) bills to Mark.

### 4. Search and register the domain (Cloudflare Registrar, at-cost)

The name is chosen **live in the session** — search until Mark is happy with an available one.

1. In the dashboard left sidebar: **Domain Registration** → **Register Domains**.
2. Type a candidate name in the search box; Cloudflare shows availability and the at-cost price (a `.com` runs about **$10–11/yr** — flag the cost to Mark before buying).
3. Optional pre-check from Josh's laptop while brainstorming (404 = available):
   `curl -s -o /dev/null -w '%{http_code}' https://rdap.verisign.com/com/v1/domain/<name>.com`
4. When Mark picks the winner: click **Purchase**, fill in **Mark's registrant contact info** (WHOIS privacy/redaction is on by default), confirm it's charging **Mark's card**, and complete the purchase.
5. The domain lands in this Cloudflare account with DNS already hosted here — no nameserver changes needed.
6. Registrars may email a **registrant-verification link** — if one arrives in Mark's inbox, click it now (ignoring it can suspend the domain later).

### 5. Attach the domain to the Pages project

1. Left sidebar: **Workers & Pages** → click the **henricksonforsalem** project.
2. Open the **Custom domains** tab → **Set up a custom domain**.
3. Enter the bare domain just registered (e.g. `<name>.com`) → **Continue**.
4. Because the domain lives in this same account, Cloudflare creates the DNS record automatically — click **Activate domain**.
5. Repeat steps 2–4 for **`www.<name>.com`** so both forms work.

### 6. Verify the live site

1. Wait for the custom-domain status to show **Active** (usually 1–5 minutes; the SSL certificate is issued automatically).
2. Open **https://<name>.com** on Mark's phone and Josh's laptop — the scaffold site should load.
3. Check **https://www.<name>.com** too.
4. https://henricksonforsalem.pages.dev keeps working as well — that's normal.

Done: the account, the card, and the domain are all Mark's; the site is live on the campaign domain.

## Troubleshooting: email-confirmation delays

- The step-1 confirmation email can take a few minutes — have Mark **check Spam/Promotions** and search his inbox for "Cloudflare".
- Still nothing after ~5 minutes: go back to My Profile and use the **resend** option (or redo Change Email Address — double-check the address for typos).
- Confirmation links **expire** — if one is old, resend rather than clicking a stale link.
- Do **not** create a second Cloudflare account with Mark's email while waiting; that address then can't be used for the swap. If that happens accidentally, delete the new account first (its My Profile → Delete this account), then resend the confirmation.
