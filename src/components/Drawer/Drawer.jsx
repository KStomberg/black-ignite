import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Drawer.css'
const useStyles = makeStyles({
    list: {
        width: 250,
        backgroundColor: '#F1BA45'
    },
    fullList: {
        width: 'auto',
    },
    btn: {
        borderRadius: 100,
    },
    cancelBtn: {
        fontSize: 35,
        marginRight: 250,
        paddingTop: 10,
        right: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
        border: 'none',
    }
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
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
                    <Button onClick={toggleDrawer(anchor, true)} className={classes.btn} id="drawer-btn">+</Button>
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
