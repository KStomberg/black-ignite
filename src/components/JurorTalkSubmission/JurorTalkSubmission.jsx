import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './JurorTalkSubmission.css';

class JurorTalkSubmission extends Component {

    // idCompare = () => {
    //     console.log('Testing:', this.props.topicId, this.props.categoryId);
    //     if (this.props.topicId === this.props.categoryId) {
    //         return (
    //             <div>
    //                 <p>match!</p>
    //             </div>
    //         )
    //     }
    // }
    
    render() {
        console.log('this.props for JurorTalkSubmission', this.props);
        
        console.log('Testing:', this.props.talkId, this.props.categoryId);
        if (this.props.talkId === this.props.categoryId) {
            return (
                <div>
                    <p>match!</p>
                </div>
            )
        } else {
            return ('')
        }

    }


    // render() {
    //     console.log('this.props for JurorTalkSubmission', this.props);
    //     return(
    //         <div> 
    //         {this.idCompare}
    //         </div>
    //     );
    // }
}

export default connect(mapStoreToProps)(JurorTalkSubmission);