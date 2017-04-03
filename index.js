'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Breadcrumbs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description New breadcrumbs class based on ES6 structure.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @exports Breadcrumbs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 1.1.11
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @extends component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @requires react
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @requires react-router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Breadcrumbs = function (_React$Component) {
  _inherits(Breadcrumbs, _React$Component);

  function Breadcrumbs(props) {
    _classCallCheck(this, Breadcrumbs);

    var _this = _possibleConstructorReturn(this, (Breadcrumbs.__proto__ || Object.getPrototypeOf(Breadcrumbs)).call(this, props));

    _this.displayName = "Breadcrumbs";
    return _this;
  }

  _createClass(Breadcrumbs, [{
    key: '_getDisplayName',
    value: function _getDisplayName(route) {
      var name = null;

      if (typeof route.getDisplayName === 'function') {
        name = route.getDisplayName();
      }

      if (route.indexRoute) {
        name = name || route.indexRoute.displayName || null;
      } else {
        name = name || route.displayName || null;
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
    key: '_addKeyToElement',
    value: function _addKeyToElement(el) {
      return el && !el.key && el.type ? Object.assign({}, el, { key: Math.random() * 100 }) : el;
    }
  }, {
    key: '_addKeyToArrayElements',
    value: function _addKeyToArrayElements(item) {
      var _this2 = this;

      return item.map(function (el) {
        return _this2._addKeyToElement(el);
      });
    }
  }, {
    key: '_processCustomElements',
    value: function _processCustomElements(items) {
      var _this3 = this;

      return items.map(function (el) {
        if (!el) return null;
        if (Array.isArray(el)) return _this3._addKeyToArrayElements(el);
        return _this3._addKeyToElement(el);
      });
    }
  }, {
    key: '_appendAndPrependElements',
    value: function _appendAndPrependElements(originalBreadCrumbs) {
      var crumbs = [];
      var appendAndPrepend = this._processCustomElements([originalBreadCrumbs.shift(), originalBreadCrumbs.pop()]);
      if (appendAndPrepend[0]) crumbs.unshift(appendAndPrepend[0]);
      crumbs.push(originalBreadCrumbs[0]);
      if (appendAndPrepend[1]) crumbs.push(appendAndPrepend[1]);

      return crumbs.reduce(function (acc, cur) {
        return acc.concat(cur);
      }, []).filter(function (e) {
        return e;
      });
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
      var _this4 = this;

      //if there is no route path defined and we are set to hide these then do so
      if (!route.path && this.props.hideNoPath) return null;

      var separator = "";
      var paramName = "";
      var pathValue = "";
      var name = this._resolveRouteName(route);
      if (name && 'excludes' in this.props && this.props.excludes.some(function (item) {
        return item === name;
      })) return null;

      var makeLink = true;

      // don't make link if route doesn't have a child route
      if (makeLink) {
        makeLink = route.childRoutes ? true : false;
        makeLink = routesLength !== crumbsLength + 1;
      }

      // set up separator
      separator = routesLength !== crumbsLength + 1 ? this.props.separator : "";
      if (!makeLink) separator = "";

      // don't make link if route has a disabled breadcrumblink prop
      if (route.hasOwnProperty("breadcrumblink")) {
        makeLink = route.breadcrumblink;
      }

      // find param name (if provided)
      if (this.props.params) {
        paramName = Object.keys(this.props.params).map(function (param) {
          pathValue = param;
          return _this4.props.params[param];
        });
      }

      // Replace route param with real param (if provided)
      var currentKey = route.path.split("/")[route.path.split("/").length - 1];
      var keyValue = void 0;
      route.path.split("/").map(function (link) {
        if (link.substring(0, 1) == ":") {
          if (_this4.props.params) {
            keyValue = Object.keys(_this4.props.params).map(function (param) {
              return _this4.props.params[param];
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
            if (!route.staticName && currentKey.substring(0, 1) == ":") name = pathWithParam.reduce(function (start, link) {
              return link;
            });

            if (typeof route.prettifyParam === 'function') {
              name = route.prettifyParam(name);
            }
          }
        }
      });
      if (name) {

        if (this.props.prettify) {
          // Note: this could be replaced with a more complex prettifier
          console.log('prettifying');
          name = name.replace(/-/g, ' ');
          name = name.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }

        var itemClass = this.props.itemClass;
        if (makeLink) {
          var link = !createElement ? name : _react2.default.createElement(this.props.Link || _reactRouter.Link, {
            to: route.path
          }, name);
        } else {
          link = name;
          itemClass += ' ' + this.props.activeItemClass;
        }
        return !createElement ? link : _react2.default.createElement(this.props.itemElement, { className: itemClass, key: Math.random() * 100 }, link, separator);
      }

      return null;
    }
  }, {
    key: '_buildRoutes',
    value: function _buildRoutes(routes, createElement, prepend, append) {
      var _this5 = this;

      var crumbs = [];
      var isRoot = routes[1] && routes[1].hasOwnProperty("path");
      var parentPath = '/';

      var routesWithExclude = [];
      routes.forEach(function (_route, index) {
        var route = Object.assign({}, _route);
        if (typeof _route.prettifyParam === 'function') {
          route.prettifyParam = _route.prettifyParam;
        }
        if ('props' in route && 'path' in route.props) {
          route.path = route.props.path;
          route.children = route.props.children;
          route.name = route.props.name;
          route.prettifyParam = route.props.prettifyParam;
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
        var name = _this5._resolveRouteName(route);
        if ((_this5.props.displayMissing || name) && route.path && !('excludes' in _this5.props && _this5.props.excludes.some(function (item) {
          return item === name;
        }))) routesWithExclude.push(route);
      });
      routes = routesWithExclude;
      routes.map(function (route, index) {
        if (!route) return null;
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

        var result = _this5._processRoute(route, routes.length, crumbs.length, isRoot, createElement);
        if (result) {
          crumbs.push(result);
        }
      });

      if (_exenv2.default.canUseDOM) {
        if (window && window.document) {
          if ('setDocumentTitle' in this.props && this.props.setDocumentTitle && crumbs.length > 0) {
            window.document.title = crumbs[crumbs.length - 1].props.children[0];
          }
        }
      }

      if (prepend || append) crumbs = this._appendAndPrependElements([prepend, crumbs, append]);

      return !createElement ? crumbs : _react2.default.createElement(this.props.wrapperElement, { className: this.props.customClass || this.props.wrapperClass }, crumbs);
    }
  }, {
    key: 'render',
    value: function render() {
      return this._buildRoutes(this.props.routes, this.props.createElement, this.props.prepend, this.props.append);
    }
  }]);

  return Breadcrumbs;
}(_react2.default.Component);

/**
 * @property PropTypes
 * @description Property types supported by this component
 * @type {{separator: *, createElement: *, displayMissing: *, displayName: *, breadcrumbName: *, wrapperElement: *, wrapperClass: *, itemElement: *, itemClass: *, activeItemClass: *,  customClass: *,excludes: *, append: *, prepend: *}}
 */


Breadcrumbs.propTypes = {
  prepend: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.bool]),
  append: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.bool]),
  separator: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]),
  createElement: _react2.default.PropTypes.bool,
  displayMissing: _react2.default.PropTypes.bool,
  prettify: _react2.default.PropTypes.bool,
  displayMissingText: _react2.default.PropTypes.string,
  displayName: _react2.default.PropTypes.string,
  breadcrumbName: _react2.default.PropTypes.string,
  wrapperElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]),
  wrapperClass: _react2.default.PropTypes.string,
  itemElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]),
  itemClass: _react2.default.PropTypes.string,
  customClass: _react2.default.PropTypes.string,
  activeItemClass: _react2.default.PropTypes.string,
  excludes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
  hideNoPath: _react2.default.PropTypes.bool,
  routes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired,
  setDocumentTitle: _react2.default.PropTypes.bool
};

/**
 * @property defaultProps
 * @description sets the default values for propTypes if they are not provided
 * @type {{separator: string, displayMissing: boolean, wrapperElement: string, itemElement: string, wrapperClass: string, customClass: string, prepend: false, append: false}}
 */
Breadcrumbs.defaultProps = {
  prepend: false,
  append: false,
  separator: " > ",
  createElement: true,
  displayMissing: true,
  displayMissingText: "Missing name prop from Route",
  wrapperElement: "div",
  wrapperClass: "breadcrumbs",
  itemElement: "span",
  itemClass: "",
  activeItemClass: "",
  excludes: [''],
  prettify: false,
  hideNoPath: true,
  setDocumentTitle: false
};

module.exports = Breadcrumbs;

