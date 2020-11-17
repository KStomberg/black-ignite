import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRankings(action) {
    console.log(`in our fetchRankings saga`);
  try {
    let response = yield axios.get(`/api/ranking/${action.payload}`);
    console.log(response);
    yield put({ type: 'SET_RANKINGS', payload: response.data});
  } catch (error) {
    console.log('Rankings GET request failed', error);
  }
}

function* rankingsSaga() {
  yield takeLatest('FETCH_ALL_RANKINGS', fetchRankings);
}

export default rankingsSaga;