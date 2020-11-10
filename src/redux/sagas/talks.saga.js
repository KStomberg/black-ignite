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


function* talksSaga() {
  yield takeLatest('FETCH_ALL_TALKS', fetchTalks);
}

export default talksSaga;