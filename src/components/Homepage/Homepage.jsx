import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import {IconButton, Zoom, DialogContentText, DialogContent, DialogActions, Dialog, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './Homepage.css';

const useStyles = makeStyles({
    iconBtn: {
        color: 'white'
    },
    btn: {
        backgroundColor: '#221F1F',
        width: 30,
        height: 30,
        margin: 2
    },
    dialog: {
        opacity: 0.5,
    },
    dialogContent: {
        opacity: 1,
        backgroundColor: '#EDAC3A',
        border: 5
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="in" ref={ref} {...props} />;
});

function Homepage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState({});
    const [submissions, setSubmissions] = useState([
        "/mixed_in_america.png", "/city.png", "/allies.png", "/college.png", "/police.png", "/moms.png", 
        "/justice_system.png", "/voting.png", "/restin_power.png"
    ]);
    // const [descriptions, setDescriptions] = useState([
    //     "/mixed_in_america_description.png", "/city_description.png", "/allies_description.png", "/college_description.png", "/police_description.png", "/moms_description.png",
    //     "/justice_system_description.png", "/voting_description.png", "/restin_power_description.png"
    // ]);

    // USE THIS WHEN USING SQL AND AWS //
    // const submissions = useSelector(state => state.talks)
    // useEffect(() => {
    //     dispatch({type: 'FETCH_ALL_TALKS'});
    // });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    // const getDescription = (id) => {
    //     dispatch({type: 'FETCH_DESCRIPTION', payload: id});
    // }

    return (
        <div className="homepage">
            <img src="/circle_logo.png" alt="companyLogo" width="80px"/>
            <h1 className="title">Speak at Black Ignite!</h1>
            <span className="website" onClick={() => window.open("https://blackignite.com/")}>blackignite.com</span>
            <IconButton className={classes.btn} onClick={() => window.open("https://www.instagram.com/black.ignite/?hl=en")}>
                <InstagramIcon className={classes.iconBtn} />
            </IconButton>
            <IconButton className={classes.btn} onClick={() => window.open("https://www.youtube.com/channel/UCfbaeaddxBcxB37c0NvqzPg")}>
                <YouTubeIcon className={classes.iconBtn} />
            </IconButton>
            <IconButton className={classes.btn} onClick={() => window.open("https://www.linkedin.com/company/blackignite/")}>
                <LinkedInIcon className={classes.iconBtn} />
            </IconButton>

            <div>
                {submissions.map(submission =>
                    <span>
                        <Link key={submission.id} /* onClick={() => getDescription(submission.id)} */ onClick={handleClickOpen}>
                            <img src={submission} /* src={submission.image_url} */ width="200px" className="talkImg" alt={submission.title} />
                        </Link>
                        
                        {/* 
                            See Material-UI Zoom Transition: https://material-ui.com/components/transitions/ 
                            See Material-UI Transition Dialog: https://material-ui.com/components/dialogs/
                        */}
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            className={classes.dialog}
                        >
                            <DialogContent className={classes.dialogContent}>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <img src={submission} width="200px"/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className={classes.dialogContent}>
                                <Button onClick={handleClose} color="primary">
                                    sign up to speak
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </span>
                )}
            </div>

            <Drawer />
        </div>
    );
}

export default Homepage;