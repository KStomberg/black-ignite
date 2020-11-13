import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PosterDropzone extends Component {
 state = {
     posterUrl: '',
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
            this.props.setOurPosterState(this.state.posterUrl);
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

export default connect(mapStoreToProps)(PosterDropzone);