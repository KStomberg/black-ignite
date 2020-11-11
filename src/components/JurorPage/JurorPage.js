import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './JurorPage.css';

class JurorView extends Component {
    
    state = {
    }

    render() {

        return(
            <p>test</p>
        )
    }
}

export default connect(mapStoreToProps)(JurorView);