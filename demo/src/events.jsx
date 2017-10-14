// Import External Dependencies
import React from 'react'
import { Switch, NavLink } from 'react-router-dom'

// Import Components
import CrumbRoute from './crumb-route.jsx'

// Define a small event page
const Event = props => (
	<div className="event">
		<h3>{ props.name }</h3>
		<p>More information about the { props.name }...</p>
	</div>
)

// Create and export the component
export default ({
	location,
	match,
	...props
}) => (
	<div className="friends">
		<h2>Upcoming Events</h2>
		<p>These events are coming up soon...</p>
		<ul>
			<li><NavLink to={ `${match.url}/dance` }>Dance</NavLink></li>
			<li><NavLink to={ `${match.url}/cookout` }>Cookout</NavLink></li>
		</ul>

		<Switch>
			<CrumbRoute title="Dance" path={ `${match.url}/dance` } render={ props => <Event name="Dance" /> } />
			<CrumbRoute title="Cookout" path={ `${match.url}/cookout` } render={ props => <Event name="Cookout" /> } />
		</Switch>
	</div>
)