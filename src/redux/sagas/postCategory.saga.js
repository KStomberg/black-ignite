import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postCategory(action) {
    
  try {
    let response = yield axios.post('/api/category', action.payload);
   
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('poster POST request failed', error);
  }
}


function* postCategorySaga() {
  yield takeLatest('POST_CATEGORY', postCategory);
}

export default postCategorySaga;