# React Breadcrumbs

[React][1] Component for [React-Router][4].

## Installation

```sh
npm install react-breadcrumbs --save
```

## Versioning

  The aim is to be compatible with the current
  version of react-router.

  **Please use the _master_ branch only**

## Demo

[>> TO THE DEMO][2]

The demo shows how the breadcrumbs will use the named routes for parent paths and
parameterized paths when provided with :parameter in your routes.

The demo is using this route setup:

```jsx
<Router history={hashHistory}>
  <Route path="/" name="Examples" component={App} >
    <Route name="Users" path="users" component={Users}>
      <Route name="UserLocator" path=":userId" component={User}>
        <Route name="UserDetails" path="details" component={UserDetails} />
      </Route>
    </Route>
    <Route name='RouteName1' path='parent' component={Info}>
      <Route name='RouteName2' path='child1' component={Info}>
        <Route name='RouteName3' path=':item1' component={Info}>
          <Route name='RouteName4' path='child2' component={Info}>
            <Route name='RouteName5' path=':item2' component={Info}>
              <Route name='RouteName6' path='child3' component={Info}>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
  <Route name="404: No Match for route" path="*" component={NoMatch}/>
</Router>
```

Routes with parameterized paths default to using the parameter value as the breadcrumb name. However, there may be a case where you want to override this behavior.  
If you want to force the route to use the name value provided you can add the `staticName` prop to the `Route`:

```jsx
<Route name="UserLocator" staticName={true} path=":userId" component={User}>
```

You can then use the `getDisplayName` prop for dynamic labels as well:

```jsx
<Route name="UserLocator" component={User} getDisplayName={() => `Current time is ${new DateTime()}`} />
```

You can also access props from the component itself to name the crumb dynamically, like so (from *routes.jsx* in the demo folder):

```jsx
    <Route name="UserLocator" path=":userId" component={User}
               getDisplayName={param => Number(param.userId) === 1 ? "John" : "Rambo"}>
```


## Usage

```jsx
var Breadcrumbs = require('react-breadcrumbs');

MyComponent = React.createClass({
  render: function() {
    return (
      <div>
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
        />
      </div>
    );
  }
});
```

Optionally, you can add this prop (string or React element) to replace the default separator:

```jsx
<Breadcrumbs separator=" | " />
```

The breadcrumbs will automatically populate based on your
route configuration. It requires that you have a name="" parameter
in your routes for every route. It will use the displayName parameter
for the Breadcrumb link.

Another optional is _breadcrumbName_:

```jsx
<Breadcrumbs breadcrumbName="My breadcrumb name" />
```

The point of this property is to provide a method to set a breadcrumb name for the final breadcrumb.

```jsx
<Breadcrumbs excludes={['App']} />
```
This will print all breadcrumbs, except for the one where the route name is `App`.

```jsx
<Breadcrumbs setDocumentTitle={true} />
```

Starting with v1.3.4, this will set the document title to your last item in the breadcrumbs.

```jsx
<Breadcrumbs createElement={false} />
```

This property allows you to choose whether a wrapper element is created around the breadcrumb. When false,
no wrapper element is created, allowing you to create your own wrapper with custom props.

```jsx
<Breadcrumbs displayMissing="true|false" displayMissingText="This title is missing" />
```

This property set allows you determine if you want to display routes in the hierarchy with missing display names.
default = true. When true, uses the displayMissingText property as an override to the default text.

```jsx
<Breadcrumbs wrapperElement="ol" itemElement="li" />
```

These properties allow you to override the default div and span elements to specify an alternate set based on your styling
and markup needs.

```jsx
<Breadcrumbs wrapperClass="breadcrumbs" itemClass="step" />
```

These properties allow you to override the default class set on the breadcrumbs node and item elements.

```jsx
<Breadcrumbs hideNoPath="true|false" />
```

These properties allow you to append and/or prepend an arbitrary amount of react elements
```jsx
<Breadcrumbs prepend={<SingleComponent />} append={[<this>too</this>, <this>also</this]} />
```

In some cases React-Router may not have a path in the parent node. This is a valid use case when you want to wrap components
with other components but they are not true routes. For these you can use the "hideNoPath" property (default=true) to either
hide or show these in the breadcrumbs.


## Styling

The breadcrumbs are set up in a div with the class name "breadcrumbs".


## Dynamic and Asynchronous data

Sometimes you could like to display in the breadcrumbs something taken from a server-size call; in this case route params are meaningful for a database instead of something for being displayed in a breadcrumbs (a common case when you are working with a RESTful API).
In this case you would like to display something more complex in the breadcrumbs instead of the raw param.

You can use the `getDisplayName` prop combined with `staticName` to handle parametrized paths (example below suppose Redux usage):

```jsx
<Route name="UserLocator" component={User} staticName={true} getDisplayName={() => store.getStore().something.foo} />
```

You can also handle asynchronous loading of data in the store:

```jsx
<Route name="UserLocator" component={User} staticName={true} getDisplayName={() => store.getStore().something.foo || '...'} />
```

Probably initially data in the store will be empty, so in this case you need to trigger a re-render when data change.
Just pass proper params to the Breadcrumbs:

```jsx
<Breadcrumbs something={something} />
```

[1]: https://facebook.github.io/react
[2]: http://breadcrumbs.surge.sh/index.html
[3]: https://github.com/svenanders/react-breadcrumbs/issues/1
[4]: https://github.com/rackt/react-router
[5]: https://github.com/svenanders/react-breadcrumbs
