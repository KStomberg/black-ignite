import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Ranking extends Component {
    // state = {
    //     heading: 'Ranking',
    // }
    render(){
        return (
            <div>
                Ranking
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Ranking);