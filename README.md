# React Breadcrumbs

Automatic breadcrumb trails for [React Router](https://reactrouter.com) 7.

v3 is a rewrite: TypeScript, React 19, no Redux, zero runtime dependencies,
accessible markup, and two ways to build a trail. v2 (`react-breadcrumbs@2`)
remains on npm for React 15/16 and React Router 4/5 apps.

## Install

```sh
npm install react-breadcrumbs
```

Zero runtime dependencies. Requires `react` and `react-dom` ≥ 19, `react-router` ≥ 7.

```js
import {
  Breadcrumb,
  BreadcrumbProvider,
  Breadcrumbs,
} from 'react-breadcrumbs'
import 'react-breadcrumbs/styles.css'
```

## Usage

Wrap the tree in `BreadcrumbProvider` **inside** a data router
(`createBrowserRouter` / `createMemoryRouter`). Render `<Breadcrumbs />` once.
Register a crumb wherever a section mounts:

```tsx
import { Breadcrumb, BreadcrumbProvider, Breadcrumbs } from 'react-breadcrumbs'
import { Outlet } from 'react-router'

export function Root() {
  return (
    <BreadcrumbProvider>
      <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
        <Breadcrumbs />
        <Outlet />
      </Breadcrumb>
    </BreadcrumbProvider>
  )
}

export function Friends() {
  return (
    <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>
      <h1>Friends</h1>
      <Outlet />
    </Breadcrumb>
  )
}
```

`title` can be any React node — a string, a `<span>`, or a custom component.

### Route handles

React Router 7 can declare crumbs on the route. Use `source="route"` (or
`"merged"`) to read them through `useMatches()`:

```tsx
{
  path: 'friends/:name',
  loader: friendLoader,
  handle: {
    crumb: (match) => match.data.name,
  },
}

<Breadcrumbs source="route" />
```

Registered crumbs still win on the same pathname when `source="merged"`.

### Async titles

Because `<Breadcrumb>` re-registers when `data` changes, a title can start as a
placeholder and update when a loader or fetch resolves:

```tsx
function Friend() {
  const friend = useLoaderData()
  return (
    <Breadcrumb data={{ title: friend.name, pathname: `/friends/${friend.slug}` }}>
      <h1>{friend.name}</h1>
    </Breadcrumb>
  )
}
```

### Custom links (from historical PR #100)

```tsx
<Breadcrumbs linkComponent={Link} />

<Breadcrumb
  data={{ title: 'Home', pathname: '/' }}
  linkProps={{ 'data-analytics': 'crumb-home' }}
/>
```

### RTL

There is no `rtl` prop. The default stylesheet uses logical properties
(`margin-inline-end`), so the trail follows `dir="rtl"` on the document.

### Props

**`<Breadcrumbs>`**

| Prop | Type | Notes |
| --- | --- | --- |
| `className` | `string` | Outer wrapper |
| `hidden` | `boolean` | Hides the trail |
| `separator` | `ReactNode` | Default `›` |
| `setCrumbs` | `(crumbs) => crumbs` | Rewrite the list before render |
| `wrapper` | component | Default is `<nav aria-label="Breadcrumb">` |
| `linkComponent` | component | Default is React Router `NavLink` |
| `source` | `'registered' \| 'route' \| 'merged'` | Default `'registered'` |

**`<Breadcrumb>`**

| Prop | Type | Notes |
| --- | --- | --- |
| `data` | `{ title, pathname, search?, state? }` | Required |
| `hidden` | `boolean` | Skip this crumb |
| `linkProps` | object | Spread onto the link for this crumb |

The last crumb is not a link. It gets `aria-current="page"`.

## Demo

```sh
npm install
npm run dev
```

## Migrating from v2

- Add `<BreadcrumbProvider>` above `<Breadcrumbs>` and `<Breadcrumb>`.
- Install `react-router` ≥ 7 (not `react-router-dom` v5).
- Import CSS from `react-breadcrumbs/styles.css`.
- `exact` / `activeClassName` are gone; the current page is a `<span>`.
- The default wrapper is `<nav>` / `<ol>` / `<li>`, not `<div>` / `<span>`.
- The package is ESM-only. There is no UMD bundle.

## License

ISC
