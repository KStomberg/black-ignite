import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submissionsSaga() {
  yield takeLatest('CREATE_SUBMISSION', createSubmission);
  yield takeLatest('FETCH_SUBMISSIONS', fetchSubmissions);
  yield takeLatest('FETCH_DESCRIPTION', fetchDescription);
  yield takeLatest('UPDATE_FORM_STATUS', updateFormStatus);
  yield takeLatest('FETCH_ALL_CATEGORIES', fetchAllCategories);
}
//fetch all categories from DB
function* fetchAllCategories() {
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
//fetch all submissions from DB
function* fetchSubmissions() {
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
//POST new submission to DB
function* createSubmission(action) {
  try {
   
    yield axios({
      method: 'POST',
      url: '/api/submissions',
      data: action.payload,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}
//fetch the dropdown stuff
function* fetchDescription(action) {
  try {
    
    let res = yield axios({
      method: 'GET',
      url: `/api/talks/unauthenticated/${action.payload}`,
    });
    yield put({
      type: 'SET_DESCRIPTION',
      payload: res.data,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}

function* updateFormStatus(action) {
 
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

export default submissionsSaga;
