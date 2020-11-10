import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TalkDisplay from './TalkDisplay';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditCategory extends Component {
  state = {
    heading: 'Edit Category',
  };
componentDidMount() {
    this.props.dispatch({
        type: 'FETCH_ALL_TALKS'
    })
}
  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <TalkDisplay />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditCategory);
