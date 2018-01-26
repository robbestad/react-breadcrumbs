// Import External Dependencies
import React from 'react'
import {Switch, NavLink, Route} from 'react-router-dom'

// Import Components
import CrumbRoute from '../crumb-route.jsx'

// Define a small friend page
import Friend from "./friend"

// Create and export the component
export default ({location, match, ...props}) => (
    <div className="friends">
        <Switch>
            <Route path="/yourfriends" exact render={props => [
                <h2 key={"title"}>Your Friends</h2>,
                <p key="description">Here are your friends...</p>,
                <ul key={"links"}>
                    <li><NavLink to={`${match.url}/alice`}>Alice</NavLink></li>
                    <li><NavLink to={`${match.url}/frank`}>Frank</NavLink></li>
                    <li><NavLink to={`${match.url}/jane`}>Jane</NavLink></li>
                    <li><NavLink to={`${match.url}/matt`}>Matt</NavLink></li>
                </ul>
            ]}/>
            <CrumbRoute title="Alice" path={`${match.url}/alice`} render={props => <Friend name="Alice"/>}/>
            <CrumbRoute title="Frank" path={`${match.url}/frank`} render={props => <Friend name="Frank"/>}/>
            <CrumbRoute title="Jane" path={`${match.url}/jane`} render={props => <Friend name="Jane"/>}/>
            <CrumbRoute title="Matt" path={`${match.url}/matt`} render={props => <Friend name="Matt"/>}/>
        </Switch>
    </div>
)