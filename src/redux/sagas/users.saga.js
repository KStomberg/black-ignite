import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUsers() {
  //function to grab all users who have JUROR level clearance
    console.log(`in our fetchUsers saga`);
  try {
    let response = yield axios.get('/api/users');

    yield put({ type: 'SET_USERS', payload: response.data});
  } catch (error) {
    console.log('Users GET request failed', error);
  }
}


function* usersSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers);
}

export default usersSaga;