/**
 * This module exports saga
 */
import {put, takeEvery} from 'redux-saga/effects';
import {async} from './actions';

const {
  FETCH_SOME_ASYNC,
  fetchSomeAsyncSuccess,
  fetchSomeAsyncFailure,

  FETCH_DATA,
  fetchDataSuccess,
  fetchDataFailure,
} = async;

/**
 * @param  {object} options
 * @yield {Action}
 */
export function* mockFetch() {
  try {
    yield new Promise((resolve) => {
      return setTimeout(() => {
        resolve();
      }, 1000);
    });

    // Fire success action
    yield put(fetchSomeAsyncSuccess());
  } catch (err) {
    // Fire failure action
    yield put(fetchSomeAsyncFailure(err));
  }
}

/**
 * @param  {object} options
 * @yield {Action}
 */
export function* fetchData() {
  try {
  const response = {
    data: [{
      id: 0,
      name: '张三',
      age: 20,
    }, {
      id: 1,
      name: '李四',
      age: 21,
    }, {
      id: 2,
      name: '王麻子',
      age: 22,
    }, {
      id: 3,
      name: '王二',
      age: 23,
    }, {
      id: 4,
      name: '赵五',
      age: 24,
    }],
  };
    // const response = {
    //   users: [{
    //     id: 1,
    //   }, {
    //     id: 2,
    //   }],
    // };

    // Fire success action
    yield put(fetchDataSuccess(response));
  } catch (err) {
    // Fire failure action
    yield put(fetchDataFailure(err));
  }
}

/**
 * Watch api request
 */
export default function* () {
  yield takeEvery(FETCH_SOME_ASYNC, mockFetch);
  yield takeEvery(FETCH_DATA, fetchData);
}
