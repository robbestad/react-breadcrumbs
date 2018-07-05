// Import External Dependencies
import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';

// Import Components
import { Breadcrumbs } from '../../src/index.js';
import CrumbRoute from './crumb-route.jsx'
import Friends from './friends.jsx'
import Events from './events.jsx'
import Locations from './locations.jsx'

// Load Styling
import '../../src/style.css';
import './app.css';

// Create and export the component
export default class App extends React.Component {
  /**
   * Handle breadcrumb render
   * @param {[{}]} crumbs
   * @return {[{}]}
   */
  handleCrumbs = (crumbs) => {
    // Remove first crumb
    return crumbs.filter((c, i) => i !== 0)
  }
  render() {
    return (
      <div className="demo">
        <Breadcrumbs className="demo__crumbs" />
        <main className="demo__main">
          <h1>Breadcrumbs Demo</h1>
          <p>Use the links below to jump around the site and watch the breadcrumbs update...</p>
          <ul className="demo__links">
            <li><NavLink to="/friends">Friends</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            <li><NavLink to="/locations">Locations</NavLink></li>
          </ul>

          <div className="demo__content">
            <Switch>
              <Route path="/" exact render={ props => <span>Home content...</span> } />
              <CrumbRoute title="Friends" path="/friends" component={ Friends } />
              <CrumbRoute title="Events" path="/events" component={ Events } />
              <CrumbRoute title="Locations" path="/locations" component={ Locations } />
              <CrumbRoute title="404 Not Found" render={ props => <span>Page not found...</span> } />
            </Switch>
          </div>
        </main>
      </div>
    )
  }
}
