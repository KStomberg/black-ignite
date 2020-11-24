import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, SwipeableDrawer, IconButton} from '@material-ui/core';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Drawer.css';

const useStyles = makeStyles({
    btn: {
        display: 'flex',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    cancelBtn: {
        fontSize: 35,
        paddingTop: 10,
        paddingRight: 30,
        top: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
        border: 'none',
    },
    drawer: {
        backgroundColor: '#EDAC3A'
    },
    fullList: {
        width: 'auto',
        backgroundColor: '#EDAC3A'
    },
    iconBtn: {
        marginTop: 5,
        color: '#EDAC3A',
        backgroundColor: '#221F1F',
        '&:hover': {
            color: '#EDAC3A',
            backgroundColor: '#221F1F',
            transform: 'scale(1.1)'
        }
    },
    list: {
        width: 250,
        backgroundColor: '#EDAC3A'
    },
    swipeableDrawer: {
        backgroundImage: 'linear-gradient(bottom, #EDAC3A 50%, #ffffff 50%)'
    }
});

// See Swipeable-Drawer from Material-UI at https://material-ui.com/components/drawers/
export default function SwipeableTemporaryDrawer({openDrawer, setOpenDrawer}) {
    const classes = useStyles();

    // Toggling drawer open/close
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    
    return (
        <div className={classes.drawer}>
            <div className={classes.swipeableDrawer}>
            <IconButton className={classes.iconBtn}>
                <h1 onClick={toggleDrawer} className={classes.btn}>+</h1>
            </IconButton>
            <SwipeableDrawer
                anchor='bottom'
                open={openDrawer}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                <div className={classes.drawer}>
                    <Button onClick={toggleDrawer} className={classes.cancelBtn}>✖</Button>
                    <SignUpForm />
                </div>
            </SwipeableDrawer>
            </div>
        </div>
    );
}
