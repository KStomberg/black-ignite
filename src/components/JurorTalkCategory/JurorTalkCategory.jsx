import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import JurorTalkSubmission from '../JurorTalkSubmission/JurorTalkSubmission';

import './JurorTalkCategory.css';

class JurorTalkCategory extends Component {
  state = {
    isToggled: false,
  };

  componentDidMount() {
    this.getSubmission();
  }

  getSubmission = () => {
    console.log('Fetching submissions');

    this.props.dispatch({
      type: 'FETCH_SUBMISSIONS',
    });
  };

  toggleDisplay = () => {
    console.log('toggleDisplay clicked!');
    const currentState = this.state.isToggled;
    this.setState({ isToggled: !currentState });
    console.log(this.state);
    let toggleStatus = document.getElementById(this.props.id);
    if (toggleStatus.style.display === 'none') {
      toggleStatus.style.display = 'block';
    } else {
      toggleStatus.style.display = 'none';
    }
  };

  render() {
    console.log('this.props for JurorTalkCategory', this.props);
    let submissionsForThisCategory = this.props.store.submissions.filter(
      (submission) => submission.category_id === this.props.topicId
    );
    let usedLikes = this.props.usedLikes;
    let getLikeFunction = this.props.getLikeFunction;
    return (
      <div >
        <div className="topicHeader">
          <button
            className="toggleButton"
            id={JSON.stringify(this.state.isToggled)}
            onClick={this.toggleDisplay}
          ></button>
          <h4 className="submissionTitle">{this.props.title}</h4>
        </div>
        <div className="submissionItem" id={this.props.id}>
          {submissionsForThisCategory.map((submission) => {
            return (
              <JurorTalkSubmission
                key={submission.id}
                id={submission.id}
                talkId={this.props.topicId}
                categoryId={submission.category_id}
                name={submission.full_name}
                email={submission.email}
                instagram={submission.instagram}
                linkedin={submission.linkedin}
                twitter={submission.twitter}
                comment={submission.comments}
                video={submission.video_url}
                formStatus={submission.form_status}
                like={submission.likes}
                usedLikes={usedLikes}
                getLikeFunction={getLikeFunction}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorTalkCategory);
