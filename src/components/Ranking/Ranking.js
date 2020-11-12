import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ButtonAppBar from '../AppBar/AppBar';
import './Ranking.css';

class Ranking extends Component {
    state = {
        heading: 'Ranking',
    }
    render(){
        return (
            <div>
                <ButtonAppBar />
                <div className="rankingDiv"><h2>Ranking</h2></div>
                <div className="manageJurorDiv">
          <table className="manageJurorTable">
            <thead>
            <tr>
              <th>List of Favorite Submissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Redesign</td>
            </tr>
            <tr>
                <td>Free Outdoor Yoga</td>
            </tr>
        </tbody>
        </table>
        </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Ranking);