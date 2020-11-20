import { object } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RegisterForm from '../RegisterForm/RegisterForm';
import Swal from 'sweetalert2'
import ButtonAppBar from '../AppBar/AppBar';
import './ManageJuror.css';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ManageJuror extends Component {
  state = {
    heading: 'Manage Juror',
    username: '',
    password: '',
    likes: 30
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USERS'
    })
  }
  // componentDidUpdate() {
  //   this.props.dispatch({
  //     type: 'FETCH_USERS'
  //   })
  // }
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        likes: this.state.likes,
      },
    });
    this.props.dispatch({
      type: 'FETCH_USERS',
    });
    this.componentDidMount();
  }; // end registerUser
deleteJuror = (user) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'this will permanently delete this juror',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, keep this Juror'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Juror Deleted',
        'success',
      )
  console.log(`this is our user`, user);
  let objectToSend = {
    id: user.id
  }
  console.log(objectToSend)

  this.props.dispatch({
    type: 'DELETE_JUROR',
    payload: objectToSend
  })

    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Juror not deleted'
      )
    }
  })
  this.componentDidMount();
}
  render() {
    return (
      <div >
        <ButtonAppBar />
        <h2>{this.state.heading}</h2>
        <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Add A Juror</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="votes">
          # of Votes:
            <input
              type="number"
              name="votes"
              placeholder="Please enter # of votes"
              value={this.state.likes}
              required
              onChange={this.handleInputChangeFor('likes')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
        <div className="manageJurorDiv">
          <table className="manageJurorTable">
            <thead className="manageJurorTH">
            <tr className="manageJurorTR">
              <th className="manageJurorTH">Username</th>
              <th>Delete Juror</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.users.map((user, i )=>
               <tr key={i} className="manageJurorTR">
                  <td key={user.id} className="manageJurorTD">{user.username}</td>
                  <td className="manageJurorTD"><button  onClick={()=> this.deleteJuror(user)} className="btn" id="deleteBtn">Delete</button></td>
               </tr>)}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ManageJuror);