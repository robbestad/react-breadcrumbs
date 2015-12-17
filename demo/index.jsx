import React from 'react';
import { render } from 'react-dom';
import Breadcrumbs from '../index.jsx';
import { IndexRoute, Router, Route, Link } from 'react-router'

var userlist = [
  {id:"1", name:"John"},
  {id:"2", name:"Rambo"},
];

const App = React.createClass({
  render(){
    return (
      <div>
        <div>
          <Breadcrumbs routes={this.props.routes} />
          <hr/>
          <Link to="users">Users</Link>
        </div>
      </div>
    )
  }
})

const NoMatch = React.createClass({
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

const Users = React.createClass({
  getInitialState(){
    return {
      users: userlist
    }
  },
  render() {
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

const User = React.createClass({
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

  render() {
    return (
      <div>
        <hr/>
        This is what we know:
        <br/>{this.state.user.id}
        <br/>{this.state.user.name}:
        <br/>
        </div>
    )
  }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router>
    <Route path="/" name="App Root" component={App} />    
    <Route name="Users" path="/users" component={Users}>
      <Route name="User" path=":userId" component={User}/>
    </Route>
    <Route name="404: No Match for route" path="*" component={NoMatch}/>
  </Router>
), document.body)
