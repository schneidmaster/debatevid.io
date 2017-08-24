import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { commonReducer, commonState } from './reducers/common';
import { segmentsReducer, segmentsState } from './reducers/segments';
import { reducer as formReducer } from 'redux-form/immutable';

const reducers = combineReducers({
  common: commonReducer,
  form: formReducer,
  segments: segmentsReducer,
});

const initialState = Map({
  common: commonState,
  form: Map(),
  segments: segmentsState,
});

export { reducers, initialState };
