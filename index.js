"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class Breadcrumbs
 * @description New breadcrumbs class based on ES6 structure.
 * @exports Breadcrumbs
 * @version 1.0
 * @extends component
 * @requires react
 * @requires react-router
 * @requires lodash
 *
 */

var React = _interopRequire(require("react"));

var _reactRouter = require("react-router");

var Router = _reactRouter.Router;
var Route = _reactRouter.Route;
var Link = _reactRouter.Link;

var Breadcrumbs = (function (_React$Component) {
  function Breadcrumbs() {
    _classCallCheck(this, Breadcrumbs);

    _get(Object.getPrototypeOf(Breadcrumbs.prototype), "constructor", this).call(this);
    this.displayName = "Breadcrumbs";
  }

  _inherits(Breadcrumbs, _React$Component);

  _createClass(Breadcrumbs, {
    _getDisplayName: {
      value: function _getDisplayName(route) {
        var name = null;

        if (route.indexRoute) {
          name = route.indexRoute.displayName || null;
        } else {
          name = route.displayName || null;
        }

        //check to see if a custom name has been applied to the route
        if (!name && !!route.name) {
          name = route.name;
        }

        //if the name exists and it's in the excludes list exclude this route
        if (name && this.props.excludes.some(function (item) {
          return item === name;
        })) {
          return null;
        }if (!name && this.props.displayMissing) {
          name = this.props.displayMissingText;
        }

        return name;
      }
    },
    _resolveRouteName: {
      value: function _resolveRouteName(route) {
        var paramName = arguments[1] === undefined ? "" : arguments[1];

        var name = this._getDisplayName(route);
        if (!route.childRoutes && paramName.toString().length) name = paramName.toString();
        if (!name && route.name) name = route.name;
        return name;
      }
    },
    _processRoute: {
      value: function _processRoute(route, routesLength, crumbsLength, isRoot) {
        var _this = this;

        //if there is no route path defined and we are set to hide these then do so
        if (!route.path && this.props.hideNoPath) {
          return null;
        }var separator = "";
        var paramName = "";
        if (this.props.params) {
          paramName = Object.keys(this.props.params).map(function (param) {
            return _this.props.params[param];
          });
        }
        var name = this._resolveRouteName(route, paramName);
        var makeLink = isRoot;

        // don't make link if route doesn't have a child route
        if (makeLink) {
          makeLink = route.childRoutes ? true : false;
          makeLink = routesLength !== crumbsLength + 1;
        }
        separator = routesLength !== crumbsLength + 1 ? this.props.separator : "";

        // don't make link if route has a disabled breadcrumblink prop
        if (route.hasOwnProperty("breadcrumblink")) {
          makeLink = route.breadcrumblink;
        };
        if (name) {
          if (makeLink) {
            var link = React.createElement(Link, {
              to: route.path,
              params: route.params
            }, name);
          } else {
            link = name;
          }
          return React.createElement(this.props.itemElement, { key: Math.random() * 100 }, link, separator);
        }

        return null;
      }
    },
    _buildRoutes: {
      value: function _buildRoutes(routes) {
        var _this = this;

        var crumbs = [];
        var isRoot = routes[1].hasOwnProperty("path");
        routes.map(function (route, index) {
          if (0 < index && "path" in route && "/" !== route.path.substr(0, 1)) {
            var parentPath = "";

            for (var i = 0; i < index; i++) {
              if ("path" in routes[i]) {
                parentPath += routes[i].path;
              }
            }

            route.path = parentPath + route.path;
          }

          var result = _this._processRoute(route, routes.length, crumbs.length, isRoot);
          if (result) {
            crumbs.push(result);
          }
        });

        return React.createElement(this.props.wrapperElement, { className: this.props.customClass }, crumbs);
      }
    },
    render: {
      value: function render() {
        return this._buildRoutes(this.props.routes);
      }
    }
  });

  return Breadcrumbs;
})(React.Component);

/**
 * @property PropTypes
 * @description Property types supported by this component
 * @type {{separator: *, displayMissing: *, displayName: *, breadcrumbName: *, wrapperElement: *, itemElement: *, customClass: *, excludes: *}}
 */
Breadcrumbs.propTypes = {
  separator: React.PropTypes.string,
  displayMissing: React.PropTypes.bool,
  displayMissingText: React.PropTypes.string,
  displayName: React.PropTypes.string,
  breadcrumbName: React.PropTypes.string,
  wrapperElement: React.PropTypes.string,
  itemElement: React.PropTypes.string,
  customClass: React.PropTypes.string,
  excludes: React.PropTypes.arrayOf(React.PropTypes.string),
  hideNoPath: React.PropTypes.bool,
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

/**
 * @property defaultProps
 * @description sets the default values for propTypes if they are not provided
 * @type {{separator: string, displayMissing: boolean, wrapperElement: string, itemElement: string, customClass: string}}
 */
Breadcrumbs.defaultProps = {
  separator: " > ",
  displayMissing: true,
  displayMissingText: "Missing Name from Route",
  wrapperElement: "div",
  itemElement: "span",
  customClass: "breadcrumbs",
  excludes: [],
  hideNoPath: true
};

/**
 * @property contextTypes
 * @description List of objects to incorporate into the context of this class
 * @type {{routes: *}}
 */
Breadcrumbs.contextTypes = {
  routes: React.PropTypes.array,
  params: React.PropTypes.array
};

module.exports = Breadcrumbs;