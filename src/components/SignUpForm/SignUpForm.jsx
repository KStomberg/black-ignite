import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, IconButton} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment'
import './SignUpForm.css';

const useStyles = makeStyles({
    checkmarkIcon: {
        color: '#EDAC3A',
        backgroundColor: '#221F1F',
        marginLeft: 5,
        height: 10,
        width: 10,
        '&:hover': {
            color: '#EDAC3A',
            backgroundColor: '#221F1F',
            cursor: 'default',
            marginLeft: 5
        }
    },
    checkmark: {
        width: 9,
        height: 9,
        fontWeight: 'bold'
    }
})

function SignUpForm() {
    const [category, setCategory] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [comments, setComments] = useState('');
    const [date, setDate] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const selectedCategory = useSelector(state => state.description);
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'FETCH_ALL_CATEGORIES'});
    }, []);

    const handleSubmit = evt => {
        evt.preventDefault();

        let objectToSend;
        if (category === undefined) {
            objectToSend = {
                category: selectedCategory.id,
                fullName: fullName,
                email: email,
                instagram: instagram,
                linkedIn: linkedIn,
                twitter: twitter,
                comments: comments,
                date: date,
                fileUrl: fileUrl
            }
        }
        else {
            objectToSend = {
                category: Number(category),
                fullName: fullName,
                email: email,
                instagram: instagram,
                linkedIn: linkedIn,
                twitter: twitter,
                comments: comments,
                date: date,
                fileUrl: fileUrl
            }
        }
        console.log("objectToSend:", objectToSend);

        dispatch({
            type: 'CREATE_SUBMISSION',
            payload: objectToSend
        });

        history.push('/user/confirmation');
    } // end handleSubmit

    const dropzoneStyles = {
        border: '2px dashed red',
        backgroundColor: 'transparent',
        borderRadius: 10,
        maxWidth: 270,
        width: 270,
        maxHeight: 'fitContent',
        height: 90,
        display: 'inline-block'
    }

    const handleFinishedUpload = async info => {
        await setFileUrl(info.fileUrl);
        await setDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }

    const s3Url = `http://black-ignite-example.s3.amazonaws.com`;
    const uploadOptions = {
        server: 'http://localhost:5000'
    }

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
                                {selectedCategory === {} ?
                                    <select 
                                        id="category" 
                                        name="category" 
                                        placeholder="Category Name" 
                                        className="selectInput" 
                                        onChange={e => setCategory(e.target.value)} 
                                        required
                                    >
                                        {categories.map(category =>
                                            <option value={category.id}>{category.title}</option>
                                        )}
                                    </select> :
                                    <select 
                                        id="category" 
                                        name="category" 
                                        placeholder="Category Name" 
                                        className="selectInput" 
                                        value={selectedCategory.id}
                                        onChange={e => setCategory(e.target.value)} 
                                        required
                                    >
                                        <option value={selectedCategory.id} selected>{selectedCategory.title}</option>
                                        {categories.map(category =>
                                            <option value={category.id}>{category.title}</option>
                                        )}
                                    </select>
                                }

                                {/* Checkmark */}
                                {selectedCategory === '' ?
                                <></> :
                                <IconButton className={classes.checkmarkIcon}>
                                    <DoneIcon className={classes.checkmark}/>
                                </IconButton>
                                }
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

                                {/* Checkmark */}
                                {fullName === '' ?
                                <></> :
                                <IconButton className={classes.checkmarkIcon}>
                                    <DoneIcon className={classes.checkmark}/>
                                </IconButton>
                                }
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

                                {/* Checkmark */}
                                {email === '' ?
                                <></> :
                                <IconButton className={classes.checkmarkIcon}>
                                    <DoneIcon className={classes.checkmark}/>
                                </IconButton>
                                }
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
                                <span>
                                    <DropzoneS3Uploader
                                        onFinish={handleFinishedUpload}
                                        accept="image/*,audio/*,video/*"
                                        upload={uploadOptions}
                                        s3Url={s3Url}
                                        style={dropzoneStyles}
                                    />
                                </span>
                                {fileUrl === '' ?
                                <></> :
                                <div className="dropzoneCheckmark">
                                    <IconButton className={classes.checkmarkIcon}>
                                        <DoneIcon className={classes.checkmark}/>
                                    </IconButton>
                                </div>
                                }
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

                        {fullName === '' || email === '' || fileUrl === '' ?
                            <input type="submit" value="submit" className="submitBtnForm disabled" disabled/> :
                            <input type="submit" value="submit" className="submitBtnForm"/>
                        }
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUpForm;