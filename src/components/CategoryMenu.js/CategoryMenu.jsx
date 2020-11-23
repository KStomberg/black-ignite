import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import './CategoryMenu.css';

class CategoryMenu extends Component{
  state= {
    open: false,
    anchorEl: null      
  }

  componentDidMount = () => {
    this.getTalk();
  }

  getAllRankings = () => {
    this.setState({
      open: !this.state.open,
      anchorEl: null
    });
    this.props.dispatch({
      type: 'FETCH_ALL_RANKINGS'
    });
  }

  getTalk = () => {
    this.props.dispatch({
      type: 'FETCH_ALL_TALKS'
    });

    this.setState({
      open: !this.state.open,
      anchorEl: null
    });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  sendTalk = (talk) => {
    let categoryIdToSend = {
      talkId: talk.id
    }
    this.setState({
      open: !this.state.open,
      anchorEl: null
    });
    this.props.dispatch({
      type: 'FETCH_CATEGORY_RANKINGS',
      payload: categoryIdToSend
    });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h2 className="likes">Votes</h2>
          <Button className="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          Categories▾
          </Button>
        </div>
        <Menu
          id="simple-menu"
          keepMounted
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
        >
          {this.props.store.talks.map((talk) => (
            <MenuItem key={talk.id} id={talk.id} onClick={() => this.sendTalk(talk)}>
              {talk.title}
            </MenuItem>
          ))}
          <MenuItem onClick={this.getAllRankings} >All Categories</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CategoryMenu);