import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Button, List, SwipeableDrawer, IconButton} from '@material-ui/core';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Drawer.css'
const useStyles = makeStyles({
    list: {
        width: 250,
        backgroundColor: '#EDAC3A'
    },
    fullList: {
        width: 'auto',
        backgroundColor: '#EDAC3A'
    },
    btn: {
        display: 'flex',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    iconBtn: {
        marginTop: 5,
        color: '#EDAC3A',
        backgroundColor: '#221F1F'
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
    }
});

// See Swipeable-Drawer from Material-UI at https://material-ui.com/components/drawers/
export default function SwipeableTemporaryDrawer({openDrawer, setOpenDrawer}) {
    const classes = useStyles();


    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    
    return (
        <div className={classes.drawer}>
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
    );
}
