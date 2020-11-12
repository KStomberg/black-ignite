import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


import './JurorItem.css';

class JurorItem extends Component {

    render() {
        console.log(this.props);
        return(
            <div>
                <div className='topicHeader' id={this.props.topicId}>
                    <h4>{this.props.title}</h4>
                </div>
                
            </div>
        )
    }
}

export default connect(mapStoreToProps)(JurorItem);