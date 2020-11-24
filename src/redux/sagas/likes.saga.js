import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* likesSaga() {
  yield takeLatest('FETCH_LIKES', fetchLikes);
  yield takeLatest('FETCH_MAX_LIKES', fetchMaxLikesSaga);
  yield takeLatest('UPDATE_LIKES', updateLikes);
}

//Fetches likes DB to see all likes a user has made, and on what submission
function* fetchLikes() {
  
  try {
    let response = yield axios.get(`/api/likes/`);

    yield put({
      type: 'SET_LIKES',
      payload: response.data,
    });
  } catch (err) {
    console.error('ERROR in fetchLikes saga:', err);
  }
}

//Fetches maximum likes a user can have
function* fetchMaxLikesSaga() {
  
  try {
    let response = yield axios.get(`/api/likes/max/`);

    yield put({
      type: 'SET_MAX_LIKES',
      payload: response.data,
    });
  } catch (err) {
    console.error('ERROR in fetchMaxLikes saga:', err);
  }
}

//Adds a like to the submission, subtracts a like from the users max likes
function* updateLikes(action) {
 
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


export default likesSaga;
