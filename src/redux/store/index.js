import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../modules';
import request from '../middleware/requestMiddleware';

export default (initialState = {}) => {
  // create saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Middleware Configuration
  const middleware = [thunk, request, sagaMiddleware];

  // Store Enhancers
  const enhancers = [];

  // Store Instantiation and HMR Setup
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  return {
    store,
    run: sagaMiddleware.run
  };
};
