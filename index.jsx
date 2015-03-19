"use strict";

var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var Breadcrumbs = React.createClass({
    propTypes: {
        separator: React.PropTypes.string,
        displayMissing: React.PropTypes.string,
        displayName: React.PropTypes.string,
        breadcrumbName: React.PropTypes.string
    },
    mixins: [ReactRouter.State],
    displayName: "Breadcrumbs",
    render: function () {
        var separator = " > ";
        if("undefined" != typeof this.props.separator){
            separator=this.props.separator;
        }
        var displayMissing = true;
        if("undefined" != typeof this.props.displayMissing){
            displayMissing = this.props.displayMissing;
        }
        var breadcrumbs = [];
        var _this = this;
        var routes = this.getRoutes();
        // Convert Object to array (can sometimes happen)
        if('object' == typeof routes){
            var arr = Object.keys(routes).map(function (key) {return routes[key]});
            routes=arr;
        }

        routes.forEach(function (route, i, arr) {
            var name, link, missingParams = false;

            name = route.handler.displayName;
            if (i == arr.length - 1) {
                if('undefined' !== typeof _this.props.displayName){
                    name=_this.props.displayName;
                }
            }
            if("undefined" == typeof name){
                if ("undefined" == typeof route.name) {
                    name = "Missing name parameter in router";
                    missingParams = true;
                } else {
                    name = route.name
                }
            } else if("function" == typeof name){
                name = name(_this);
            }
            link = name;


            if (missingParams === true && displayMissing) {
                breadcrumbs.push(
                    <span key={"missing" + i}>
                        {name} {separator}
                    </span>
                );
            }
            if (missingParams === false) {
                if (i != arr.length - 1) {
                    link = <Link to={'undefined' === typeof route.name?'/':route.name}>{name}</Link>;
                } else {
                    separator = "";

                    if("undefined" != typeof _this.props.breadcrumbName){
                        route.name=_this.props.breadcrumbName;
                        link=_this.props.breadcrumbName;
                    }
                }

                breadcrumbs.push(
                    <span key={route.name + '' + breadcrumbs.length}>
          {link} {separator}
                    </span>
                );
            }
        });
        return <div className="breadcrumbs">{breadcrumbs}</div>;
    }
});

if ("undefined" !== typeof module)
    module.exports = Breadcrumbs;
