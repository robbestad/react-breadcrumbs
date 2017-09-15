// Import External Dependencies
import React from 'react'
import { Switch, NavLink } from 'react-router-dom'

// Import Components
import CrumbRoute from './crumb-route.jsx'

// Define a small event page
const Location = props => (
	<div className="location">
		<h3>{ props.name }</h3>
		<p>More information about { props.name }...</p>
	</div>
)

// Create and export the component
export default ({
	location,
	match,
	...props
}) => (
	<div className="friends">
		<h2>Locations</h2>
		<p>Some locations...</p>
		<ul>
			<li><NavLink to={ `${match.url}/mexico` }>Mexico</NavLink></li>
			<li><NavLink to={ `${match.url}/china` }>China</NavLink></li>
		</ul>

		<Switch>
			<CrumbRoute title="Mexico" path={ `${match.url}/mexico` } render={ props => <Location name="Mexico" /> } />
			<CrumbRoute title="China" path={ `${match.url}/china` } render={ props => <Location name="China" /> } />
		</Switch>
	</div>
)