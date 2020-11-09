import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import './SignUpForm.css';

function SignUpForm() {
    const dispatch = useDispatch();

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
                                    placeholder="First Last"
                                    type="text"
                                    className="input"
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
                                    placeholder="email@example.com"
                                    type="text"
                                    className="input"
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
                                    placeholder="@instagram"
                                    type="text"
                                    className="input"
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
                                    placeholder="https://www.linkedin.com/in/EXAMPLE"
                                    type="text"
                                    className="input"
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
                            </Grid>
                        </Grid>

                        <p className="details">
                            videos must be below 100MB
                        </p>

                        <input type="submit" value="submit" className="submitBtn"/>
                    </form>
                </Grid>
            </Grid>

            <h1 className="cancelBtn">✖</h1>
        </div>
    );
}

export default SignUpForm;