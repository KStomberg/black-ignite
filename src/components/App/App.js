
import React, {useEffect} from 'react';
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Homepage from '../Homepage/Homepage';
import EditCategory from '../EditCategory/EditCategory';
import ManageJuror from '../ManageJuror/ManageJuror';
import LoginPage from '../LoginPage/LoginPage';
import RegisterForm from '../RegisterForm/RegisterForm';
import Ranking from '../Ranking/Ranking'
import JurorPage from '../JurorPage/JurorPage'
import SignUpFormConfirmation from '../SignUpForm/SignUpFormConfirmation';
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
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/user" />

          {/* User view */}
          <Route
            exact
            path="/user"
            component={Homepage}
          />
         
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
            path="/user/confirmation"
            component={SignUpFormConfirmation}
          />

          {/* If none of the other routes match, show 404 */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;