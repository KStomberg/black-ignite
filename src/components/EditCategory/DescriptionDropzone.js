import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import LinearProgress from '@material-ui/core/LinearProgress';
import './EditCategory.css';

class DescriptionDropzone extends Component {
state = {
    descriptionUrl: '',
    uploadPercentage: 0,

}
  handleFinishedUpload = async(info) => {
    this.dataToSend(info);
   }
    dataToSend  = async(info) => {
    await
        this.setState({
        descriptionUrl: info.fileUrl
        });
        console.log(`this.state.descriptionUrl`, this.state.descriptionUrl);
        this.props.setOurDescriptionState(this.state.descriptionUrl);
    }
    onUploadProgress = (percent) => { console.log(percent) 
      this.setState({
        uploadPercentage: percent
      })
    }
  render() {
    const uploadOptions = {}
    const s3Url = `http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com`;
    const dropZoneStyle = {
      height: '200px',
      width: '200px',
      border: '2px dashed',
      borderRadius: '4px',
      borderColor: '#246399',
      display: 'flex',
      flexWrap: 'wrap',
      cursor: 'pointer',
      backgroundImage: 'url(/upload-background-image.png)',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
    return (
      <>
         <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            
            accept="image/*,audio/*,video/*"
            // maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
            style={dropZoneStyle}
            />
            <LinearProgress
              className="progressBar"
              variant="determinate" 
              value={this.state.uploadPercentage} />
        </>
    );
  }
}

export default connect(mapStoreToProps)(DescriptionDropzone);