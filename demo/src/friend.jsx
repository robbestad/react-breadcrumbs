// Import External Dependencies
import React from 'react'
import { Switch, NavLink } from 'react-router-dom'

// Define a small friend page
export default props => (
	<div className="friend">
		<h3>{ props.name }</h3>
		<p>More information about { props.name }...</p>
	</div>
)
