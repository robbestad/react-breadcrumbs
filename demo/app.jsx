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
    console.log(this.props.params)
    return (
      <div className="animated fadeIn">
        <div>
          <Breadcrumbs routes={this.props.routes}
                       params={this.props.params}
                       setDocumentTitle={true}/>
          <div className="content">
            <h3>Navigation</h3>
            Users route: <Link to="users">Users</Link>
            <hr/>
            Very long route: <Link to="/parent">Parent</Link>{" "}
            <Link to="/parent/child1">Child1</Link>{" "}
            <Link to="/parent/child1/item1">Item1</Link>{" "}
            <Link to="/parent/child1/item1/child2">Child2</Link>{" "}
            <Link to="/parent/child1/item1/child2/item2">Item2</Link>{" "}
            <Link to="/parent/child1/item1/child2/item2/child3">Child3</Link>{" "}
            <h3>Content</h3>
            {this.props.children}
            </div>
          </div>
          <div className="footer ">
            <a href="https://github.com/svenanders/react-breadcrumbs">To the github repo</a> (or <a href="http://www.robbestad.com/">to the blog</a>)
          </div>

        </div>
    )
  }
})

const Info = exports.Info = React.createClass({
  render(){
    return (
      <div>
        <div>
          The breadcrumbs will use the route names for non-dynamic
          routes or the parameter value for :item1 and :item2.
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
          <Breadcrumbs routes={this.props.routes} />
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
    return (
      <div>
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

