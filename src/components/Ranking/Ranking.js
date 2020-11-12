import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ButtonAppBar from '../AppBar/AppBar';
import './Ranking.css';

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
                <div className="rankingDiv"><h2>List of Favorite Submissions</h2></div>
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
            </tr>
          </thead>
          <tbody>
                {this.props.store.rankings.map(ranking => 
              <tr key={ranking.id}>
                   <td> {ranking.full_name}</td>
                   <td>{ranking.email}</td>
                   <td>{ranking.instagram}</td>
                   <td>{ranking.linkedin}</td>
                   <td>{ranking.twitter}</td>
                   <td>{ranking.comments}</td>
                   <td>{ranking.video_url}</td>
                   </tr> )}
        </tbody>
        </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Ranking);