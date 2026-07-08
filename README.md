# Henrickson for Salem

Campaign website for **Mark Henrickson**, candidate for Salem City Council.

**Live site:** https://henricksonforsalem.pages.dev

## Tech stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript — a purely
  static site: no backend, no forms, no network calls at runtime.
- Tested with [Vitest](https://vitest.dev/) + Testing Library; linted with ESLint.
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## Development

Requires Node 24.

```sh
npm install
npm run dev        # local dev server
npm test           # lint + typecheck + unit tests (coverage)
npm run build      # production build to dist/
```

## Deploying

Deploys are manual for now, via Wrangler:

```sh
npm run build
npx wrangler pages deploy dist --project-name henricksonforsalem --branch main
```

## Contributing

- Default branch is `dev`; PRs are opened as drafts against `dev` and reviewed there.
- `dev` → `main` release merges are done by the repo owner.

## Docs

- [Domain-day runbook](docs/domain-day-runbook.md) — the account-handoff / domain-registration session script.

## License

MIT
