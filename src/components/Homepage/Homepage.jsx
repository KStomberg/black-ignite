import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Drawer from '../Drawer/Drawer';
import {IconButton} from '@material-ui/core';
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
        backgroundColor: 'black',
        width: 30,
        height: 30,
        margin: 2
    }
});

function Homepage() {
    const classes = useStyles();
    const dispatch = useDispatch();
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
                    <img src={submission} /* src={submission.image_url} */ width="200px" className="talkImg" alt={submission.title} />
                )}
            </div>

            <Drawer />
        </div>
    );
}

export default Homepage;