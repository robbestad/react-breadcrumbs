# React Breadcrumbs 

[React][1] Component for [React-Router][4]. 

Demo at [learnreact.robbestad.com][2]

Source on [github][5]

## Installation

    % npm install react-breadcrumbs --save

Semver:

0.13 branch

    % npm install react-breadcrumbs@0.13.x --save

1.0.0 beta branch

    % npm install react-breadcrumbs@1.0.x --save

## Versioning

  The aim is to correlate with react-router. 

  Note: There are now two branches of react-breadcrumbs,
  a version for the 0.13-branch of react-router and one for 
  the 1.0.0-beta1. Please take care that you use the one that 
  matches your installed version of React-Router.

  *NB!* The _master_ branch mirrors the _0.13_ branch

## Usage

    var Breadcrumbs = require('react-breadcrumbs');

    MyComponent = React.createClass({
      render: function() {
         return (
           <div>
           	 <Breadcrumbs />
           </div>
        );
      }
    });

Optionally, you can add this prop to replace the default separator:

    <Breadcrumbs separator=" | " />

The breadcrumbs will automatically populate based on your 
route configuration. It requires that you have a name="" parameter
in your routes for every route. It will use the displayName parameter
for the Breadcrumb link. 

Another optional is _breadcrumbName_:

    <Breadcrumbs breadcrumbName="My breadcrumb name" />

The point of this property is to provide a method to set a breaadcrumb name for the final breadcrumb. 

You can also exclude specific routes if you want to:

    <Breadcrumbs excludes={['App']} />

This will print all breadcrumbs, except for the one where the route name is `App`.

    <Breadcrumbs displayMissing="true|false" displayMissingText="This title is missing" />
    
This property set allows you determine if you want to display routes in the hierarchy with missing display names.
default = true. When true, uses the displayMissingText property as an override to the default text.

    <Breadcrumbs wrapperElement="div" itemElement="span />
    
These properties allow you to override the defauly ol and li elements to specify an alternate set based on your styling
and markup needs.

    <Breadcrumbs customClass="breadcrumbs" />

This property allows you to override the default class set on the breadcrumbs node so you can specify your own.

    <Breadcrumbs hideNoPath="true|false" />
    
In some cases React-Router may not have a path in the parent node. This is a valid use case when you want to wrap components
with other components but they are not true routes. For these you can use the "hideNoPath" property (default=true) to either
hide or show these in the breadcrumbs.
    

## Styling

The breadcrumbs are set up with a div with the class name "breadcrumbs".

[1]: https://facebook.github.io/react
[2]: http://opensourceprojects.robbestad.com/#/breadcrumbs
[3]: https://github.com/svenanders/react-breadcrumbs/issues/1
[4]: https://github.com/rackt/react-router
[5]: https://github.com/svenanders/react-breadcrumbs
