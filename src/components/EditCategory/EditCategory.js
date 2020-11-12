import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TalkDisplay from './TalkDisplay';
import './EditCategory.css';
import ButtonAppBar from '../AppBar/AppBar';
import Switch from '@material-ui/core/Switch';
import EditTalkDisplay from './EditTalkDisplay';
import Grid from '@material-ui/core/Grid';

class EditCategory extends Component {
  state = {
    editView: false,
    title: '',
    poster: '',
    description: '',
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
handleChange = () => {
  
}
  render() {
    if (this.state.editView === false){
      return (
       <div className="talkGallery">
          <ButtonAppBar/>
          <h2>Create A Talk</h2>
          <Switch
          className="EditSwitch"
          onClick={this.toggleEditView}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
        <label>Talk Title: </label>
          <input value={this.state.title}
          onChange={(event)=>this.handleChange(event)}/>
        <input/>
        <input/>

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
// adding a comment to push changes
export default connect(mapStoreToProps)(EditCategory);
