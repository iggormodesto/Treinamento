// configureStore.js

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
//import { logger } from 'redux-logger';

export default function configureStore(initialState) {
  return createStore(rootReducer, applyMiddleware(thunk), initialState);
}