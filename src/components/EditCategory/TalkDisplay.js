import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css';
import Swal from 'sweetalert2'
import {IconButton, Zoom, DialogContentText, DialogContent, DialogActions, Dialog, Button, Input} from '@material-ui/core';

import EditDialogue from './EditDialogue';
class TalkDisplay extends Component {
  state = {
    editView: false,
    open: false,
    sendEdit: false,
    title: '',
    description: '',
    poster: '',
  };
  componentDidMount() {
    this.props.dispatch({
        type: 'FETCH_ALL_TALKS'
    })
  }
  componentDidUpdate() {
    this.props.dispatch({
      type: 'FETCH_ALL_TALKS'
  })
  }
  toggleEditView = () => {
    this.setState({
      editView: !this.state.editView,
      open: !this.state.open
    })
  }
  editTalk = () => {
    this.setState({
      sendEdit: !this.state.sendEdit
    })
  }
  setOurDescriptionState = (description) => {
    this.setState({
      description: description
    })
  }
  setOurPosterState = (poster) => {
    this.setState({
      poster: poster
    })
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
    return (
      <div className="talkDiv">
          <img 
            className="talkImages" 
            src={this.props.talk.image_url}
            onClick={this.toggleEditView}/> 
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.toggleEditView}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"    
        >
          <DialogContent >
              <DialogContentText id="alert-dialog-slide-description" >
                  <img 
                    className="talkImages" 
                    src={this.props.talk.description_url}/>
              </DialogContentText>
          </DialogContent>
          <DialogActions >
          <Button 
                onClick={()=> this.submitChange(this.props.talk)} color="primary">
                  Delete Talk
              </Button>
              <Button 
                onClick={this.editTalk} color="primary">
                  Edit Talk
              </Button>
          </DialogActions>
      </Dialog>
      <EditDialogue 
        editTalk={this.editTalk} sendEdit={this.state.sendEdit}
        talk={this.props.talk} 
        setOurPosterState={this.props.setOurPosterState}
        setOurDescriptionState={this.props.setOurDescriptionState}
       />
      </div>
    );
  }
}


export default connect(mapStoreToProps)(TalkDisplay);