const jurorPageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUBMISSION':
            return action.payload;
        default:
            return state;
    }
};

export default jurorPageReducer;