import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { commonReducer, commonState } from './reducers/common';
import { formReducer, formState } from './reducers/form';

const reducers = combineReducers({
  common: commonReducer,
  form: formReducer,
});

const initialState = Immutable.Map({
  common: commonState,
  form: formState,
});

export { reducers, initialState };
