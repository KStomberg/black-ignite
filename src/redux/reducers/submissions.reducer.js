const submissionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return action.payload;
    case 'SET_DESCRIPTION':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default submissionsReducer;
