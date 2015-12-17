var React = require('react/addons');
var objectAssign = require('object-assign');

var stubRouterContext = (Component, props, stubs) => {
  function RouterStub() { }

  objectAssign(RouterStub, {
    makePath () {},
    makeHref () {},
    transitionTo () {},
    replaceWith () {},
    goBack () {},
    getCurrentPath () {},
    getCurrentRoutes () {},
    getCurrentPathname () {},
    getCurrentParams () {},
    getCurrentQuery () {},
    isActive () {},
  }, stubs)

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func
    },

    getChildContext () {
      return {
        router: RouterStub
      };
    },

    render () {
      return <Component {...props} />
    }
  });
};

export default stubRouterContext;
