import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* likesSaga() {
  yield takeLatest('FETCH_LIKES', fetchLikes);
}

function* fetchLikes(action) {
  console.log('in fetch likes saga');
  try {
    let response = yield axios.get(`/api/submissions/likes/get/`);

    yield put({
      type: 'SET_LIKES',
      payload: response.data,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}

export default likesSaga;
