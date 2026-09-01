# React Breadcrumbs demo

Vite + React 19 + React Router 7 app that exercises the library.

```sh
npm install
npm run dev
```

The demo shows:

- Nested trails (Friends, Events, Locations)
- Loader-driven titles (Alice and the other friends)
- `hidden` crumbs (Overlook)
- Route `handle.crumb` via the source toggle
- RTL via `dir` on the document

`npm run build:demo` writes a static site to `demo/dist`.
