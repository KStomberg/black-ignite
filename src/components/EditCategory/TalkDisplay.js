import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css';
import Swal from 'sweetalert2'

class TalkDisplay extends Component {
  state = {
    editView: false,
  };
  componentDidUpdate() {
    this.props.dispatch({
        type: 'FETCH_ALL_TALKS'
    })
  }
  toggleEditView = () => {
    this.setState({
      editView: !this.state.editView,
    })
  }
 
 handleChange = () => {
    
 }
 submitChange = (talk) => {
  let objectToSend = {
    id: talk.id
  }
  console.log(objectToSend)

  this.props.dispatch({
    type: 'DELETE_TALK',
    payload: objectToSend
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
    if(this.state.editView === false){
    return (
      <div className="talkDiv">
          <img className="talkImages" src={this.props.talk.image_url}
          onClick={this.toggleEditView}/>
      </div>
    );
  }
  else {
    return (
      <div className="talkDiv">
          <img className="talkImages" src={this.props.talk.image_url}
          onClick={this.toggleEditView}/>
          <img className="talkImages" src={this.props.talk.description_url}
          onClick={this.toggleEditView}/>
            <div>
        <button onClick={()=> this.handleChange(this.props.talk)}>Edit</button>
        <button onClick={()=> this.deleteTalk(this.props.talk)}>Delete</button>
        </div>  
      </div>
    );
  }
}
}

export default connect(mapStoreToProps)(TalkDisplay);