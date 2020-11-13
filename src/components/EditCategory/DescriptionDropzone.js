import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class DescriptionDropzone extends Component {
state = {
    descriptionUrl: '',
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
  render() {
    const uploadOptions = {server: 'http://localhost:5000'}
    const s3Url = `http://black-ignite-example.s3.amazonaws.com`;
    return (
      <div>
         <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            accept="image/*,audio/*,video/*"
            // maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
            />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DescriptionDropzone);