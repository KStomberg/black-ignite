import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './EditCategory.css';
import Swal from 'sweetalert2'
import {IconButton, Zoom, DialogContentText, DialogContent, DialogActions, Dialog, Button, Input} from '@material-ui/core';
import PosterDropzone from './PosterDropzone';
import DescriptionDropzone from './DescriptionDropzone'
class TalkDisplay extends Component {
  state = {
    editView: false,
    open: false,
    sendEdit: false,
    title: '',
    description: '',
    poster: ''
  };
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
 handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
 }
 
 handleEditSubmit = () => {
  let editObjectToSend;
  console.log('made it into our edit submit')
  if(this.state.poster === '' && this.state.description === ''){
    editObjectToSend = {
      title: this.state.title
    }
  }
  else if (this.state.poster === '' && this.state.title === ''){
    editObjectToSend = {
      description_url: this.state.description
    }
  }
  else if (this.state.description === '' && this.state.title === ''){
    editObjectToSend = {
      poster_url: this.state.poster
    }
  }
  else if (this.state.title === ''){
    editObjectToSend = {
      poster_url: this.state.poster,
      description_url: this.state.description
    }
  }
    else if (this.state.description === ''){
      editObjectToSend = {
        poster_url: this.state.poster,
        title: this.state.title
      }
 }
  else if (this.state.poster === ''){
    editObjectToSend = {
      description_url: this.state.description,
      title: this.state.title
    }
  }
  else{
    editObjectToSend = {
      poster_url: this.state.poster,
      description_url: this.state.description,
      title: this.state.title
    }
  }
  this.props.dispatch({
    type: 'EDIT_CATEGORY',
    payload: editObjectToSend
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
transition = (props) => {
    return <Zoom direction="in" {...props} />;
};
  render() {
    return (
      <div className="talkDiv">
          <img className="talkImages" src={this.props.talk.image_url}
          onClick={this.toggleEditView}/> 
        <Dialog
          open={this.state.open}
          TransitionComponent={this.transition}
          keepMounted
          onClose={this.toggleEditView}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"    
        >
            <DialogContent >
                <DialogContentText id="alert-dialog-slide-description" >
                    <img className="talkImages" src={this.props.talk.description_url}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button onClick={this.editTalk} color="primary">
                    Edit This Talk
                </Button>
            </DialogActions>
      </Dialog>
      <Dialog
          open={this.state.sendEdit}
          TransitionComponent={this.transition}
          keepMounted
          onClose={this.toggleSendEdit}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"    
        >
            <DialogContent >
                <DialogContentText id="alert-dialog-slide-description" >
                <div className="dropzones">
                  <Input
                  value={this.state.title} 
                  onChange={this.handleChange}/>
                <div className="dropzone">
                  <h2 className="talkH2">Talk Poster</h2>
                  <PosterDropzone setOurPosterState={this.setOurPosterState}/>
                </div>
                <div className="dropzone">
                  <h2 className="talkH2">Talk Description</h2>
                  <DescriptionDropzone setOurDescriptionState={this.setOurDescriptionState}/>
                </div>
              </div>
                  
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button onClick={this.handleEditSubmit} color="primary">
                  Submit Changes
                </Button>
            </DialogActions>
      </Dialog>
      </div>
    );
  }
}


export default connect(mapStoreToProps)(TalkDisplay);