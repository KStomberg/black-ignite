import React, {useState} from 'react';
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
export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = useState({
        bottom: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'bottom',
          })}
          role="presentation"
        >
          <List>
            <Button onClick={toggleDrawer(anchor, false)} className={classes.cancelBtn}>✖</Button>
            <SignUpForm />
          </List>
        </div>
      );
    
    return (
        <div className={classes.drawer}>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton className={classes.iconBtn}>
                        <h1 onClick={toggleDrawer(anchor, true)} className={classes.btn}>+</h1>
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
