import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css';


class TalkDisplay extends Component {
  state = {
    heading: 'Talk Display',
    showPopup: false,
  };
  togglePopup = () => {
      this.setState({
          showPopup: !this.state.showPopup
      })
  }

  render() {
    return (
      <div className="talkDiv">
          <img className="talkImages" src={this.props.talk.image_url}
          onClick={this.togglePopup}/>
          
          {this.state.showPopup ? 
          <div className="popUpDescription">{this.props.talk.description}</div>
        : null  }  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TalkDisplay);