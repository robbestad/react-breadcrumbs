// Import External Dependencies
import React from 'react'
import { Switch, NavLink } from 'react-router-dom'

// Import Components
import CrumbRoute from './crumb-route.jsx'

// Create and export the component
export default ({
	location,
	match,
	...props
}) => (
	<div className="friends">
		<h2>Your Friends</h2>
		<p>Here are your friends...</p>
		<ul>
			<li><NavLink to={ `${match.url}/alice` }>Alice</NavLink></li>
			<li><NavLink to={ `${match.url}/frank` }>Frank</NavLink></li>
			<li><NavLink to={ `${match.url}/jane` }>Jane</NavLink></li>
			<li><NavLink to={ `${match.url}/matt` }>Matt</NavLink></li>
		</ul>

		<Switch>
			<CrumbRoute title="Alice" path={ `${match.url}/alice` } render={ props => <span>About Alice...</span> } />
			<CrumbRoute title="Frank" path={ `${match.url}/frank` } render={ props => <span>About Frank...</span> } />
			<CrumbRoute title="Jane" path={ `${match.url}/jane` } render={ props => <span>About Jane...</span> } />
			<CrumbRoute title="Matt" path={ `${match.url}/matt` } render={ props => <span>About Matt...</span> } />
		</Switch>
	</div>
)