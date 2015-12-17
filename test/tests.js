var TestUtils = require('react-addons-test-utils');
import React from 'react';
import { Route }from 'react-router';
import { renderToStaticMarkup } from 'react-dom/server';
import { User,Users,UserDetails,NoMatch } from '../demo/app.jsx';
import Routes from '../demo/routes.jsx';
import test from 'tape';

const App = React.createClass({render(){<div/>}});
var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];

test('Find a search result', (assert) => {
  let staticMarkup = renderToStaticMarkup(<Users users={userlist} routes={Routes.props.children} params={{userId:"1"}} />);
  assert.equals(staticMarkup, '<div><div><div class="breadcrumbs"><span>App Root &gt; </span><span>Users &gt; </span><span>404: No Match for route</span></div></div><h1>User List</h1><div class="master"><ul><li><a class="">John</a></li><li><a class="">Rambo</a></li></ul></div><div class="detail"></div></div>','Could render USERS breadcrumbs');
assert.end();
});
