import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTalks() {
    console.log(`in our fetchTalks saga`);
  try {
    let response = yield axios.get('/api/talks');
    console.log(response);
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('Talks GET request failed', error);
  }
}

function* fetchCategory(action) {
  console.log(`in our fetchCategory saga`, action.payload.talkId);
try {
  let response = yield axios.get(`/api/talks/${action.payload.talkId}`);
  console.log(response);
  yield put({ type: 'SET_TALK', payload: response.data});
} catch (error) {
  console.log('Talks GET request failed', error);
}
}

function* talksSaga() {
  yield takeLatest('FETCH_ALL_TALKS', fetchTalks);
  yield takeLatest('FETCH_ONE_CATEGORY', fetchCategory);
}

export default talksSaga;