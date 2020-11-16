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
    const categories = useSelector(state => state.categories);
    const description = useSelector(state => state.description);

    useEffect(() => {
        dispatch({type: 'FETCH_ALL_CATEGORIES'});
    }, []);

    const getDescription = (id) => {
        dispatch({type: 'FETCH_DESCRIPTION', payload: id});
        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

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
                                    {/* <img src={submission.description_url} width="200px"/> */}

                                    {console.log('description is:', description)}
                                    {description.map(desc =>
                                        <h1>{desc.description_url}</h1>
                                    )}
                                    {/* <h1>{description.description_url}</h1> */}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className={classes.dialogContent}>
                                <Button onClick={handleClose} color="primary">
                                    sign up to speak
                                </Button>
                            </DialogActions>
                        </Dialog>
            </div>

            <Drawer />
        </div>
    );
}

export default Homepage;