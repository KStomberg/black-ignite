import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, IconButton} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment'
import LinearProgress from '@material-ui/core/LinearProgress';
import './SignUpForm.css';
import branch from 'branch-sdk';

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
    },
    progressBar: {
        height: 15,
        marginTop: 10,
        borderRadius: 3,
        width: 270
    }
});

//Insert your Branch.io key where it says 'Test key here!'
var options = { no_journeys: true };
branch.init('Test key here!', options, function(err, data) {
  console.log(err, data);
});

function SignUpForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [twitter, setTwitter] = useState('');
    const [comments, setComments] = useState('');
    const [date, setDate] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
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

        const objectToSend = {
            category: Number(selectedCategory.id),
            fullName: fullName,
            email: email,
            instagram: instagram,
            linkedIn: linkedIn,
            twitter: twitter,
            comments: comments,
            date: date,
            fileUrl: fileUrl,
        }

        dispatch({
            type: 'CREATE_SUBMISSION',
            payload: objectToSend
        });

        //Branch.io custom data
        let event_and_custom_data={
            "category": `${Number(selectedCategory.id)}`,
            "fullName": `${fullName}`,
            "date": `${date}`,
        }

        //Link to the URL of the uploaded file, used by Branch.io
        let content_items = [
            {
               "fileUrl": `${fileUrl}`
             }];


        //Custom alias for Branch.io
        let customer_event_alias = `User submitted for category ${Number(selectedCategory.id)}`

        //Logging all data taken by Branch.io to be sent through the API
        console.log('Inside the Branch event logger, data:', event_and_custom_data, content_items, customer_event_alias);

        //Sends a User lifecycle event to Branch, with the data above. If the error throws a Null, thats a good sign!
        branch.logEvent(
            "COMPLETE_REGISTRATION",
            event_and_custom_data,
            content_items,
            customer_event_alias,
            function(err){console.log(err);}
        );

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
        display: 'inline-block',
        backgroundImage: 'url(./upload-background-image.png)',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }

    const handleFinishedUpload = async info => {
        await setFileUrl(info.fileUrl);
        await setDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }

    const s3Url = `http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com`;
    const uploadOptions = {}

    const onUploadProgress = (percent) => { 
        setUploadPercentage(percent);
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
                                <select 
                                    id="category" 
                                    name="category" 
                                    placeholder="Category Name" 
                                    className="selectInput" 
                                    value={selectedCategory.id}
                                    onChange={e => dispatch({
                                        type: 'SET_DESCRIPTION',
                                        // payload is my new category (aka "description")
                                        payload: {
                                            id: e.target.value
                                        }
                                    })} 
                                    required
                                >
                                    <option value='' selected disabled>Choose a Category</option>
                                    {categories.map(category =>
                                        <option value={category.id}>{category.title}</option>
                                    )}
                                </select>

                                {/* Checkmark */}
                                {selectedCategory.id === undefined ?
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
                                <label for="fullName" className="inputDesc" onClick={() => setFullName('Ethan Kavanagh')}>*your full name</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    value={fullName}
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
                                <label for="email" className="inputDesc" onClick={() => setEmail('ethanmkavanagh@gmail.com')}>*your email address</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    value={email}
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
                                <label for="email" className="inputDesc" onClick={() => setInstagram('@ethankavanagh')}>what's your Instagram @</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    value={instagram}
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
                                <label for="linkedin" className="inputDesc" onClick={() => setLinkedIn('https://www.linkedin.com/in/ethan-kavanagh-4372311b7/')}>link to your Linkedin profile</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    value={linkedIn}
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
                                <label for="twitter" className="inputDesc" onClick={() => setTwitter('@ethankavanagh')}>your Twitter</label>
                            </Grid>
                            <Grid item>
                                <input
                                    type="text"
                                    className="input"
                                    value={twitter}
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
                                <label for="comments" className="inputDesc" onClick={() => setComments('I think this talk is awesome, and I hope you enjoy it!')}>comments</label>
                            </Grid>
                            <Grid item>
                                <textarea
                                    type="text"
                                    rows="3"
                                    cols="23"
                                    className="textbox"
                                    value={comments}
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
                                        onProgress={onUploadProgress}
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

                        <LinearProgress
                            className={classes.progressBar}
                            variant="determinate"
                            value={uploadPercentage} 
                        />

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