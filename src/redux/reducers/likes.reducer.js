const likesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MAX_LIKES':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default likesReducer;