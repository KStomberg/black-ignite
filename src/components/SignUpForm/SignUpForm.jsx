import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import UploadIcon from './UploadIcon.png';
import './SignUpForm.css';

function SignUpForm() {
    const [category, setCategory] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('NA');
    const [linkedIn, setLinkedIn] = useState('NA');
    const [comments, setComments] = useState('NA');
    const dispatch = useDispatch();

    const onChange = (event, propertyName) => {
        propertyName(event.target.value);
    }

    const submitTalk = () => {
        let objectToSend = {
            fullName: fullName,
            email: email,
            instagram: instagram,
            linkedIn: linkedIn,
            comments: comments
        }

        dispatch({
            type: 'CREATE_TALK',
            payload: objectToSend
        });
    }

    return (
        <div className="signUp">

            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid item>
                    <form className="form">
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
                                    onChange={(event) => onChange(event, "setCategory")}
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
                                    onChange={(event) => onChange(event, "setFullName")}
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
                                    onChange={(event) => onChange(event, "setEmail")}
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
                                    onChange={(event) => onChange(event, "setInstagram")}
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
                                    onChange={(event) => onChange(event, "setLinkedIn")}
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
                                    onChange={(event) => onChange(event, "setComments")}
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

                        <input type="submit" value="submit" className="submitBtn" onClick={submitTalk}/>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUpForm;