import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSubmission(action) {
    console.log('in our fetchSubmission saga');
    try {
        let response = yield axios.get('/api/submission');
        console.log(response);
        yield put({ type: 'SET_SUBMISSION', payload: response.data });
    } catch (error) {
        console.log('Submission GET request error', error);
    }
}

function* jurorPageSaga() {
    yield takeLatest('FETCH_SUBMISSION', fetchSubmission)
}

export default jurorPageSaga;