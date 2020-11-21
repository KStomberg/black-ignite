import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditPosterDropzone from './EditPosterDropzone';
import EditDescriptionDropzone from './EditDescriptionDropzone';
import {IconButton, Zoom, DialogContentText, DialogContent, DialogActions, Dialog, Button, Input} from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditDialogue extends Component {
  state = {
    heading: 'Class Component',
    title: this.props.talk.title,
    description: this.props.talk.description_url,
    poster: this.props.talk.image_url,
    id: this.props.talk.id,
    isOpen: this.props.sendEdit
  };
componentDidMount() {
  this.props.dispatch({
    type: 'FETCH_ALL_TALKS'
  })
}
  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
 }
 setEditedDescriptionState = (description) => {
  this.setState({
    description: description
  })
}
setEditedPosterState = (poster) => {
  this.setState({
    poster: poster
  })
}
 handleEditSubmit = () => {
    let editObjectToSend = {
    title: this.state.title,
    description: this.state.description,
    poster: this.state.poster,
    id: this.state.id
    }
    console.log('made it into our edit submit', editObjectToSend)
   
    this.props.dispatch({
      type: 'EDIT_CATEGORY',
      payload: editObjectToSend
    })
  this.componentDidMount();
  }

  render() {
    return (
        <Dialog
          open={this.props.sendEdit}
          onClose={this.props.editTalk}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"    
        >
          <DialogContent id="alert-dialog-slide-description" >
            <div className="editDropzones">
              <input
                value={this.state.title} 
                onChange={this.handleChange}/>
            <div className="dropzone">
              <h2 className="talkH2">Category Poster</h2>
              <EditPosterDropzone 
                value={this.state.poster} 
                setEditedPosterState={this.setEditedPosterState}/>
            </div>
          <div className="dropzone">
            <h2 className="talkH2">Category Description</h2>
            <EditDescriptionDropzone 
              value={this.state.description}
              setEditedDescriptionState={this.setEditedDescriptionState}/>
          </div>
        </div>
        </DialogContent>
        <DialogActions >
            <Button onClick={this.handleEditSubmit} color="primary">
              Submit Changes
            </Button>
              </DialogActions>
        </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(EditDialogue);