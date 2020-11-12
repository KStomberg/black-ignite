import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submissionsSaga() {
    yield takeLatest('CREATE_SUBMISSION', createSubmission);
    yield takeLatest('FETCH_SUBMISSIONS', fetchSubmissions);
}

function* fetchSubmissions(action) {
    try {
        let response = yield axios.get('/api/submissions');

        yield put({
            type: 'SET_SUBMISSIONS',
            payload: response.data
        });
    } catch (err) {
        console.error('ERROR in submissions saga:', err);
    }
}

function* createSubmission(action) {
    try {
        console.log('action:', action);
        yield axios({
            method: 'POST',
            url: '/api/submissions',
            data: action.payload
        });

        yield put({
            type: 'FETCH_SUBMISSIONS'
        });
    } catch (err) {
        console.error('ERROR in submissions saga:', err);
    }
}

export default submissionsSaga;