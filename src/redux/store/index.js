import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../modules';
import rootSaga from '../saga';

export default (initialState = {}) => {
  // create saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // go saga
  sagaMiddleware.run(rootSaga);

  // Middleware Configuration
  const middleware = [thunk, requestMiddleware, sagaMiddleware];

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

  return store;
};
