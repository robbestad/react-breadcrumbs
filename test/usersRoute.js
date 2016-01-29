import React from 'react';
import { Route }from 'react-router';
import Breadcrumbs from '../index.jsx';
import test from 'tape';

var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];

var UserRoutes=[
  {
    "name": "Users",
    "path": "/users",
    "childRoutes": [
      {
        "name": "UserLocator",
        "path": ":userId",
        "childRoutes": [
          {
            "name": "UserDetails",
            "path": "details"
          }
        ]
      }
    ]
  },
  {
    "name": "UserLocator",
    "path": ":userId",
    "childRoutes": [
      {
        "name": "UserDetails",
        "path": "details"
      }
    ]
  }
];

test('Render breadcrumbs', (assert) => {
  var builder = new Breadcrumbs;
  builder.props={routes:UserRoutes};
  var res = builder.render(false);
  assert.equal(
    res.reduce((initialName,name)=>
               {return initialName+","+name}),
               'Users,UserLocator',
               'User Breadcrumbs generated'
  );
  assert.end();
});

test('Render breadcrumbs, removing one with excludes', (assert) => {
  var builder = new Breadcrumbs;
  builder.props={routes:UserRoutes,excludes:['UserLocator']};
  var res = builder.render(false);
  assert.equal(
    res.reduce((initialName,name)=>
               {return initialName+","+name}),
               'Users',
               'User Breadcrumbs generated'
  );
  assert.end();
});

