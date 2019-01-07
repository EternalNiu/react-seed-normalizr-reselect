import {Async, Sync} from 'redux-action-boilerplate';
export const async = new Async({
  prefix: 'list',
  actions: [
    'fetchSomeAsync',
    'fetchData',
  ],
});

export const sync = new Sync({
  prefix: 'list',
  actions: [
    'onChange',
  ],
});

