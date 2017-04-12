/* global window */

/**
 * @class Breadcrumbs
 * @description New breadcrumbs class based on ES6 structure.
 * @exports Breadcrumbs
 * @version 1.1.11
 * @extends component
 * @requires react
 * @requires react-router
 *
 */
import React from 'react';
import {Link} from 'react-router';
import ExecutionEnvironment from 'exenv';

class Breadcrumbs extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Breadcrumbs';
  }

  _getDisplayName(route) {
    let name = null;

    if (typeof route.getDisplayName === 'function') {
      name = route.getDisplayName();
    }

    if (route.indexRoute) {
      name = name || route.indexRoute.displayName || null;
    } else {
      name = name || route.displayName || null;
    }

    // check to see if a custom name has been applied to the route
    if (!name && Boolean(route.name)) {
      name = route.name;
    }

    // if the name exists and it's in the excludes list exclude this route
    // if (name && this.props.excludes.some(item => item === name)) return null;

    if (!name && this.props.displayMissing) {
      name = this.props.displayMissingText;
    }

    return name;
  }

  _addKeyToElement(el) {
    return (el && !el.key && el.type)
      ? Object.assign({}, el, {'key': Math.random() * 100})
      : el;
  }

  _addKeyToArrayElements(item) {
    return item.map((el) => this._addKeyToElement(el));
  }

  _processCustomElements(items) {
    return items.map((el) => {
      if (!el) {
        return null;
      }
      if (Array.isArray(el)) {
        return this._addKeyToArrayElements(el);
      }
      return this._addKeyToElement(el);
    });
  }

  _appendAndPrependElements(originalBreadCrumbs) {
    let crumbs = [];
    let appendAndPrepend = this._processCustomElements([originalBreadCrumbs.shift(), originalBreadCrumbs.pop()]);
    if (appendAndPrepend[0]) {
      crumbs.unshift(appendAndPrepend[0]);
    }
    crumbs.push(originalBreadCrumbs[0]);
    if (appendAndPrepend[1]) {
      crumbs.push(appendAndPrepend[1]);
    }

    return crumbs.reduce((acc, cur) => acc.concat(cur), []).filter((e) => e);
  }

  _resolveRouteName(route) {
    let name = this._getDisplayName(route);
    if (!name && route.breadcrumbName) {
      name = route.breadcrumbName;
    }
    if (!name && route.name) {
      name = route.name;
    }
    return name;
  }

  _processRoute(route, routesLength, crumbsLength, createElement) {
    // if there is no route path defined and we are set to hide these then do so
    if (!route.path && this.props.hideNoPath) {
      return null;
    }

    let separator = '';
    let name = this._resolveRouteName(route);
    if (name
      && 'excludes' in this.props
      && this.props.excludes.some((item) => item === name)) {
      return null;
    }

    let makeLink = true;

    // don't make link if route doesn't have a child route
    if (makeLink) {
      makeLink = Boolean(route.childRoutes);
      makeLink = routesLength !== (crumbsLength + 1);
    }

    // set up separator
    separator = routesLength === (crumbsLength + 1) ? '' : this.props.separator;
    if (!makeLink) {
      separator = '';
    }

    // don't make link if route has a disabled breadcrumblink prop
    if (Object.prototype.hasOwnProperty.call(route, 'breadcrumblink')) {
      makeLink = route.breadcrumblink;
    }

    // Replace route param with real param (if provided)
    let currentKey = route.path.split('/')[route.path.split('/').length - 1];
    let keyValue;
    route.path.split('/').forEach((link) => {
      // if this is not a param, or we've been given no params to replace with,
      // we need not do anything
      if (link.substring(0, 1) !== ':' || !this.props.params) {
        return;
      }

      keyValue = Object.keys(this.props.params).map((param) => {
        return this.props.params[param];
      });
      let pathWithParam = route.path.split('/').map((link) => {
        if (link.substring(0, 1) === ':') {
          return keyValue.shift();
        }
        return link;
      });
      route.path = pathWithParam.reduce((start, link) => {
        return start + '/' + link;
      });
      if (!route.staticName && currentKey.substring(0, 1) === ':') {
        name = pathWithParam.reduce((start, link) => {
          return link;
        });
      }

      if (typeof route.prettifyParam === 'function') {
        name = route.prettifyParam(name, this.props.params);
      }
    });

    if (!name) {
      return null;
    }

    if (this.props.prettify) {
      // Note: this could be replaced with a more complex prettifier
      name = name.replace(/-/g, ' ');
      name = name.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    var link = name;
    var itemClass = this.props.itemClass;
    if (makeLink) {
      if (createElement) {
        link = React.createElement(
          this.props.Link || Link,
          {'to': route.path},
          name
        );
      }
    } else {
      itemClass += ' ' + this.props.activeItemClass;
    }

    if (!createElement) {
      return link;
    }
    return React.createElement(
      this.props.itemElement,
      {'className': itemClass, 'key': Math.random() * 100},
      link,
      separator
    );
  }

  _buildRoutes(routes, createElement, prepend, append) {
    let crumbs = [];
    let parentPath = '/';

    // iterate over the initial list of routes and remove all that don't apply
    routes = routes
      .map((_route, index) => {
        let route = Object.assign({}, _route);
        if (typeof _route.prettifyParam === 'function') {
          route.prettifyParam = _route.prettifyParam;
        }
        if ('props' in route && 'path' in route.props) {
          route.path = route.props.path;
          route.children = route.props.children;
          route.name = route.props.name;
          route.prettifyParam = route.props.prettifyParam;
        }
        if (!route.path) {
          return null;
        }
        if (route.path.charAt(0) === '/') {
          parentPath = route.path;
        } else {
          if (parentPath.charAt(parentPath.length - 1) !== '/') {
            parentPath += '/';
          }
          parentPath += route.path;
        }
        if (index > 0 && route.path.charAt(0) !== '/') {
          route.path = parentPath;
        }
        let name = this._resolveRouteName(route);
        if ((this.props.displayMissing || name) && !('excludes' in this.props && this.props.excludes.some((item) => item === name))) {
          return route;
        }
        return null;
      })
      .filter((route) => (Boolean(route)));

    // iterate over the pruned list of routes and build the crumbs for each
    crumbs = routes
      .map((route) => {
        return this._processRoute(route, routes.length, crumbs.length, createElement);
      })
      .filter((crumb) => (Boolean(crumb)));

    if (ExecutionEnvironment.canUseDOM
      && window
      && window.document
      && 'setDocumentTitle' in this.props
      && this.props.setDocumentTitle
      && crumbs.length > 0) {
      window.document.title = crumbs[crumbs.length - 1].props.children[0].props.children
    }

    if (prepend || append) {
      crumbs = this._appendAndPrependElements([prepend, crumbs, append]);
    }

    if (!createElement) {
      return crumbs;
    }

    return React.createElement(
      this.props.wrapperElement,
      {'className': this.props.customClass || this.props.wrapperClass},
      crumbs
    );
  }

  render() {
    return this._buildRoutes(this.props.routes, this.props.createElement, this.props.prepend, this.props.append);
  }
}

