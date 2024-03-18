// store.js
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import counterReducer from './counterSlice';

const logger = createLogger({
  predicate: (getState, action) => {
    // Access the current state using getState if needed
    const currentState = getState();

    // Check the type of the action and decide whether to log it or not
    return action.type !== 'SOME_ACTION_TO_IGNORE';
  }, // if specified this function willclg be called before each action is processed with this middleware.
  collapsed: true, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
  duration: false, // print the duration of each action?
  timestamp: true, // print the timestamp with each action?
  level: "log",  // 'log' | 'console' | 'warn' | 'error' | 'info',
  colors: {
    title: () => 'inherit',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  }, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
  titleFormatter: (action, time, took) => {
    return `Action: ${action?.type}`;
  }, // Format the title used when logging actions.

  stateTransformer: (state) => {
    return {
      user: state?.counter ? { ...state?.counter } : null,
    };

  }, // Transform state before print. Eg. convert Immutable object to plain JSON.
  actionTransformer: (action) => {
    return {
      ...action,
      meta: {
        ...action.meta,
        timestamp: new Date().toISOString(),
      },
    };
  }, // Transform action before print. Eg. convert Immutable object to plain JSON.
  errorTransformer: (error) => {
    return {
      name: error.name,
      message: error.message,
    };
  }, // Transform error before print. Eg. convert Immutable object to plain JSON.

  // logger: "console",
  logErrors: true,
  diff: false,
  diffPredicate: undefined
});

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { store };
