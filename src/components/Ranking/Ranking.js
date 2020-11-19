import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ButtonAppBar from '../AppBar/AppBar';
import './Ranking.css';
import CategoryMenu from '../CategoryMenu.js/CategoryMenu';

class Ranking extends Component {
    state = {
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

                <div className="rankingDiv"><CategoryMenu/></div>

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
              <th>Votes:</th>
            </tr>
          </thead>
          <tbody>
                {this.props.store.rankings.map(ranking => 
              <tr key={ranking.id}>
                   <td>{ranking.full_name}</td>
                   <td><a className="emailDiv" href="mailto:">{ranking.email}</a></td>
                   <td>{ranking.instagram}Instagram</td>
                   <td>{ranking.linkedin} LinkedIn Account</td>
                   <td>{ranking.twitter}</td>
                   <td>{ranking.comments}</td>
                   <td><a className="emailDiv"href={ranking.video_url}>Video Links</a></td>
                   <td>{ranking.likes}</td>
                   </tr> )}
        </tbody>
        </table>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Ranking);