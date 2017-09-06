import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {autoRehydrate} from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from '../modules';
import request from '../middleware/requestMiddleware';
import checkLogin from '../middleware/checkLoginMiddleware';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 5678, hostname: 'localhost' });

export default (initialState = {}) => {
  // create saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Middleware Configuration
  const middleware = [ thunk, request, checkLogin, sagaMiddleware];

  // Store Enhancers
  const enhancers = [autoRehydrate()];

  // Store Instantiation and HMR Setup
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  return {
    store,
    run: sagaMiddleware.run
  };
};
