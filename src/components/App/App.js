// import React, { Component } from 'react';
// import {
//   HashRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from 'react-router-dom';

// import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
// import LandingPage from '../LandingPage/LandingPage';
// import LoginPage from '../LoginPage/LoginPage';
// import RegisterPage from '../RegisterPage/RegisterPage';

// import './App.css';

// class App extends Component {
//   componentDidMount() {
//     this.props.dispatch({ type: 'FETCH_USER' });
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <Nav />
//           <Switch>
//             {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//             <Redirect exact from="/" to="/home" />

//             {/* Visiting localhost:3000/about will show the about page. */}
//             <Route
//               // shows AboutPage at all times (logged in or not)
//               exact
//               path="/about"
//               component={AboutPage}
//             />

//             {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/user will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
//             Even though it seems like they are different pages, the user is always on localhost:3000/user */}
//             <ProtectedRoute
//               // logged in shows UserPage else shows LoginPage
//               exact
//               path="/user"
//               component={UserPage}
//             />

//             <ProtectedRoute
//               // logged in shows InfoPage else shows LoginPage
//               exact
//               path="/info"
//               component={InfoPage}
//             />

//             {/* When a value is supplied for the authRedirect prop the user will
//             be redirected to the path supplied when logged in, otherwise they will
//             be taken to the component and path supplied. */}
//             <ProtectedRoute
//               // with authRedirect:
//               // - if logged in, redirects to "/user"
//               // - else shows LoginPage at /login
//               exact
//               path="/login"
//               component={LoginPage}
//               authRedirect="/user"
//             />
//             <ProtectedRoute
//               // with authRedirect:
//               // - if logged in, redirects to "/user"
//               // - else shows RegisterPage at "/registration"
//               exact
//               path="/registration"
//               component={RegisterPage}
//               authRedirect="/user"
//             />
//             <ProtectedRoute
//               // with authRedirect:
//               // - if logged in, redirects to "/user"
//               // - else shows LandingPage at "/home"
//               exact
//               path="/home"
//               component={LandingPage}
//               authRedirect="/user"
//             />

//             {/* If none of the other routes matched, we will show a 404. */}
//             <Route render={() => <h1>404</h1>} />
//           </Switch>
//           <Footer />
//         </div>
//       </Router>
//     );
//   }
// }

// export default connect()(App);


import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Homepage from '../Homepage/Homepage';
import EditCategory from '../EditCategory/EditCategory';
import ManageJuror from '../ManageJuror/ManageJuror';
import LoginPage from '../LoginPage/LoginPage';
import RegisterForm from '../RegisterForm/RegisterForm';
// import { AppBar } from '@material-ui/core';
import ButtonAppBar from '../AppBar/AppBar';
import Ranking from '../Ranking/Ranking'
import JurorPage from '../JurorPage/JurorPage'
import SignUpFormConformation from '../SignUpForm/SignUpFormConformation';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* User view */}
          <Route
            exact
            path="/"
            component={Homepage}
          />
          {/* <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            /> */}
            <ProtectedRoute
              // logged in shows EditCategory else shows LoginPage
              exact
              path="/edittalk"
              component={EditCategory}
            />
            <Route
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/managejuror"
              component={ManageJuror}
            />
            <Route
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/register"
              component={RegisterForm}
            />
            <Route 
              exact
              path="/login"
              component={LoginPage}
            />

            <Route
              exact
              path="/ranking"
              component={Ranking}
            />

          <Route
            exact
            path="/juror"
            component={JurorPage}
          />

          <Route 
            exact
            path="/user/conformation"
            component={SignUpFormConformation}
          />

            {/* <ProtectedRoute 
              exact
              path="/submission"
              component={}
              /> */}

          {/* If none of the other routes match, show 404 */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;