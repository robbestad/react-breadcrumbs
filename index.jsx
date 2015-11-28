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
import React from 'react'
import {Router, Route, Link} from 'react-router'

class Breadcrumbs extends React.Component {

  constructor() {
    super();
    this.displayName = "Breadcrumbs";
  }

  _getDisplayName(route) {
    let name = null;

    if(route.indexRoute) {
      name = route.indexRoute.displayName || null;
    } else {
      name = route.displayName || null;
    }

    //check to see if a custom name has been applied to the route
    if (!name && !!route.name) {
      name = route.name;
    }

    //if the name exists and it's in the excludes list exclude this route
    if (name && this.props.excludes.some(item => item === name)) return null;

    if (!name && this.props.displayMissing) {
      name = this.props.displayMissingText;
    }

    return name;
  }

  _processRoute(route,routesLength,crumbsLength,isRoot) {
    //if there is no route path defined and we are set to hide these then do so
    if(!route.path && this.props.hideNoPath) return null;

    let name = this._getDisplayName(route);
    let separator = "";
    let paramName;
    if(this.props.params){
      paramName = Object.keys(this.props.params).map((param) => {
        return this.props.params[param];
      })
    }
    if(!route.childRoutes && paramName) name=paramName.toString();
    let makeLink=isRoot;

    // don't make link if route doesn't have a child route
    if(makeLink){
      makeLink = route.childRoutes ? true : false;
      makeLink = routesLength !== (crumbsLength+1);
      separator = routesLength !== (crumbsLength+1) ? this.props.separator : "";
    }

    // don't make link if route has a disabled breadcrumblink prop
    if(route.hasOwnProperty("breadcrumblink")){
      makeLink = route.breadcrumblink;
    };

    if (name) {
      if(makeLink){
        var link = React.createElement(Link, {
          to: route.path,
          params: route.params
        }, name);
      } else {
        link = name;
      }
      return React.createElement(this.props.itemElement, { key: Math.random()*100 }, link, separator);
    }

    return null;

  }

  _buildRoutes(routes) {
    let crumbs = [];
    let isRoot = routes[1].hasOwnProperty("path");
    routes.map(route => {
      let result = this._processRoute(route,routes.length,crumbs.length,isRoot);
      if (result) {
        crumbs.push(result);
      }

    });

    return React.createElement(this.props.wrapperElement, {className: this.props.customClass}, crumbs);

  }

  render() {
    return this._buildRoutes(this.props.routes);
  }
}

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

export default Breadcrumbs;
