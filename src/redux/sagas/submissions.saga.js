import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submissionsSaga() {
    yield takeLatest('CREATE_SUBMISSION', createSubmission);
    yield takeLatest('FETCH_SUBMISSIONS', fetchSubmissions);
    yield takeLatest('FETCH_DESCRIPTION', fetchDescription);
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
    } catch (err) {
        console.error('ERROR in submissions saga:', err);
    }
}

function* fetchDescription(action) {
    try {
        let res = yield axios({
            method: 'GET',
            url: `/api/submissions/${action.id}`
        });

        yield put({
            type: 'SET_DESCRIPTION',
            payload: res.data
        });
    } catch (err) {
        console.error('ERROR in submissions saga:', err);
    }
}

export default submissionsSaga;