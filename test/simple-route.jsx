import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { render } from 'react-dom';
import Breadcrumbs from '../index.jsx';

let DataSourceHandler = React.createClass({ displayName:"DataSourceHandler",render(){<div/>} });
let DataSourceViewHandler = React.createClass({ displayName:"DataSourceViewHandler",render(){<div/>} });
let DataSourceListHandler = React.createClass({ displayName:"DataSourceListHandler",render(){<div/>} });

return render((<Router>
  <Route key="datasources" path="datasources" component={DataSourceHandler}>
    <IndexRoute component={DataSourceListHandler} displayName="Data Sources"/>
    <Route path="view/:id" component={DataSourceViewHandler} displayName="View"/>
  </Route>
</Router>), context);
