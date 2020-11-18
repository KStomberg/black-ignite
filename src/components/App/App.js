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

import React, {useEffect} from 'react';
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
import LogOutButton from '../LogOutButton/LogOutButton'
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []);
        
   
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
            <ProtectedRoute
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

            <ProtectedRoute
              exact
              path="/ranking"
              component={Ranking}
            />

          <ProtectedRoute
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
            path="/logout"
            component={LogOutButton}
            /> */}

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