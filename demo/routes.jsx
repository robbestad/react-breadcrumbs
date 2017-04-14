import React, {Component} from 'react'
import {App, Info, Users, User, UserDetails} from './app.jsx';
import {BrowserRouter, HashRouter, Link, Route} from 'react-router-dom';
import Breadcrumbs from '../index.jsx';
console.log(Users)
// export default (
//   <BrowserRouter>
//     <Route exact path="/" name="Examples" component={App}>
//     </Route>
//   </BrowserRouter>
// )

export default class extends Component {
  render() {
    return (
      <HashRouter>

        <div className="content">
          <h3>Navigation</h3>
          <Breadcrumbs {...this.props}
                       setDocumentTitle={true}/>

          <h3>Links</h3>
          Users route: <Link to="users">Users</Link>
          <hr/>
          Very long route: <Link to="/parent">Parent</Link>{" "}
          <Link to="/parent/child1">Child1</Link>{" "}
          <Link to="/parent/child1/item1">Item1</Link>{" "}
          <Link to="/parent/child1/item1/child2">Child2</Link>{" "}
          <Link to="/parent/child1/item1/child2/item2">Item2</Link>{" "}
          <Link to="/parent/child1/item1/child2/item2/child3">Child3</Link>{" "}

          <App>
            <Route exact={true} path="/" component={App}/>
            <Route name="Users" path="/users" component={Users}>
              <Route name="UserLocator" path=":userId" component={User}
                     getDisplayName={param => Number(param.userId) === 1 ? "John" : "Rambo"}>
                <Route name="UserDetails" path="details" component={UserDetails}/>
              </Route>
            </Route>

          </App>

          <div>
            ---
          {this.props.children}
</div>
        </div>
      </HashRouter>

      // <BrowserRouter>
      //   <div className="App container-fluid">
      //     <div className="App-reddit-selector">
      //       <Link to="/">Front</Link> - <Link to="/r/all">All</Link>
      //     </div>
      //     <Route exact path="/" name="Examples  " component={App}/>
      //     <Route name="Users" path="users" component={Users}>
      //       <Route name="UserLocator" path=":userId" component={User}
      //              getDisplayName={param => Number(param.userId) === 1 ? "John" : "Rambo"}>
      //         <Route name="UserDetails" path="details" component={UserDetails}/>
      //       </Route>
      //     </Route>
      //
      //     {/*<Route path="/r/:name" component={SubredditPageContainer}/>*/}
      //   </div>
      // </BrowserRouter>
    )
  }
}

/*
 <Route exact path="/" name="Examples" component={App}>
 <Route name="Users" path="users" component={Users}>
 <Route name="UserLocator" path=":userId" component={User}
 getDisplayName={param => Number(param.userId) === 1 ? "John" : "Rambo"}>
 <Route name="UserDetails" path="details" component={UserDetails}/>
 </Route>
 </Route>
 </Route>

 */
// export default (
//   <Router history={hashHistory}>
//     <Route path="/" name="Examples" component={App}>
//       <Route name="Users" path="users" component={Users}>
//         <Route name="UserLocator" path=":userId" component={User}
//                getDisplayName={param => Number(param.userId) === 1 ? "John" : "Rambo"}>
//           <Route name="UserDetails" path="details" component={UserDetails}/>
//         </Route>
//       </Route>
//       <Route name='RouteName1' path='parent' component={Info}>
//         <Route name='RouteName2' path='child1' component={Info}>
//           <Route name='RouteName3' path=':item1' component={Info}>
//             <Route name='RouteName4' path='child2' component={Info}>
//               <Route name='RouteName5' path=':item2' component={Info}>
//                 <Route name='RouteName6' path='child3' component={Info}
//                        getDisplayName={() => "A fixed displayname from routes"}>
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//         </Route>
//       </Route>
//     </Route>
//     <Route name="404: No Match for route" path="*" component={NoMatch}/>
//   </Router>
// );
