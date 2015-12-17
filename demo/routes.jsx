import React from 'react'
import { Router, Route, NoMatch, IndexRoute } from 'react-router'
import { App, Users, User, UserDetails } from './app'

export default (
  <Router>
    <Route path="/" name="App Root" component={App} />    
    <Route name="Users" path="/users" component={Users}>
      <Route name="UserLocator" path=":userId" component={User}>
        <Route name="UserDetails" path="details" component={UserDetails} />
      </Route>
    </Route>
    <Route name="404: No Match for route" path="*" component={NoMatch}/>
  </Router>
);

