/** @jsx React.DOM */
"use strict";

if ("undefined" == typeof React)
    var React = require('react');

if ("undefined" == typeof ReactRouter)
    var ReactRouter = require("react-router");

var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var Breadcrumbs = React.createClass({
    mixins: [ReactRouter.State],
    displayName: "Breadcrumbs",
    render: function () {
        var separator = " > ";
        if("undefined" != typeof this.props.separator){
          separator=this.props.separator;
        }
        var breadcrumbs = [];
        var _this = this;
        var routes = this.getRoutes();
        routes.forEach(function (route, i, arr) {
            var name, link, missingParams = false;
            if ("undefined" == typeof route.name) {
                name = "Missing name parameter in router";
                missingParams = true;
                link = name;
            } else {
                missingParams = false;
                name = route.handler.displayName;
                link = name;
            }
            if (missingParams === true) {
                breadcrumbs.push(
                    React.createElement("span", {key: "missing" + i}, 
                        name, " ", separator
                    )
                );
            }
            if (missingParams === false) {
                if (i != arr.length - 1) {
                    link = React.createElement(Link, {to: route.name}, name);
                } else {
                    separator = "";
                }

                breadcrumbs.push(
                    React.createElement("span", {key: route.name + '' + breadcrumbs.length}, 
          link, " ", separator
                    )
                );
            }
        });
        return React.createElement("div", {className: "breadcrumbs"}, breadcrumbs);
    }
});

if ("undefined" !== typeof module)
    module.exports = Breadcrumbs;