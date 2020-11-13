import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    menu: {
        "& .MuiPaper-root": {
          backgroundColor: "#010101"
        }
    },
    
    menuItem: {
        color: '#fff',
        backgroundColor: '#010101',
        '&:hover': {
            backgroundColor: '#010101'
        }
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
    }
  
  }));
export default function SimpleMenu() {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
       <MenuIcon
       aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        
        <Link to="/managejuror" className={classes.link}>
            <MenuItem onClick={handleClose}
            className={classes.menuItem}>Manage Juror</MenuItem>
        </Link>
        <Link to="/edittalk" className={classes.link} >
            <MenuItem className={classes.menuItem}>Add Catergory</MenuItem>
            </Link >
            <MenuItem onClick={handleClose}
        className={classes.menuItem}>Submissions</MenuItem>
      </Menu>
    </div>
  );
}