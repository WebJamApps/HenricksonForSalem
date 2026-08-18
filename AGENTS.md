# Agent instructions — HenricksonForSalem


## Cross-AI hard rules

The cross-AI hard rules that bind every agent on every surface are NOT duplicated here. They live
in exactly one file: `docs/cross-ai-rules.md` in the **`web-jam-tools` repository**, which normally
sits alongside this repository — `../web-jam-tools/docs/cross-ai-rules.md`, and on Josh's laptop
`/home/joshua/WebJamApps/web-jam-tools/docs/cross-ai-rules.md`.

Read that file before acting. If you cannot find it, STOP and say so — do not proceed without the
rules and do not reconstruct them from memory or from this file.

## Pull requests

Never merge to `dev` or `main` — Josh is the mandatory human reviewer. Open PRs
with the shared script (`~/WebJamApps/web-jam-tools/scripts/create-draft-pr.sh`),
never `gh pr create` directly. It always opens a **draft** PR based on **`dev`**.
The script requires `--author`, `--summary`, `--test-plan`, and `--test-evidence`;
empty or placeholder values are rejected. Bump the semver `version` in
`package.json` once per PR, on the PR's first commit only.

### PR body conventions (violations may be machine-rejected)

- **Summary**: markdown bullet points, one change per bullet — never a run-on paragraph.
- **Test evidence**: paste the REAL runner output verbatim (the lines showing pass/fail and test counts), inside a ``` fence — never a description like "all tests passed". If the output has scrolled out of view, re-run the test command and paste what it prints.
- **Test plan**: exact commands and manual steps that exercise the change (start command, route/page, what to click, expected visible result) — a green test suite alone is not a plan.
- **Attribution**: `--author` names the model actually doing the work. Antigravity/agy sessions are ALWAYS `agy — Gemini 3.5 Flash (Medium)` or `(High)` — never write any other Gemini model name (models misremember their own identity; use this exact string).

## UI and Deployment Rules

- **Form Required Asterisks**: Never allow a required field asterisk (`*`) to wrap alone onto a new line in form labels or checkbox text. Wrap the preceding trailing word together with the asterisk in a `white-space: nowrap` container (e.g. `<span style={{ whiteSpace: 'nowrap' }}>word <span className="required-star">*</span></span>` or `.no-wrap-text`).
- **Footer Brand Logo Inline Alignment**: Wrap `.footer-logo-icon` and `<h3>` heading in `.footer-brand-title` (`display: flex; align-items: flex-start; gap: 0.75rem;`) and set `margin-top: -1px; flex-shrink: 0;` on `.footer-logo-icon` for flush alignment with capital letter cap-height.
- **Cloudflare Pages Headers**: Always maintain `public/_headers` setting `/*` to `Cache-Control: no-cache, no-store, must-revalidate` and `/assets/*` to `Cache-Control: public, max-age=31536000, immutable` so browsers never serve stale `index.html` referencing missing asset hashes.
