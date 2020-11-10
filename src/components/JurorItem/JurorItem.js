import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './JurorItem.css';

class JurorItem extends Component {

    render() {
        console.log(this.props);
        return(
            <p>test</p>
        )
    }
}

export default connect(mapStoreToProps)(JurorItem);