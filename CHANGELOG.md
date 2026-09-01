# Changelog

All notable changes to this project will be documented in this file.

## [3.0.1] - 2026-09-02

### Docs

- State that the package has zero runtime dependencies.

### CI

- Fix GitHub Pages deploys that failed when a workflow re-run uploaded a second `github-pages` artifact.

### Demo

- Add Vercel config so the Vite demo can be deployed as a static SPA.

## [3.0.0] - 2026-09-01

Rewrite for React 19 and React Router 7. v2 remains available as `react-breadcrumbs@2`.

### Breaking

- Peer dependencies are now `react`/`react-dom` ≥ 19 and `react-router` ≥ 7.
- `<BreadcrumbProvider>` is required. The Redux singleton store is gone.
- Default markup is `<nav aria-label="Breadcrumb">` with an `<ol>` of `<li>`.
- The current crumb is a `<span aria-current="page">`, not an active `NavLink`.
- ESM-only publish. No UMD bundle, no `prop-types`, no `uuid`, no `lodash.isequal`.
- CSS is a separate export: `react-breadcrumbs/styles.css`.

### Added

- `source="registered" | "route" | "merged"` on `<Breadcrumbs>`.
- `useBreadcrumbs()` and `useRouteCrumbs()`.
- `linkComponent` and per-crumb `linkProps`.
- Logical CSS so RTL follows `dir` on the document.
- TypeScript types, Vitest tests, Vite demo, GitHub Actions CI.

### Ideas kept from unmerged PRs

- Injectable store → context provider (#122)
- Custom link props (#100)
- RTL without a dedicated prop (#106)
- Async/dynamic titles documented and shown in the demo (#96)

## [2.1.7](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.6...v2.1.7) (2019-06-14)

### Bug Fixes

* allow usage with latest react-router version ([d4258e9](https://github.com/robbestad/react-breadcrumbs/commit/d4258e9))

## [2.1.6](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.5...v2.1.6) (2018-07-05)

## [2.1.5](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.4...v2.1.5) (2018-01-18)

## [2.1.4](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.3...v2.1.4) (2018-01-11)

## [2.1.3](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.2...v2.1.3) (2018-01-04)

### Bug Fixes

* **breadcrumb:** allow no children to be passed ([2122618](https://github.com/robbestad/react-breadcrumbs/commit/2122618))
* **demo:** update crumb-route ([0a0bd31](https://github.com/robbestad/react-breadcrumbs/commit/0a0bd31))
* **deps:** allow the latest version of react ([0815c17](https://github.com/robbestad/react-breadcrumbs/commit/0815c17))

## [2.1.2](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.1...v2.1.2) (2017-10-24)

### Bug Fixes

* fix “Cannot read property 'Component' of undefined” issue ([275ded1](https://github.com/robbestad/react-breadcrumbs/commit/275ded1))

## [2.1.1](https://github.com/robbestad/react-breadcrumbs/compare/v2.1.0...v2.1.1) (2017-10-19)

## [2.1.0](https://github.com/robbestad/react-breadcrumbs/compare/v1.6.6...v2.1.0) (2017-10-14)

### Features

* rewrite library to be compatible with react-router v4 ([0637464](https://github.com/robbestad/react-breadcrumbs/commit/0637464))
