// Import External Dependencies
import React from 'react'
import {Switch, NavLink, Route} from 'react-router-dom'

// Import Components
import {Breadcrumbs} from '../../src/index.js';
import CrumbRoute from './crumb-route.jsx'
import Friends from './friends.jsx'
import YourFriends from "./friends/index"

import Events from './events.jsx'
import Locations from './locations.jsx'

// Load Styling
import '../../src/style.css'
import './app.css'

// Create and export the component
export default class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Breadcrumbs className="demo__crumbs"/>
        <main className="demo__main">

          <div className="demo__content">
            <Switch>
              <Route path="/" exact render={props => [<h1 key={"title"}>Breadcrumbs Demo</h1>,
                <p key={"description"}> Use the links below to jump around the site and watch the breadcrumbs update...</p>,
                <ul key={"links"} className="demo__links">
                  <li><NavLink to="/yourfriends">Friends (non-nested)</NavLink></li>
                    <li><NavLink to="/friends">Friends</NavLink></li>
                  <li><NavLink to="/events">Events</NavLink></li>
                  <li><NavLink to="/locations">Locations</NavLink></li>
                </ul>
              ]}/>
              <CrumbRoute title="Friends" path="/friends" component={Friends}/>
              <CrumbRoute title="Your friends" path="/yourfriends" component={YourFriends}/>
              <CrumbRoute title="Events" path="/events" component={Events}/>
              <CrumbRoute title="Locations" path="/locations" component={Locations}/>
              <CrumbRoute title="404 Not Found" render={props => <span>Page not found...</span>}/>
            </Switch>
          </div>
        </main>
      </div>
    )
  }
}
