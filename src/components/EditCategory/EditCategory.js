import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TalkDisplay from './TalkDisplay';
import './EditCategory.css';
import ButtonAppBar from '../AppBar/AppBar';
import Switch from '@material-ui/core/Switch';
import EditTalkDisplay from './EditTalkDisplay';
import Grid from '@material-ui/core/Grid';
import PosterDropzone from './PosterDropzone';
import DescriptionDropzone from './DescriptionDropzone'

class EditCategory extends Component {
 
  state = {
    editView: false,
    title: '',
    poster: '',
    description: '',
    date: ''
  };
componentDidMount() {
  this.props.dispatch({
      type: 'FETCH_ALL_TALKS'
  })
}
toggleEditView = () => {
  this.setState({
    editView: !this.state.editView,
  })
}
handleChange = (event) => {
  this.setState({
    ...this.state,
    title: event.target.value
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
onSubmit = () => {
  let categoryTosend = {
    title: this.state.title,
    poster: this.state.poster,
    description: this.state.description
}
this.props.dispatch({
    type: 'POST_CATEGORY',
    payload: categoryTosend
})
this.componentDidMount();

}
  render() {
    if (this.state.editView === false){
      return (
       <div className="talkGallery">
          <ButtonAppBar/>
          <h2>Add A Talk</h2>
          <Switch
            className="EditSwitch"
            onClick={this.toggleEditView}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
          <div className="createTalkForm">
          <label>Talk Title: </label>
            <input type="text" value={this.state.title}
              onChange={(event)=>this.handleChange(event)} placeholder="Title"/>
              <div className="dropzones">
                <div className="dropzone">
                  <h2 className="talkH2">Talk Poster</h2>
                  <PosterDropzone setOurPosterState={this.setOurPosterState}/>
                </div>
                <div className="dropzone">
                <h2 className="talkH2">Talk Description</h2>
                  <DescriptionDropzone setOurDescriptionState={this.setOurDescriptionState}/>
                </div>
              </div>
            <button onClick={this.onSubmit}>Submit</button>
            </div>
          <Grid container spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
          {this.props.store.talks.map(talk => 
              <TalkDisplay key={talk.id} talk={talk}/>)}
          </Grid>
        </div>
      );
    }
    else{
      return(
        <div className="talkGallery">
          <ButtonAppBar/>
          <h2>Edit a Talk</h2>
          <Switch
            className="EditSwitch"
            onClick={this.toggleEditView}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
          <Grid container spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
          {this.props.store.talks.map(talk => 
              <EditTalkDisplay key={talk.id} talk={talk}/>)}
        
          </Grid>
        </div>
      )
    }
  }
}

export default connect(mapStoreToProps)(EditCategory);
