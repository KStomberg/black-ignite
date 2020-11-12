import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './JurorTalkSubmission.css';

class JurorTalkSubmission extends Component {
    
    render() {
        console.log('this.props for JurorTalkSubmission', this.props);
        
            return (
                <div>
                    <p>match!</p>
                </div>
            )
        }

    }



export default connect(mapStoreToProps)(JurorTalkSubmission);