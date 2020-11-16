import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postCategory(action) {
    console.log(`in our postCategory saga`, action.payload);
  try {
    let response = yield axios.post('/api/category', action.payload);
    console.log(response);
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('poster POST request failed', error);
  }
}


function* postCategorySaga() {
  yield takeLatest('POST_CATEGORY', postCategory);
}

export default postCategorySaga;