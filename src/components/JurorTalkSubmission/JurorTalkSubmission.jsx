import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Swal from 'sweetalert2';

import './JurorTalkSubmission.css';

class JurorTalkSubmission extends Component {
  formStatusChecker = (currentForm) => {
    console.log('currentForm:', currentForm);
    if (currentForm === false) {
      return <button 
      className="btn btn_asLink" onClick={this.buttonClicked}>
       Submitted Form</button>;
    } else {
      return <p>Form Submitted!</p>;
    }
  };

  buttonClicked = () => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I sent the form!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Confirmed',
          'Updating the database to reflect form submission.',
          'success'
        );
        this.submitForm();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'No changes were made', 'error');
      }
    });
  };

  submitForm = () => {
    let submissionId = this.props.id;
    console.log('Submission to update', submissionId, this.props);
    console.log('Submission to update', submissionId);

    this.props.dispatch({
      type: 'UPDATE_FORM_STATUS',
      payload: submissionId,
    });
  };

  likeSubmission = () => {
    let submissionId = this.props.id;
    let remainingLikes = this.props.remainingLikes;
    console.log('Like button clicked!', submissionId);
    if (remainingLikes <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your out of likes!',
        footer: '<a href>You have just loved too many things...</a>',
      });
    } else {
      this.props.dispatch({
        type: 'UPDATE_LIKES',
        payload: submissionId,
      });
      this.props.getLikeFunction();
    }
  };

  render() {
    console.log('this.props for JurorTalkSubmission', this.props);
    let submission = this.props;

    return (
      <div className="submissionContainer" id={this.props.key}>
        <div className="videoDiv">
        <video width="420" height="315" controls id="submissionVideo">
          <source src={submission.video} />
        </video>
        </div>
        <div className="submissionInfo">
        <p>{submission.name}</p>
        {this.formStatusChecker(submission.formStatus)}
        <p>{submission.email}</p>
        <p>{submission.instagram}</p>
        <p>{submission.linkedin}</p>
        <p>{submission.twitter}</p>
        <p>{submission.comment}</p>
        </div>
        
        <div className="jurorLikeDiv">
        <p>{submission.like} Jurors like this!</p>
        <button className="btn btn_asLink" 
        onClick={this.likeSubmission}>Like</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorTalkSubmission);
