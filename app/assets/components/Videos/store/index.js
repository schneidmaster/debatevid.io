import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { reducers, initialState } from './reducers';

// Create history.
const history = createBrowserHistory();

// Combine app reducers with router reducer.
const connectedReducers = connectRouter(history)(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Compose middleware for nav actions and thunks.
const enhancers = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history)
  )
);

// Build the store.
const store = createStore(connectedReducers, initialState, enhancers);

export { store, history };
