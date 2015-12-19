/**
 * @class Breadcrumbs
 * @description New breadcrumbs class based on ES6 structure.
 * @exports Breadcrumbs
 * @version 1.1.11
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
    //if (name && this.props.excludes.some(item => item === name)) return null;

    if (!name && this.props.displayMissing) {
      name = this.props.displayMissingText;
    }

    return name;
  }

  _resolveRouteName(route){
    let name = this._getDisplayName(route);
    if(!name && route.breadcrumbName) name=route.breadcrumbName;
    if(!name && route.name) name=route.name;
    return name;
  }

  _processRoute(route,routesLength,crumbsLength,isRoot,createElement) {
    //if there is no route path defined and we are set to hide these then do so
    if(!route.path && this.props.hideNoPath) return null;

    let separator = "";
    let paramName="";
    let pathValue="";
    let name = this._resolveRouteName(route);

    let makeLink=isRoot;

    // don't make link if route doesn't have a child route
    if(makeLink){
      makeLink = route.childRoutes ? true : false;
      makeLink = routesLength !== (crumbsLength+1);
    }

    // set up separator
    separator = routesLength !== (crumbsLength+1) ? this.props.separator : "";

    // don't make link if route has a disabled breadcrumblink prop
    if(route.hasOwnProperty("breadcrumblink")){
      makeLink = route.breadcrumblink;
    };

    // find param name (if provided)
    if(this.props.params){
      paramName = Object.keys(this.props.params).map((param) => {
        pathValue=param;
        return this.props.params[param];
      })
    }

    // Replace route param with real param (if provided)
    let currentKey = route.path.split("/")[route.path.split("/").length-1];
    let keyValue;
    route.path.split("/").map((link)=>{
      if(link.substring(0,1)==":"){
        if(this.props.params){
          keyValue = Object.keys(this.props.params).map((param) => {
            return this.props.params[param];
          });
          let pathWithParam = route.path.split("/").map((link)=>{
            if(link.substring(0,1)==":"){
              return keyValue.shift();
            } else {
              return link;
            }
          })
          route.path=pathWithParam.reduce((start,link)=>{return start+"/"+link;})
          if(currentKey.substring(0,1)==":") 
            name=pathWithParam.reduce((start,link)=>{return link;});
        }
      }
    })
    if (name) {
      if(makeLink){
        var link = !createElement ? name:
          React.createElement(Link, {
          to: route.path,
          params: route.params
        }, name);
      } else {
        link = name;
      }
      return !createElement ? link:
        React.createElement(this.props.itemElement, { key: Math.random()*100 }, link, separator);
    }

    return null;

  }

  _buildRoutes(routes, createElement) {
    let crumbs = [];
    let isRoot = routes[1] && routes[1].hasOwnProperty("path");
    let parentPath = '/';
    routes.map((_route, index) => {
      let route = JSON.parse(JSON.stringify(_route));
      if('props' in route && 'path' in route.props){
        route.path=route.props.path;
        route.children=route.props.children;
        route.name=route.props.name;
      }
      if (route.path) {
        if(route.path.charAt(0) === '/') {
          parentPath = route.path;
        } else {
          if (parentPath.charAt(parentPath.length-1) !== '/') {
            parentPath += '/';
          }
          parentPath += route.path;
        }
      }

      if (0 < index && route.path && route.path.charAt(0) !== '/') {
        route.path = parentPath;
      }

      let result = this._processRoute(route,routes.length,crumbs.length,isRoot,createElement);
      if (result) {
        crumbs.push(result);
      }
    });
    return !createElement ? crumbs:
      React.createElement(this.props.wrapperElement, {className: this.props.customClass}, crumbs);

  }

  render(createElement=true) {
    return this._buildRoutes(this.props.routes, createElement);
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
