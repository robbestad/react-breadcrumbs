# React Breadcrumbs

[React][1] component use to generate a breadcrumb trail (compatible with
[React Router][2]).

## Installation

```sh
npm install --save react-breadcrumbs
```

Note: this version is only compatible with React-Router v4 and up. If you
need a version that is compatible with React-Router v3 and below, use
```
npm install --save react-breadcrumbs@1.6.x
```

## Demo

The `/demo` directory provide one example of how this
package can be used. See the [`/demo`][3] for the code powering the small
site.

## Usage

This package exposes two components, a `<Breadcrumbs>` component to wrap
the entire application and a `<Breadcrumb>` component to use throughout
the different sections (e.g. `<Route>`s) within the application.

### Breadcrumbs

The top-level `<Breadcrumbs>` component accepts the following `props`:

- `className` (string): A class name for the outer wrapper element.
- `hidden` (bool): Hide the inner breadcrumbs wrapper.
- `setCrumbs` (func): A `function(crumbs: [Object]): [Object]` which will be called before crumbs are rendered.
- `wrapper` (func|class): A react component to use for the inner wrapper.

### Breadcrumb

- `data` (object): An extended [location descriptor][5]. See below...
- `hidden` (bool): Hide an individual breadcrumb (rarely needed).

The `data` object allows any valid [location descriptor][5] key (e.g.
`pathname` or `search`) as well as a `title` prop:

``` js
{
  title: 'Home', // Any valid `PropTypes.node`
  pathname: '/',
  // ... any other location descriptor values
}
```

The fact that the `title` can be any valid `PropTypes.node` allows for a huge
amount of customization. The following values are all valid:

``` jsx
title: 'Home'
title: <span title="Hovered!">Home</span>
title: <CustomComponent title="Home" icon="house" />
```

### Authors

This project would not have been where it is today without massive contributions from
a whole lot of people ([`AUTHORS`][6]). Suport for React Router v4 support was written
entirely by ([`@skipjack`][7]).

[1]: https://facebook.github.io/react
[2]: https://github.com/rackt/react-router
[3]: https://github.com/svenanders/react-breadcrumbs/tree/master/demo
[4]: http://breadcrumbs.surge.sh/index.html
[5]: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md
[6]: https://github.com/svenanders/react-breadcrumbs/tree/master/AUTHORS
[7]: https://github.com/skipjack
