import test from 'tape';
import Breadcrumbs from '../index.jsx';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { IndexRoute, Route } from 'react-router';
import { render } from 'react-dom';

//var jsdom = require("jsdom");
//var context = jsdom.jsdom('<!doctype html><html><body></body></html>');
const renderer = ReactTestUtils.createRenderer();
//renderer.render(<Breadcrumbs routes={[routes]} />, context);
renderer.render(<Breadcrumbs routes={[routes]} />);
const component = ShallowTestUtils.getMountedInstance(renderer);


let DataSourceHandler = React.createClass({ displayName:"DataSourceHandler",render(){<div><Breacrumbs routes={this.props.routes} /></div>} });
let DataSourceViewHandler = React.createClass({ displayName:"DataSourceViewHandler",render(){<div><Breacrumbs routes={this.props.routes} /></div>} });
let DataSourceListHandler = React.createClass({ displayName:"DataSourceListHandler",render(){<div><Breacrumbs routes={this.props.routes} /></div>} });

var routes=(<Router>
  <Route key="datasources" path="datasources" component={DataSourceHandler}>
    <IndexRoute component={DataSourceListHandler} displayName="Data Sources"/>
    <Route path="view/:id" component={DataSourceViewHandler} displayName="View"/>
  </Route>
</Router>);
//console.log(<Breadcrumbs routes={[routes]} />);
console.log(component);
console.log(component._reactInternalInstance._renderedComponent._renderedOutput);
test('Find a search result', (assert) => {
  // assert.equals("test","test");
});
