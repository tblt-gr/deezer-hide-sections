# Contributing

## Branches

- Always branch from `dev`, never from `main`
- Naming: `feat/short-description` or `fix/short-description`
- One branch per issue — never mix multiple issues

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add section export button
fix: handle missing storage key
ci: add web-ext lint step
chore: bump manifest version
docs: update README
```

All commit messages in English.

## Pull Requests

- Target branch: `dev` (never `main`)
- One PR per issue
- Title follows the conventional commit format
- Link the related issue in the PR description

### Merging

PRs are merged with **squash merge** only:

```bash
gh pr merge <number> --squash --delete-branch
```

## Code style

- Indentation: 2 spaces, no semicolons skipped — keep consistent with existing files
- Files: kebab-case (`content.js`, `popup.css`, `import.html`)
- Classes: PascalCase — functions/variables: camelCase
- Unused vars prefixed with `_`
- No inline comments unless the reason is non-obvious
- Run `web-ext lint` before opening a PR (same check runs in CI)

## Accessibility

All popup / UI markup must:

- Use semantic HTML (`<button>`, `<dialog>`, `<nav>`, etc.) — no clickable `<div>`
- Include ARIA attributes (`aria-label`, `aria-modal`, `aria-labelledby`) on interactive elements and modals
- Support keyboard navigation (Escape closes modals, Tab moves focus)
- Maintain a minimum contrast ratio of 4.5:1 for text

## Issues

When writing GitHub issues:

- Describe the expected behavior and acceptance criteria
- Do not list specific files — the codebase evolves and file lists go stale fast
- Write in English
