import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    likes: 30,
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        likes: this.state.likes,
      },
    });
    this.props.dispatch({
      type: 'FETCH_USERS',
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  reloadPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Add A Juror</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="votes">
          # of Votes:
            <input
              type="number"
              name="votes"
              placeholder="Please enter # of votes"
              value={this.state.likes}
              required
              onChange={this.handleInputChangeFor('likes')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" onClick={this.reloadPage}/>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
