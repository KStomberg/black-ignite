import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Fetches all submissions from DB
function* fetchSubmission(action) {
    
    try {
        let response = yield axios.get('/api/submission');
    
        yield put({ type: 'SET_SUBMISSION', payload: response.data });
    } catch (error) {
        console.log('Submission GET request error', error);
    }
}

function* jurorPageSaga() {
    yield takeLatest('FETCH_SUBMISSION', fetchSubmission)
}

export default jurorPageSaga;