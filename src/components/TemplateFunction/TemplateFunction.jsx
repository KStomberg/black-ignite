import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function FunctionTemplate() {
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
        </div>
    );
}

export default FunctionTemplate;