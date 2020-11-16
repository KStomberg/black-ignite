import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ButtonAppBar from '../AppBar/AppBar';
import './Ranking.css';
import {Link} from 'react-router-dom';

class Ranking extends Component {
    state = {
        heading: 'Ranking',
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_RANKINGS'
        })
    }
    render(){
        console.log('this.props.store.rankings',this.props.store.rankings)
        JSON.stringify(this.props.store.rankings)
        return (
            <div>
                <ButtonAppBar />
                <div className="rankingDiv"><h2>Redesign our city!</h2></div>
          <table className="rankingTable">
            <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Intagram</th>
              <th>LinkedIn</th>
              <th>Twitter</th>
              <th>Comments</th>
              <th>Video url</th>
              <th>Likes:</th>
            </tr>
          </thead>
          <tbody>
                {this.props.store.rankings.map(ranking => 
              <tr key={ranking.id}>
                   <td>{ranking.full_name}</td>
                   <a href="mailto:">{ranking.email}</a>
                   <a href={ranking.instagram}>Instagram</a>
                   <a href={ranking.linkedin}> LinkedIn Account</a>
                   <a href={ranking.twitter}> Twitter account</a>
                   <td>{ranking.comments}</td>
                   <a href={ranking.video_url}>Video Links</a>
                   <td>{ranking.likes}</td>
                   </tr> )}
        </tbody>
        </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Ranking);