import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import JurorTalkSubmission from '../JurorTalkSubmission/JurorTalkSubmission'

import './JurorTalkCategory.css';

class JurorTalkCategory extends Component {

    componentDidMount() {
        this.getSubmission();
    }

    getSubmission = () => {
        console.log('Fetching submissions');

        this.props.dispatch({
            type: 'FETCH_SUBMISSIONS'
        });
    }

    render() {
        console.log('this.props for JurorTalkCategory', this.props);
        let submissionsForThisCategory = this.props.store.submissions
            .filter(submission => submission.category_id === this.props.topicId)
        return(
            <div>
                <div className='topicHeader' id={this.props.topicId}>
                    <h4>{this.props.title}</h4>
                </div>
                {submissionsForThisCategory.map((submission) => {
                    return(
                    <JurorTalkSubmission 
                    key={submission.id}
                    talkId={this.props.topicId}
                    categoryId={submission.category_id}
                    name={submission.full_name}
                    email={submission.email}
                    instagram={submission.instagram}
                    linkedin={submission.linkedin}
                    twitter={submission.twitter}
                    comment={submission.comments}
                    video={submission.video_url}
                    />
                )})}
                
            </div>
        )
    }
}

export default connect(mapStoreToProps)(JurorTalkCategory);