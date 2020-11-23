import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AppBar from '../AppBar/AppBar';
import JurorTalkCategory from '../JurorTalkCategory/JurorTalkCategory';
import './JurorPage.css';

class JurorView extends Component {
  componentDidMount() {
    this.getTalk();
    this.getLike();
  }

  getTalk = () => {
    this.props.dispatch({
      type: 'FETCH_ALL_TALKS',
    });
  };

  getLike = () => {
    this.props.dispatch({
      type: 'FETCH_MAX_LIKES',
    });
  };

  render() {
    let remainingLikes = this.props.store.likes.likes;
    return (
      <div>
        <div id="topicContainer">
          <div className="likesDiv">{remainingLikes >= 0 ?  <h1 className="likesHeader">You have {remainingLikes} likes remaining</h1>:
           <h1 className="likesHeader">You have 0 likes remaining</h1>}
           
          </div>
          <div className="submissionHeader">
          <h1 className="submissionH1">Submissions</h1>
          </div>
          <AppBar />
          {this.props.store.talks.map((talk) => (
            <JurorTalkCategory
              key={talk.id}
              id={talk.id}
              topicId={talk.id}
              title={talk.title}
              remainingLikes={remainingLikes}
              getLikeFunction={this.getLike}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorView);
