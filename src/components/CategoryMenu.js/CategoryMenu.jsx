import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';

class CategoryMenu extends Component{
    state= {open: false,
            anchorEl: null,
    }
    componentDidMount() {
        // this.getTalk();
      }

      getTalk = () => {
        console.log('Fetching talks');
           this.props.dispatch({
            type: 'FETCH_ALL_TALKS'
        })
    }
      
    toggleMenu = () => {

        this.setState({
            open: !this.state.open,
            anchorEl: null
        }) 
    }

    sendTalk = (talk) => {
      let categoryIdToSend = {
        talkId: talk.id
      }
      console.log(`categoryId`, categoryIdToSend)
        this.setState({
            open: !this.state.open,
            anchorEl: null
        }) 
        this.props.dispatch({
          type: 'FETCH_CATEGORY_RANKINGS',
          payload: categoryIdToSend
      })
    }
    getAllRankings = () => {
      this.setState({
        open: !this.state.open,
        anchorEl: null
    });
      this.props.dispatch({
        type: 'FETCH_ALL_RANKINGS'
    })
    }
    render() {
      console.log(this.props, this.state)
        return (
            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.toggleMenu}>

                All the Categories▾

              </Button>
              <Menu
                id="simple-menu"
                keepMounted
                open={this.state.open}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={this.toggleMenu}
              >
                {this.props.store.talks.map((talk) => (

            <MenuItem key={talk.id} id={talk.id} onClick={() => this.sendTalk(talk)}>

                {talk.title} </MenuItem>
                ))}
                <MenuItem onClick={this.getAllRankings} >All Talks</MenuItem>
              </Menu>
            </div>
          );
    }
}

export default connect(mapStoreToProps)(CategoryMenu);


