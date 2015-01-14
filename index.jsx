/** @jsx React.DOM */
"use strict";

if ("undefined" == typeof React)
    var React = require('react');

var ReactRouter = require("react-router");
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

module.exports = React.createClass({
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
                    <span key={"missing" + i}>
                        {name} {separator}
                    </span>
                );
            }
            if (missingParams === false) {
                if (i != arr.length - 1) {
                    link = <Link to={route.name}>{name}</Link>;
                } else {
                    separator = "";
                }

                breadcrumbs.push(
                    <span key={route.name + '' + breadcrumbs.length}>
          {link} {separator}
                    </span>
                );
            }
        });
        return <ul className="breadcrumbs">{breadcrumbs}</ul>;
    }
});