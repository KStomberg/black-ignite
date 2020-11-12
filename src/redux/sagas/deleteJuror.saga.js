import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteJuror(action){
    console.log('in deleteJuror', action.payload);
    let id = action.payload.id;
    yield axios.delete(`/api/delete/${id}`);

    yield put({type: 'FETCH_USERS'});
}

function* deleterSaga() {
    yield takeLatest('DELETE_JUROR', deleteJuror);
  }
  
  export default deleterSaga;