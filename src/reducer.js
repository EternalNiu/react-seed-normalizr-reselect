/**
 * This module composes root reducer including react-router
 * @requires redux
 */
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

/**
 * App reducer maintain states to be shared across modules
 * @param  {Object} state - Previous leaf node of redux store
 * @param  {string} state.cityCode - City code, hangzhou => 330100
 * @param  {Object} action - Redux action
 * @return {Object}
 */
const app = (state={city: 330100}, action) => {
  return state;
};

/**
 * This is a create reducer function
 * It returns current permanent and asynchronously loaded reducers
 * @param  {Object} history
 * @param  {Function} asyncReducers - asynchronously loaded recuders.
 * @return {Object} - root reducer.
 */
export default function createReducer(history, asyncReducers) {
  /**
   * Return root reducer
   * Name of each leaf store should match Page Name or Functionality Name
   */
  return combineReducers({
    // Permanent redux reducers
    router: connectRouter(history),
    app,
    // Aync reducers
    ...asyncReducers,
  });
}
