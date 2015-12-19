'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

var Breadcrumbs = (function (_React$Component) {
  _inherits(Breadcrumbs, _React$Component);

  function Breadcrumbs() {
    _classCallCheck(this, Breadcrumbs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Breadcrumbs).call(this));

    _this.displayName = "Breadcrumbs";
    return _this;
  }

  _createClass(Breadcrumbs, [{
    key: '_getDisplayName',
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
      //if (name && this.props.excludes.some(item => item === name)) return null;

      if (!name && this.props.displayMissing) {
        name = this.props.displayMissingText;
      }

      return name;
    }
  }, {
    key: '_resolveRouteName',
    value: function _resolveRouteName(route) {
      var name = this._getDisplayName(route);
      if (!name && route.breadcrumbName) name = route.breadcrumbName;
      if (!name && route.name) name = route.name;
      return name;
    }
  }, {
    key: '_processRoute',
    value: function _processRoute(route, routesLength, crumbsLength, isRoot, createElement) {
      var _this2 = this;

      //if there is no route path defined and we are set to hide these then do so
      if (!route.path && this.props.hideNoPath) return null;

      var separator = "";
      var paramName = "";
      var pathValue = "";
      var name = this._resolveRouteName(route);

      var makeLink = isRoot;

      // don't make link if route doesn't have a child route
      if (makeLink) {
        makeLink = route.childRoutes ? true : false;
        makeLink = routesLength !== crumbsLength + 1;
      }

      // set up separator
      separator = routesLength !== crumbsLength + 1 ? this.props.separator : "";

      // don't make link if route has a disabled breadcrumblink prop
      if (route.hasOwnProperty("breadcrumblink")) {
        makeLink = route.breadcrumblink;
      };

      // find param name (if provided)
      if (this.props.params) {
        paramName = Object.keys(this.props.params).map(function (param) {
          pathValue = param;
          return _this2.props.params[param];
        });
      }

      // Replace route param with real param (if provided)
      var currentKey = route.path.split("/")[route.path.split("/").length - 1];
      var keyValue = undefined;
      route.path.split("/").map(function (link) {
        if (link.substring(0, 1) == ":") {
          if (_this2.props.params) {
            keyValue = Object.keys(_this2.props.params).map(function (param) {
              return _this2.props.params[param];
            });
            var pathWithParam = route.path.split("/").map(function (link) {
              if (link.substring(0, 1) == ":") {
                return keyValue.shift();
              } else {
                return link;
              }
            });
            route.path = pathWithParam.reduce(function (start, link) {
              return start + "/" + link;
            });
            if (currentKey.substring(0, 1) == ":") name = pathWithParam.reduce(function (start, link) {
              return link;
            });
          }
        }
      });
      if (name) {
        if (makeLink) {
          var link = !createElement ? name : _react2.default.createElement(_reactRouter.Link, {
            to: route.path,
            params: route.params
          }, name);
        } else {
          link = name;
        }
        return !createElement ? link : _react2.default.createElement(this.props.itemElement, { key: Math.random() * 100 }, link, separator);
      }

      return null;
    }
  }, {
    key: '_buildRoutes',
    value: function _buildRoutes(routes, createElement) {
      var _this3 = this;

      var crumbs = [];
      var isRoot = routes[1] && routes[1].hasOwnProperty("path");
      var parentPath = '/';
      routes.map(function (_route, index) {
        var route = JSON.parse(JSON.stringify(_route));
        if ('props' in route && 'path' in route.props) {
          route.path = route.props.path;
          route.children = route.props.children;
          route.name = route.props.name;
        }
        if (route.path) {
          if (route.path.charAt(0) === '/') {
            parentPath = route.path;
          } else {
            if (parentPath.charAt(parentPath.length - 1) !== '/') {
              parentPath += '/';
            }
            parentPath += route.path;
          }
        }

        if (0 < index && route.path && route.path.charAt(0) !== '/') {
          route.path = parentPath;
        }

        var result = _this3._processRoute(route, routes.length, crumbs.length, isRoot, createElement);
        if (result) {
          crumbs.push(result);
        }
      });
      return !createElement ? crumbs : _react2.default.createElement(this.props.wrapperElement, { className: this.props.customClass }, crumbs);
    }
  }, {
    key: 'render',
    value: function render() {
      var createElement = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      return this._buildRoutes(this.props.routes, createElement);
    }
  }]);

  return Breadcrumbs;
})(_react2.default.Component);

/**
 * @property PropTypes
 * @description Property types supported by this component
 * @type {{separator: *, displayMissing: *, displayName: *, breadcrumbName: *, wrapperElement: *, itemElement: *, customClass: *, excludes: *}}
 */

Breadcrumbs.propTypes = {
  separator: _react2.default.PropTypes.string,
  displayMissing: _react2.default.PropTypes.bool,
  displayMissingText: _react2.default.PropTypes.string,
  displayName: _react2.default.PropTypes.string,
  breadcrumbName: _react2.default.PropTypes.string,
  wrapperElement: _react2.default.PropTypes.string,
  itemElement: _react2.default.PropTypes.string,
  customClass: _react2.default.PropTypes.string,
  excludes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  hideNoPath: _react2.default.PropTypes.bool,
  routes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired
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
  routes: _react2.default.PropTypes.array,
  params: _react2.default.PropTypes.array
};

exports.default = Breadcrumbs;