import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* likesSaga() {
  yield takeLatest('FETCH_LIKES', fetchLikes);
  yield takeLatest('UPDATE_LIKES', updateLikes);
  // yield takeLatest('UPDATE_LIKES', updateLikes);
}

function* fetchLikes(action) {
  console.log('in fetch likes saga');
  try {
    let response = yield axios.get(`/api/likes/`);

    yield put({
      type: 'SET_LIKES',
      payload: response.data,
    });
  } catch (err) {
    console.error('ERROR in submissions saga:', err);
  }
}

function* updateLikes(action) {
  console.log('action.payload of updateLikes');
  try {
    yield axios({
      method: 'PUT',
      url: `/api/likes/${action.payload}`,
    });

    yield put({
      method: 'PUT',
      type: 'FETCH_SUBMISSIONS',
    });
  } catch (err) {
    console.error('ERROR in updateLikes saga:', err);
  }
}


// function* fetchMaxAllowedLikes(action) {
//   console.log('in fetch max allowed likes saga');
//   try{
//     let response = yield axios.get(`/api/userlikes`)
//   }
// }

export default likesSaga;
