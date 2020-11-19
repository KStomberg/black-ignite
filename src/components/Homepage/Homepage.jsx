import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import {IconButton, Zoom, DialogContentText, DialogContent, DialogActions, Dialog, Grid} from '@material-ui/core';
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
    dialogContent: {
        opacity: 1,
        backgroundColor: '#EDAC3A',
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="in" ref={ref} {...props} />;
});

function Homepage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const categories = useSelector(state => state.categories);
    const desc = useSelector(state => state.description);
    const [openDrawer, setOpenDrawer] = useState(false);


    useEffect(() => {
        dispatch({type: 'FETCH_ALL_CATEGORIES'});
    }, []);

    const getDescription = (id) => {
        dispatch({type: 'FETCH_DESCRIPTION', payload: id});
        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    }
    
    const handleCloseSignUp = () => {
        setOpenDialog(false);
        setOpenDrawer(true);
    };

    return (
        <div className="homepage">
            <img src="/circle_logo.png" alt="companyLogo" width="80px"/>
            <h1 className="homepageTitle">Speak at Black Ignite!</h1>
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
                {categories.map(category =>
                    <span>
                        <Link key={category.id} onClick={() => getDescription(category.id)}>
                            <img src={category.image_url} width="200px" className="talkImg" alt={category.title} />
                        </Link>
                    </span>
                )}

                {/* 
                    See Material-UI Zoom Transition: https://material-ui.com/components/transitions/ 
                    See Material-UI Transition Dialog: https://material-ui.com/components/dialogs/
                */}
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className={classes.dialog}
                >
                    <div className="dialog">
                        <DialogContent className={classes.dialogContent}>
                            <DialogContentText id="alert-dialog-slide-description">
                                    <Grid
                                        container
                                        direction="column"
                                        // justify="center"
                                        // alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                // justify="space-between"
                                                alignItems="flex-start"
                                            >
                                                <Grid item>
                                                    <h1 className="descTitle">{desc.title}!</h1>
                                                </Grid>
                                                <Grid item>
                                                    <button onClick={handleClose}>✖</button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                // alignItems="flex-start"
                                            >
                                                <Grid item>
                                                    <img src={desc.description_url} className="descImg"/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <p >
                                                ---------------------------
                                            </p>
                                        </Grid>
                                        <Grid item>
                                            <p >
                                                Sign up to speak and we'll send you a short questionaire within 72 hours.
                                                To promote we'll need a headshot and brief bio.
                                            </p>
                                        </Grid>
                                    </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className={classes.dialogContent}>
                            <button 
                                onClick={handleCloseSignUp}
                                className="btn"
                            >
                                sign up to speak
                            </button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>

            <div className="drawerDiv">
                <Drawer
                    openDrawer={openDrawer} 
                    setOpenDrawer={setOpenDrawer}
                />
                <p className="drawerP">Sign Up</p>
            </div>
        </div>
    );
}

export default Homepage;