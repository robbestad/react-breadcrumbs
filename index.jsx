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
import React from 'react'
import {Router, Route, Link} from 'react-router'
import ExecutionEnvironment from 'exenv';

class Breadcrumbs extends React.Component {

  constructor() {
    super();
    this.displayName = "Breadcrumbs";
  }

  _getDisplayName(route) {
    let name = null;

    if (typeof route.getDisplayName === 'function') {
      name = route.getDisplayName();
    }

    if(route.indexRoute) {
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
    if (name &&
        'excludes' in this.props &&
        this.props.excludes.some(item => item === name)) return null;

    let makeLink=isRoot;

    // don't make link if route doesn't have a child route
    if(makeLink){
      makeLink = route.childRoutes ? true : false;
      makeLink = routesLength !== (crumbsLength+1);
    }

    // set up separator
    separator = routesLength !== (crumbsLength+1) ? this.props.separator : "";
    if(!makeLink) separator = "";

    // don't make link if route has a disabled breadcrumblink prop
    if(route.hasOwnProperty("breadcrumblink")){
      makeLink = route.breadcrumblink;
    }

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
          if(!route.staticName && currentKey.substring(0,1)==":")
            name=pathWithParam.reduce((start,link)=>{return link;});

          if (typeof route.prettifyParam === 'function'){
            name = route.prettifyParam(name);
          }
        }
      }
    })
    if (name) {

      if(this.props.prettify){
        // Note: this could be replaced with a more complex prettifier
        console.log('prettifying')
        name = name.replace(/-/g, ' ');
        name = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }

      var itemClass = this.props.itemClass;
      if(makeLink){
        var link = !createElement ? name:
          React.createElement(Link, {
          to: route.path,
          params: route.params
        }, name);
      } else {
        link = name;
        itemClass += ' ' + this.props.activeItemClass;
      }
      return !createElement ? link:
        React.createElement(this.props.itemElement, { className: itemClass, key: Math.random()*100 }, link, separator);
    }

    return null;

  }

  _buildRoutes(routes, createElement) {
    let crumbs = [];
    let isRoot = routes[1] && routes[1].hasOwnProperty("path");
    let parentPath = '/';

    let routesWithExclude = [];
    routes.forEach((_route, index) => {
      let route = Object.assign({}, _route);
      if (typeof _route.prettifyParam === 'function'){
        route.prettifyParam = _route.prettifyParam;
      }
      if('props' in route && 'path' in route.props){
        route.path=route.props.path;
        route.children=route.props.children;
        route.name=route.props.name;
        route.prettifyParam=route.props.prettifyParam;
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
      let name = this._resolveRouteName(route);
      if(route.path && !('excludes' in this.props && this.props.excludes.some(item => item === name)))
        routesWithExclude.push(route);
    });
    routes=routesWithExclude;
    routes.map((route, index) => {
      if(!route) return null;
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
    if (ExecutionEnvironment.canUseDOM){
      if(window && window.document){
        if('setDocumentTitle' in this.props && this.props.setDocumentTitle) {
        window.document.title = crumbs[crumbs.length-1].props.children[0];
        }
      }
    }

    return !createElement ? crumbs:
      React.createElement(this.props.wrapperElement, {className: this.props.customClass || this.props.wrapperClass}, crumbs);

  }

  render(createElement=true) {
    return this._buildRoutes(this.props.routes, createElement);
  }
}

/**
 * @property PropTypes
 * @description Property types supported by this component
 * @type {{separator: *, displayMissing: *, displayName: *, breadcrumbName: *, wrapperElement: *, wrapperClass: *, itemElement: *, itemClass: *, activeItemClass: *,  customClass: *,excludes: *}}
 */
Breadcrumbs.propTypes = {
  separator: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  displayMissing: React.PropTypes.bool,
  prettify: React.PropTypes.bool,
  displayMissingText: React.PropTypes.string,
  displayName: React.PropTypes.string,
  breadcrumbName: React.PropTypes.string,
  wrapperElement: React.PropTypes.string,
  wrapperClass: React.PropTypes.string,
  itemElement: React.PropTypes.string,
  itemClass: React.PropTypes.string,
  customClass: React.PropTypes.string,
  activeItemClass: React.PropTypes.string,
  excludes: React.PropTypes.arrayOf(React.PropTypes.string),
  hideNoPath: React.PropTypes.bool,
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  setDocumentTitle: React.PropTypes.bool
};

/**
 * @property defaultProps
 * @description sets the default values for propTypes if they are not provided
 * @type {{separator: string, displayMissing: boolean, wrapperElement: string, itemElement: string, wrapperClass: string, customClass: string}}
 */
Breadcrumbs.defaultProps = {
  separator: " > ",
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
