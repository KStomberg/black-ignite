import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../Menu/Menu';
import './AppBar.css'
const useStyles = makeStyles((theme) => ({
   
    appbar: {
      backgroundColor: '#221F1F',
      width: '100%',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      display: 'flex',
      flexWrap: 'wrap'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <div id="logoDiv">
              <img src="./circle_logo.png" className={"logo"}/>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }