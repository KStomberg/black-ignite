import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import JurorTalkCategory from '../JurorTalkCategory/JurorTalkCategory'

import './JurorPage.css';

class JurorView extends Component {

  componentDidMount() {
    this.getTalk();
  }

  getTalk = () => {
    console.log('Fetching talks');

    this.props.dispatch({
      type: 'FETCH_ALL_TALKS'
    });
  }

  render() {
    console.log('this.props for jurorPage', this.props);
    return (
      <div>
        <div id="topicContainer">
          {this.props.store.talks.map((talk) => (
            <JurorTalkCategory key={talk.id} id={talk.id} topicId={talk.id} title={talk.title} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorView);
