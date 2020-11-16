import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

class CategoryMenu extends Component{
    state= {open: false,
            anchorEl: null
    }

    componentDidMount() {
        this.getTalk();
      }
    
      getTalk = () => {
        console.log('Fetching talks');
        this.props.dispatch({
            type: 'FETCH_ALL_TALKS'
          });
    }
      
    toggleMenu = () => {
        this.setState({
            open: !this.state.open,
            anchorEl: null
        }) 
    }
    render() {
        return (
            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.toggleMenu}>
                Categories
              </Button>
              <Menu
                id="simple-menu"
                keepMounted
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={this.toggleMenu}
              >
                {this.props.store.talks.map((talk) => (
            <MenuItem key={talk.id} id={talk.id} onClick={this.toggleMenu}>
                {talk.title} </MenuItem>
                ))}
              </Menu>
            </div>
          );
    }
}

export default connect(mapStoreToProps)(CategoryMenu);












// import React,{useEffect} from 'react';
// import Button from '@material-ui/core/Button';
// import mapStoreToProps from '../../redux/mapStoreToProps';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import { connect } from 'react-redux';
// import {useDispatch} from 'react-redux';


// function SimpleMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch({type: 'FETCH_ALL_TALKS'});
// });
//   return (
//     <div>
//       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Categories Topics
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         {talks.map((talk) => (
//             <MenuItem key={talk.id} id={talk.id} topicId={talk.id} title={talk.title} >
//                 {talk.title}
//             </MenuItem>
//           ))}
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }

// export default connect(mapStoreToProps)(SimpleMenu);
