import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './EditCategory.css';
import LinearProgress from '@material-ui/core/LinearProgress';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PosterDropzone extends Component {
 state = {
     posterUrl: '',
     uploadPercentage: 0,
}
  handleFinishedUpload = async(info) => {
    this.dataToSend(info);
   }
  dataToSend  = async(info) => {
      await
          this.setState({
              posterUrl: info.fileUrl
          });
          console.log(`this.state.posterUrl`, this.state.posterUrl);
          this.props.setEditedPosterState(this.state.posterUrl);
  }
  onUploadProgress = (percent) => { console.log(percent) 
    this.setState({
      uploadPercentage: percent
    })
  }
  render() {
    const uploadOptions = {server: 'http://localhost:5000'}
    const s3Url = `http://black-ignite-example.s3.amazonaws.com`;
    const dropZoneStyle = {
      height: '150px',
      width: '150px',
      border: '2px dashed',
      borderRadius: '4px',
      borderColor: '#246399',
      display: 'flex',
      flexWrap: 'wrap',
      cursor: 'pointer',
    }
   
    return (
      <>
        
        <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            accept="image/*,audio/*,video/*"
            // maxSize={1024 * 1024 * 5}
            //upload={uploadOptions}
            style={dropZoneStyle}
            onProgress={this.onUploadProgress}
          />
        <LinearProgress 
          className="progressBar"
          variant="determinate" 
          value={this.state.uploadPercentage} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(PosterDropzone);