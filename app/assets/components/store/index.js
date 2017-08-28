import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { reducers, initialState } from './reducers';

// Compose middleware for thunks.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
  )
);

// Build the store.
export default createStore(reducers, initialState, enhancers);
