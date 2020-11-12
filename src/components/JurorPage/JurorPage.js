import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import JurorItem from '../JurorItem/JurorItem';

import './JurorPage.css';

class JurorView extends Component {
  state = {
    sampleTopic: [
      { id: 1, topicTitle: 'Redesign Our City' },
      { id: 2, topicTitle: 'Allies in Action' },
    ],
    sampleTalk: [
      {
        id: 1,
        topicId: 1,
        name: 'Remi Douglass',
        email: 'rdoug@test.com',
        instagram: null,
        linkedin: 'linkedin.com/user/test',
        comment: 'this is where I put stuff and things',
        video: 'www.blackignite.com',
      },

      {
        id: 2,
        topicId: 2,
        name: 'Jim Hawkins',
        email: 'jimhawkins@aol.com',
        instagram: '@jhawkeye',
        linkedin: 'linkedin.com/user/test',
        comment: 'this is where I put stuff and things',
        video: 'www.blackignite.com',
      },
    ],
  };

  render() {
    return (
      <div>
        <div id="topicContainer">
          {this.state.sampleTopic.map((topic) => (
            <JurorItem key={topic.id} topicId={topic.id} title={topic.topicTitle} />
          ))}
        </div>
        <div id="talkContainer">
          {this.state.sampleTalk.map((submission) => (
            <JurorItem
              key={submission.id}
              submissionId={submission.id}
              topicId={submission.topicId}
              name={submission.name}
              email={submission.email}
              instagram={submission.instagram}
              linkedin={submission.linkedin}
              comment={submission.comment}
              video={submission.video}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorView);
