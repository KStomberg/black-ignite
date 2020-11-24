import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Deletes juror from DB
function* deleteJuror(action){
  
    let id = action.payload.id;
    yield axios.delete(`/api/delete/${id}`);

    yield put({type: 'FETCH_USERS'});
}

function* deleterSaga() {
    yield takeLatest('DELETE_JUROR', deleteJuror);
  }
  
  export default deleterSaga;