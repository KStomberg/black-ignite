import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TalkDisplay from './TalkDisplay';
import './EditCategory.css';
import ButtonAppBar from '../AppBar/AppBar';
import Switch from '@material-ui/core/Switch';
import EditTalkDisplay from './EditTalkDisplay';
import Grid from '@material-ui/core/Grid';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment';


class EditCategory extends Component {
  state = {
    editView: false,
    title: '',
    poster: '',
    description: '',
    fileUrl: '',
    imageUrl: '',
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
handleChange = () => {
  
}
handleFinishedUpload = info => {
  console.log('File uploaded with filename', info.filename)
  console.log('Access it on s3 at', info.fileUrl)
  this.setState({
      fileUrl: info.fileUrl,
      date: moment(Date()).format(),
      //challenges_id: this.props.store.dailyChallenges[0]
    });
}
  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: {uploadType: 'avatar'},
  }
  const s3Url = `http://black-ignite-example.s3.amazonaws.com`;
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
          onChange={(event)=>this.handleChange(event)} placeholder="Title"/>
          <DropzoneS3Uploader
                    onFinish={this.handleFinishedUpload}
                    s3Url={s3Url}
                    maxSize={1024 * 1024 * 5}
                    upload={uploadOptions}
                />
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
