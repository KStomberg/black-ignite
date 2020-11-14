import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css';
import Swal from 'sweetalert2'
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditTalkDisplay extends Component {
  state = {
    heading: 'Talk Display',
    showPopup: false,
    editView: false,
    talkInputs: false,
    title: '',
    posterFile: '',
    descriptionFile: ''

  };
  componentDidUpdate() {
    this.props.dispatch({
        type: 'FETCH_ALL_TALKS'
    })
  }
  togglePopup = () => {
      this.setState({
          showPopup: !this.state.showPopup
      })
  }
 handleChange = (talk) => {
    this.setState({
        talkInputs: !this.state.talkInputs
    })
 }
  deleteTalk = (talk) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this will permanently delete this talk',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Talk Deleted',
          'success'
        )
    console.log(`this is our talk`, talk);
    let objectToSend = {
      id: talk.id
    }
    console.log(objectToSend)
  
    this.props.dispatch({
      type: 'DELETE_TALK',
      payload: objectToSend
    })
    
  
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Talk not deleted'
        )
      }
    })
  }
  render() {
    return (
      <div className="talkDiv">
          {this.state.talkInputs ? 
        <div className="editTalkInputs">
            <input placeholder="title"/>
            <input placeholder="dropzone"/>
            <input placeholder="dropzone2"/>
        </div>
      : null  
    }  
        <img className="talkImages" src={this.props.talk.image_url}
        onClick={this.togglePopup}/>
        <div>
        <button onClick={()=> this.handleChange(this.props.talk)}>Edit</button>
        <button onClick={()=> this.deleteTalk(this.props.talk)}>Delete</button>
        </div>
        {this.state.showPopup ? 
        <div className="popUpDescription">{this.props.talk.description}</div>
      : null  
    }  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditTalkDisplay);