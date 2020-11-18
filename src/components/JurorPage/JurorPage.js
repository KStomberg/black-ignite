import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AppBar from '../AppBar/AppBar' 
import JurorTalkCategory from '../JurorTalkCategory/JurorTalkCategory'
import './JurorPage.css';

class JurorView extends Component {

  componentDidMount() {
    this.getTalk();
    this.getLike();
  }

  getTalk = () => {
    console.log('Fetching talks');

    this.props.dispatch({
      type: 'FETCH_ALL_TALKS'
    });
  }

  getLike = () => {
    console.log('fetching likes');
    this.props.dispatch({
      type: 'FETCH_LIKES',
    });
  }

  render() {
    console.log('this.props for jurorPage', this.props);
    let usedLikes = this.props.store.likes.length;
    return (
      <div>
        <div id="topicContainer">
        <AppBar />
          {this.props.store.talks.map((talk) => (
            <JurorTalkCategory key={talk.id} id={talk.id} topicId={talk.id} title={talk.title} usedLikes={usedLikes}/>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JurorView);
