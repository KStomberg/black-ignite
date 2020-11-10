import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css'
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class TalkDisplay extends Component {
  state = {
    heading: 'Talk Display',
    showPopup: false
  };
  togglePopup = () => {
      this.setState({
          showPopup: !this.state.showPopup
      })
  }

  render() {
    return (
      <div className="talkDiv">
        <h2>{this.props.talk.title}</h2>
        <img className="talkImages" src={this.props.talk.image_url}
        onClick={this.togglePopup}/>
        {this.state.showPopup ? 
        <div className="popUpDescription">{this.props.talk.description}</div>
      : null  
    }  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TalkDisplay);