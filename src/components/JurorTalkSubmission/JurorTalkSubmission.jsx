import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Swal from 'sweetalert2';
import {Grid} from '@material-ui/core';
import './JurorTalkSubmission.css';

class JurorTalkSubmission extends Component {
  formStatusChecker = (currentForm) => {
    console.log('currentForm:', currentForm);
    if (this.props.store.user.authLevel === 'ADMIN') {
      if (currentForm === false) {
        return <button className="submitBtn" onClick={this.buttonClicked}>Submitted Form</button>;
      } else {
        return <p className="submissionPara">Form Submitted!</p>;
      }
    } else {
      return;
    }
  };

  // See swal at: https://sweetalert2.github.io/#usage
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
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'No changes were made', 'error');
      }
    });
  };

  submitForm = () => {
    let submissionId = this.props.id;

    this.props.dispatch({
      type: 'UPDATE_FORM_STATUS',
      payload: submissionId,
    });
  };

  // See swal at: https://sweetalert2.github.io/#usage
  likeSubmission = () => {
    let submissionId = this.props.id;
    let remainingLikes = this.props.remainingLikes;
    if (remainingLikes === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You\'re out of likes!',
        footer: 'You have just loved too many things...',
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
    let submission = this.props;
    return (
      <div className="submissionContainer" id={this.props.key}>
        <div className="videoDiv">
        <video width="420" height="315" controls id="submissionVideo">
          <source src={submission.video} />
        </video>
        </div>
        <div className="submissionInfo">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={5}
          >
            <Grid item>
              <Grid 
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <p className="subInfoP">Name: {submission.name}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP">Email: {submission.email}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP">Comments: {submission.comment}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP">{submission.like} Jurors voted for this!</p>
                </Grid>
                <Grid item>
                  {this.formStatusChecker(submission.formStatus)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid 
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <p className="subInfoP">Instagram: {submission.instagram}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP">LinkedIn:{submission.linkedin}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP">Twitter: {submission.twitter}</p>
                </Grid>
                <Grid item>
                  <p className="subInfoP invisible">text</p>
                </Grid>
                <Grid item>
                  <button className="submitBtn" onClick={this.likeSubmission}>Vote</button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorTalkSubmission);
