/* eslint-disable require-jsdoc */
import {createSelector} from 'reselect';
import {denormalize, schema} from 'normalizr';

export const listSelector = createSelector(
 (state) => state.list.list.data,
 (data) => {
  const user = new schema.Entity('list');
  const mySchema = {list: [user]};
  const entities = {list: data.entities && data.entities.list};
  const array = denormalize({list: data.result && data.result.list}, mySchema, entities);
  return array;
 }
);
