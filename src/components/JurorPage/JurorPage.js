import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import JurorItem from '../JurorItem/JurorItem'

import './JurorPage.css';

class JurorView extends Component {
    
    state = {
        sampleTalk: [
                {id: 1,
                topic: 'Redesign Our City',
                name: 'Remi Douglass',
                email: 'rdoug@test.com',
                instagram: null,
                linkedin: 'linkedin.com/user/test',
                comment: 'this is where I put stuff and things',
                video: 'www.blackignite.com'},

                {id: 2,
                topic: 'Allies in Action',
                name: 'Jim Hawkins',
                email: 'jimhawkins@aol.com',
                instagram: '@jhawkeye',
                linkedin: 'linkedin.com/user/test',
                comment: 'this is where I put stuff and things',
                video: 'www.blackignite.com'}
            ]
        }
    

    render() {

        return(
            <div id='topicContainer'>
                {this.state.sampleTalk.map((submission) => (
                    <JurorItem
                        key={submission.id}
                        id={submission.id}
                        name={submission.name}
                        email={submission.email}
                        instagram={submission.instagram}
                        linkedin={submission.linkedin}
                        comment={submission.comment}
                        video={submission.video}
                    />

                ))}
            </div>
        )
    }
}

export default connect(mapStoreToProps)(JurorView);