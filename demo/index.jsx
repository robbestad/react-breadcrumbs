import React from 'react';
import { render } from 'react-dom';

var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];
import { IndexRoute, Router, Route, Link } from 'react-router'
import Routes from './routes.jsx';

render(Routes, document.getElementById('app'));
