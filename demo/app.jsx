import React from 'react';
import { render } from 'react-dom';
import Breadcrumbs from '../index.jsx';
import { IndexRoute, Router, Route, Link } from 'react-router'

var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];

const App = exports.App = React.createClass({
  render(){
    return (
      <div>
        <div>
          <Breadcrumbs routes={this.props.routes} />
          <hr/>
          <Link to="users">Users</Link>
          <hr/>
          Very long route: <Link to="/parent1">Parent</Link>{" "}
          <Link to="/parent1/child1">Child1</Link>{" "}
          <Link to="/parent1/child1/1">Item1</Link>{" "}
          <Link to="/parent1/child1/2/child2">Child2</Link>{" "}
          <Link to="/parent1/child1/2/child2/2">Item2</Link>{" "}
          <Link to="/parent1/child1/2/child2/2/child3">Child3</Link>{" "}
          
        </div>
      </div>
    )
  }
})

const NoMatch = exports.NoMatch = React.createClass({
  render(){
    return (
      <div>
        <div>
          <Breadcrumbs routes={this.props.routes} params={this.props.params} />
        </div>
      </div>
    )
  }
})

const UserDetails = exports.UserDetails = React.createClass({
  getInitialState(){
    return {
      user: {id:0,name:""}
    }
  },
  findUserById(id){
    return userlist.filter(function(item){
      return item.id==id
    })
  },
  setUserState(){
    this.setState({
      user: this.findUserById(this.props.params.userId)[0]
    })
  },
  componentWillUpdate(nextProps, nextState) {
    if(this.state.user.id != nextProps.params.userId)
      this.setUserState();
  },
  componentDidMount() {
    this.setUserState();
  },

  render(){
    return (
      <div>
        <div>
          <hr/>
          This is what we know:
          <br/>ID: {this.state.user.id}
          <br/>NAME: {this.state.user.name}
          </div>
        </div>
    )
  }
})


const Users = exports.Users = React.createClass({
  getInitialState(){
    return {
      users: userlist
    }
  },
  componentWillMount(nextProps){
    if("users" in this.props){
      this.setState({users:this.props.users});
    }
  },
  render() {
    console.log(this.props)
    return (
      <div>
	<div>
	  <Breadcrumbs routes={this.props.routes} />
	</div>
	<h1>User List</h1>
	<div className="master">
	  <ul>
	    {this.state.users.map(user => (
	      <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
	      ))}
	      </ul>
	    </div>
	    <div className="detail">
	      {this.props.children}
	      </div>
	    </div>
    )
  }
})

const User = exports.User = React.createClass({
  render() {
    return (
      <div>
	<hr/>
	You're one click away from learning everything we know 
	about user no {this.props.params.userId}.<br/> 
	Click{" "}<strong>
	  <Link to={`/users/${this.props.params.userId}/details`} >here</Link></strong> for more details.
	<br/>
	{this.props.children}

      </div>
    )
  }
})