/**
 * @property PropTypes
 * @description Property types supported by this component
 * @type {{separator: *, createElement: *, displayMissing: *, wrapperElement: *, wrapperClass: *, itemElement: *, itemClass: *, activeItemClass: *,  customClass: *,excludes: *, append: *, prepend: *, params: *, Link: *}}
 */
Breadcrumbs.propTypes = {
  'params': React.PropTypes.object,
  'prepend': React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.bool
  ]),
  'append': React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.bool
  ]),
  'separator': React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  'createElement': React.PropTypes.bool,
  'Link': React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  'displayMissing': React.PropTypes.bool,
  'prettify': React.PropTypes.bool,
  'displayMissingText': React.PropTypes.string,
  'wrapperElement': React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  'wrapperClass': React.PropTypes.string,
  'itemElement': React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  'itemClass': React.PropTypes.string,
  'customClass': React.PropTypes.string,
  'activeItemClass': React.PropTypes.string,
  'excludes': React.PropTypes.arrayOf(React.PropTypes.string),
  'hideNoPath': React.PropTypes.bool,
  'routes': React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  'setDocumentTitle': React.PropTypes.bool
};

/**
 * @property defaultProps
 * @description sets the default values for propTypes if they are not provided
 * @type {{separator: string, displayMissing: boolean, wrapperElement: string, itemElement: string, wrapperClass: string, customClass: string, prepend: false, append: false}}
 */
Breadcrumbs.defaultProps = {
  'prepend': false,
  'append': false,
  'separator': ' > ',
  'createElement': true,
  'displayMissing': true,
  'displayMissingText': 'Missing name prop from Route',
  'wrapperElement': 'div',
  'wrapperClass': 'breadcrumbs',
  'itemElement': 'span',
  'itemClass': '',
  'activeItemClass': '',
  'excludes': [''],
  'prettify': false,
  'hideNoPath': true,
  'setDocumentTitle': false
};

module.exports = Breadcrumbs;
