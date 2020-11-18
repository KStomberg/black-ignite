import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submissionsSaga() {
  yield takeLatest('CREATE_SUBMISSION', createSubmission);
  yield takeLatest('FETCH_SUBMISSIONS', fetchSubmissions);
  yield takeLatest('FETCH_DESCRIPTION', fetchDescription);
  yield takeLatest('UPDATE_FORM_STATUS', updateFormStatus);
  yield takeLatest('UPDATE_LIKES', updateLikes);
  yield takeLatest('FETCH_ALL_CATEGORIES', fetchAllCategories);
}

function* fetchAllCategories(action) {
  try {
    let res = yield axios.get('/api/talks/unauthenticated');

    yield put({
      type: 'SET_CATEGORIES',
      payload: res.data,
    });
  } catch (err) {
    console.error('ERROR in submissions sage', err);
  }
}

function* fetchSubmissions(action) {
  try {
    let response = yield axios.get('/api/submissions');

    yield put({
      type: 'SET_SUBMISSIONS',
      payload: response.data,
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
      data: action.payload,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}

function* fetchDescription(action) {
  try {
    console.log('action.payload is:', action.payload);
    let res = yield axios({
      method: 'GET',
      url: `/api/talks/unauthenticated/${action.payload}`,
    });

    console.log('res.data:', res.data);
    yield put({
      type: 'SET_DESCRIPTION',
      payload: res.data,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}

function* updateFormStatus(action) {
  console.log('action.payload of updateFormStatus', action.payload);
  try {
    yield axios({
      method: 'PUT',
      url: `/api/submissions/${action.payload}`,
    });

    yield put({
      type: 'FETCH_SUBMISSIONS',
    });
  } catch (err) {
    console.error('ERROR in updateFormStatus saga:', err);
  }
}

function* updateLikes(action) {
  console.log('action.payload of updateLikes', action.payload);
  try {
    yield axios({
      method: 'PUT',
      url: `/api/submissions/likes/${action.payload}`,
    });

    yield put({
      method: 'PUT',
      type: 'FETCH_SUBMISSIONS',
    });
  } catch (err) {
    console.error('ERROR in updateLikes saga:', err);
  }
}

export default submissionsSaga;
