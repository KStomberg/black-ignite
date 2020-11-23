import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* putCategory(action) {
    
  try {
    let response = yield axios.put('/api/talks/edit', action.payload);
    
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('PUT request failed', error);
  }
}


function* putCategorySaga() {
  yield takeLatest('EDIT_CATEGORY', putCategory);
}

export default putCategorySaga;