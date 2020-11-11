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
deleteJuror = (user) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'this will permanently delete this juror',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Juror Deleted',
        'success'
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
}
  render() {
    return (
      <div >
        <ButtonAppBar />
        <h2>{this.state.heading}</h2>
        <RegisterForm />
        <div className="manageJurorDiv">
          <table className="manageJurorTable">
            <thead>
            <tr>
              <th>Username</th>
              <th>Delete Juror</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.users.map((user, i )=>
               <tr key={i}><td key={user.id}>{user.username}</td>
               <td><button  onClick={()=> this.deleteJuror(user)}>Delete</button></td></tr>)}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ManageJuror);