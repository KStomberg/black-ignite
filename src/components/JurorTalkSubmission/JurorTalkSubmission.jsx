import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './JurorTalkSubmission.css';

class JurorTalkSubmission extends Component {
  render() {
    console.log('this.props for JurorTalkSubmission', this.props);
    let submission = this.props;

    return (
      <div className="submissionContainer" id={this.props.key}>
        <p>{submission.name}</p>
        <p>{submission.email}</p>
        <p>{submission.instagram}</p>
        <p>{submission.linkedin}</p>
        <p>{submission.twitter}</p>
        <p>{submission.comment}</p>
        <iframe width="420" height="315" src={submission.video}></iframe>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorTalkSubmission);
