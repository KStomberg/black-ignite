import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
    this.setState({ isToggled: !this.state.isToggled });
    console.log(this.state.isToggled);
  };

  render() {
    console.log('this.props for JurorTalkCategory', this.props);
    let submissionsForThisCategory = this.props.store.submissions.filter(
      (submission) => submission.category_id === this.props.topicId
    );
    let remainingLikes = this.props.remainingLikes;
    let getLikeFunction = this.props.getLikeFunction;
    return (
      
      <>
        {this.state.isToggled ? 
          <div>
            <div className="topicHeader">
              <ArrowDropDownIcon 
                className="arrow"
                onClick={this.toggleDisplay}/> 
              <h1 className="submissionTitle">{this.props.title} {JSON.stringify(submissionsForThisCategory.length)}</h1>
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
                    remainingLikes={remainingLikes}
                    getLikeFunction={getLikeFunction}
                  />
                );
              })}
            </div>
          </div>
            : 
          <div className="topicHeader"> 
            <ArrowRightIcon 
              className="arrow"
              onClick={this.toggleDisplay}/>  
            <h1 className="submissionTitle">{this.props.title}</h1>
          </div>
        }
      </>
    );
  }
}

export default connect(mapStoreToProps)(JurorTalkCategory);
