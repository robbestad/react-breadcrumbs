import React from 'react';
import { render } from 'react-dom';
import Breadcrumbs from '../index.jsx';
import { IndexRoute, Router, Route, Link } from 'react-router'
import {Routing,User,Users,UserDetails,NoMatch} from './app.jsx';

var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];

render((
  Routing
), document.body)
