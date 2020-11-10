import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import UploadIcon from './UploadIcon.png';
import './SignUpForm.css';

function SignUpForm() {
    const [category, setCategory] = useState();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('NA');
    const [linkedIn, setLinkedIn] = useState('NA');
    const [twitter, setTwitter] = useState('NA');
    const [comments, setComments] = useState('NA');
    // 
    const [file, setFile] = useState('FILE');
    // 
    const dispatch = useDispatch();

    // Submitting form
    const handleSubmit = (evt) => {
        evt.preventDefault();

        let objectToSend = {
            category: category,
            fullName: fullName,
            email: email,
            instagram: instagram,
            linkedIn: linkedIn,
            twitter: twitter,
            comments: comments,
            file: file
        }
        console.log("objectToSend:", objectToSend);

        dispatch({
            type: 'CREATE_SUBMISSION',
            payload: objectToSend
        });
    } // end handleSubmit

    return (
        <div className="signUp">
            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid item>
                    <form className="form" onSubmit={handleSubmit}>
                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="category" className="inputDesc">*talk category I'm interested in</label>
                            </Grid>
                            <Grid item>
                                {/* Drop-Down for Categories */}
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setCategory(e.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="fullName" className="inputDesc">*your full name</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="email" className="inputDesc">*your email address</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="email" className="inputDesc">what's your Instagram @</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setInstagram(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="linkedin" className="inputDesc">link to your Linkedin profile</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setLinkedIn(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="twitter" className="inputDesc">your Twitter</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    onChange={e => setTwitter(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="comments" className="inputDesc">comments</label>
                            </Grid>
                            <Grid item>
                                <textarea
                                    type="text"
                                    rows="3"
                                    cols="23"
                                    className="textbox"
                                    onChange={e => setComments(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <p className="detailParagraph">
                            Please share a 1-3 minute video introducing yourself and why
                            you want to do this ignite talk.
                        </p>

                        <Grid 
                            container
                            direction="column"
                            align-items="flex-start"
                        >
                            <Grid item>
                                <label for="video" className="inputDesc">*my intro video</label>
                            </Grid>
                            <Grid item>
                                {/* Drop Zone for Video Upload */}
                                <button className="uploadBtn">
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={4}>
                                            <img alt="upload" src={UploadIcon} width="60"/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <p className="uploadBtnText">upload video from my device</p>
                                        </Grid>
                                    </Grid>
                                </button>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                        >
                            <Grid item>
                                <p>
                                    videos must be below 100MB
                                </p>
                            </Grid>
                        </Grid>

                        <input type="submit" value="submit" className="submitBtn"/>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUpForm;