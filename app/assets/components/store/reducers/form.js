import { List, Map } from 'immutable';

const formState = Map({
  segments: List(),
});

const formReducer = (state, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

export { formReducer, formState };
