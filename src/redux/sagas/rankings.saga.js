import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRanking(action) {
   
  try {
    let response = yield axios.post('/api/ranking', action.payload);
    
    yield put({ type: 'SET_RANKINGS', payload: response.data});
  } catch (error) {
    console.log('Rankings GET request failed', error);
  }
}

function* fetchRankings() {
  
try {
  let response = yield axios.get('/api/ranking');
  
  yield put({ type: 'SET_RANKINGS', payload: response.data});
} catch (error) {
  console.log('Rankings GET request failed', error);
}
}


function* rankingsSaga() {
 yield takeLatest('FETCH_CATEGORY_RANKINGS', fetchRanking);
  yield takeLatest('FETCH_ALL_RANKINGS', fetchRankings);
}

export default rankingsSaga;