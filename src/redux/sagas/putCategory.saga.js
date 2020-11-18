import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* putCategory(action) {
    console.log(`in our putCategory saga`, action.payload);
  try {
    let response = yield axios.put('/api/talks/edit', action.payload);
    console.log(response);
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('PUT request failed', error);
  }
}


function* putCategorySaga() {
  yield takeLatest('EDIT_CATEGORY', putCategory);
}

export default putCategorySaga;