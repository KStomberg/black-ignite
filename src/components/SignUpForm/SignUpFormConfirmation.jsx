import React from 'react';
import { useHistory } from 'react-router-dom';
import {Grid, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import './SignUpFormConfirmation.css'

const useStyles = makeStyles({
    Grid: {
        height: '100vh'
    },
    iconBtn: {
        width: 70,
        height: 70
    },
    icon: {
        color: '#00acee',
        width: 50,
        height: 50
    }
});

function SignUpFormConformation() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.Grid}
        >
            <Grid item>
                <Grid
                    container
                    direction="rows"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <button className="xBtn" onClick={() => history.push('/')}>✖</button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <h2 className="title1">Thank you!</h2>
            </Grid>
            
            <Grid item>
                <p className="p">
                    We'll email you the official submission form within 72 hours.
                </p>
            </Grid>

            <Grid item>
                <h2 className="title2">Tweet this:</h2>
            </Grid>
            <Grid item>
                <p className="tweetp">
                    I just signed up to speak at @black_ignite!
                    Join me as a speaker at speak.blackignite.com
                </p>
            </Grid>
            
            <a
                class="twitter-share-button"
                onClick={() => window.open("https://twitter.com/intent/tweet?text=I%20just%20signed%20up%20to%20speak%20at%20@black_ignite!%20Join%20me%20as%20a%20speaker%20at%20speak.blackignite.com")}
            >
                <IconButton className={classes.iconBtn}>
                    <TwitterIcon className={classes.icon} />
                </IconButton>
            </a>

            <p className="p2">
                Watch past talk on the
            </p>
            <a className="p3" onClick={() => window.open("https://www.youtube.com/channel/UCfbaeaddxBcxB37c0NvqzPg")}>
                Black Ignite YouTube
            </a>
        </Grid>
    );
}

export default SignUpFormConformation;