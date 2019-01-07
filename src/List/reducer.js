/**
 * This module receives redux actions and responses with action handlers
 */
import {normalize, schema} from 'normalizr';
import {async, sync} from './actions';

const {
  FETCH_SOME_ASYNC,
  FETCH_SOME_ASYNC_SUCCESS,
  FETCH_SOME_ASYNC_FAILURE,

  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} = async;

const {
  ON_CHANGE,
} = sync;

/**
 * Initial state value of react store
 */
const initialState = {
  isLoading: false,
  count: 1,
  list: {
    data: [],
  },
};

/**
 * [fetchData description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function fetchData(state, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_SUCCESS: {
      const list = action.payload.data;
      const myData = {list};
      const user = new schema.Entity('list');
      const mySchema = {list: [user]};
      return {
        ...state,
        data: normalize(myData, mySchema),
        isLoading: false,
      };
    }
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

/**
 * [ageChange description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function ageChange(state, action) {
  const {id, value} = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      entities: {
        ...state.data.entities,
        list: {
         ...state.data.entities.list,
         [id]: {
            ...state.data.entities.list[id],
            age: value,
          },
        },
      },
    },
  };
}

/**
 * Reducer function manipulates home leaf node of redux store
 * @param {Object} state - Previous leaf node of redux store
 * @param {Object} action - Redux action
 * @param {string} action.type - Redux action name
 * @return {Object}
 */
export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_SOME_ASYNC:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SOME_ASYNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: state.count + 1,
      };
    case FETCH_SOME_ASYNC_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_DATA:
    case FETCH_DATA_SUCCESS:
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        list: fetchData(state.list, action),
      };
    case ON_CHANGE:
      return {
        ...state,
        list: ageChange(state.list, action),
      };
    default:
      return state;
  }
}
