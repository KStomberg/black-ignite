import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import Menu from '../Menu/Menu';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    app: {
      backgroundColor: '#010101',
      width: '100%',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
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
        <AppBar position="static" className={classes.app}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }