# React Breadcrumbs Demo

This simple demo includes a variety of routes and very basic content to
demonstrate clearly how `react-breadcrumbs` can easily be integrated into
your application. It is compiled via `webpack` and the following scripts
are available:

- `npm start`: Start a local `webpack-dev-server` to test the site.
- `npm run build`: Build a production version of the demo.

Note that making an "enhanced route" component is only one method of using 
the `<Breadcrumb>` component. It can also be used directly for throughout
the application, dynamically at the top-level using the `hidden` prop, or
in a variety of other ways.

See the [`/src`][1] directory for all code. The `/dist` directory is auto
generated and should not be edited.


## TODOs

Note that we kept the site extremely simple intentionally. Obviously it
would be better to dynamically create routes and links using data.

We should also create a `webpack.common.js` file and use `webpack-merge`
to dedupe the configurations. I think we could also simplify management
of the HTML file either via the `HTMLWebpackPlugin` or the `CopyWebpackPlugin`
so everything in `/dist` is truly auto-generated.


[1]: https://github.com/svenanders/react-breadcrumbs/tree/master/demo/src