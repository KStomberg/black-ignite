import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Drawer from '../Drawer/Drawer';
function Homepage() {
    const dispatch = useDispatch();

    // Example of Dispatch
    const functionName = () => {
        dispatch({type: 'functionName'});
    }

    // Example of using State in Hooks
    const variable = useSelector(state => state.variable);

    return (
        <div>
            <h1>State is: {variable}</h1>
            <Drawer />
        </div>
    );
}

export default Homepage;