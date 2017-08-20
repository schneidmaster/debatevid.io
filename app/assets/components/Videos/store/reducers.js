import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { commonReducer, commonState } from './reducers/common';

const reducers = combineReducers({
  common: commonReducer,
});

const initialState = Immutable.Map({
  common: commonState,
});

export { reducers, initialState };
