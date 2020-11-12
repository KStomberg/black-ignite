import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TalkDisplay from './TalkDisplay';
import './EditCategory.css';
import ButtonAppBar from '../AppBar/AppBar';
import Switch from '@material-ui/core/Switch';
import EditTalkDisplay from './EditTalkDisplay';



class EditCategory extends Component {
  state = {
    heading: 'Edit Category',
    editView: false,
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

  render() {
    if (this.state.editView === false){
      return (
        <div className="talkGallery">
          <ButtonAppBar/>
          <h2>{this.state.heading}</h2>
          <Switch
          className="EditSwitch"
          onClick={this.toggleEditView}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
          {this.props.store.talks.map(talk => 
              <TalkDisplay key={talk.id} talk={talk}/>)}
        </div>
        
      );
    }
    else{
      return(
        <div className="talkGallery">
          <ButtonAppBar/>
          <Switch
          className="EditSwitch"
          onClick={this.toggleEditView}
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
          {this.props.store.talks.map(talk => 
              <EditTalkDisplay key={talk.id} talk={talk}/>)}
        </div>
      )
    }
  }
}

export default connect(mapStoreToProps)(EditCategory);
