import React, {useEffect} from 'react';
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Homepage from '../Homepage/Homepage';
import EditCategory from '../EditCategory/EditCategory';
import ManageJuror from '../ManageJuror/ManageJuror';
import LoginPage from '../LoginPage/LoginPage';
import RegisterForm from '../RegisterForm/RegisterForm';
import Ranking from '../Ranking/Ranking';
import JurorPage from '../JurorPage/JurorPage';
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
          {/* Visiting localhost:3000 will redirect to localhost:3000/user */}
          <Redirect exact from="/" to="/user" />

          {/* User view */}
          <Route
            exact
            path="/user"
            component={Homepage}
          />
         
          {/* Logged in shows EditCategory, else shows LoginPage */}
          <ProtectedRoute
            exact
            path="/edittalk"
            component={EditCategory}
          />

          {/* Logged in shows InfoPage, else shows LoginPage */}
          <ProtectedRoute
            exact
            path="/managejuror"
            component={ManageJuror}
          />

          {/* Logged in shows InfoPage, else shows LoginPage */}
          <Route
            exact
            path="/register"
            component={RegisterForm}
          />

          {/* Login page */}
          <Route 
            exact
            path="/login"
            component={LoginPage}
          />

          {/* Ranking page */}
          <ProtectedRoute
            exact
            path="/ranking"
            component={Ranking}
          />

          {/* Juror page */}
          <ProtectedRoute
            exact
            path="/juror"
            component={JurorPage}
          />

          {/* SignUp Confirmation page */}
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