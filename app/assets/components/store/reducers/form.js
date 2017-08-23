import { List, Map } from 'immutable';
import { VideoInfo } from 'components/store/records';

const formState = Map({
  segmentInput: '',
  segments: List(),
  level: null,
  type: null,
  year: null,
  tags: '',
});

const formReducer = (state, action) => {
  switch(action.type) {
  case 'SET_SEGMENT_INPUT':
    return state.set('segmentInput', action.payload);
  case 'SET_SEGMENT_FORM':
    return state.set(action.payload.field, action.payload.value);
  case 'ADD_FORM_SEGMENT':
    return state.update('segments', (segments) => segments.push(new VideoInfo(action.payload)));
  case 'DELETE_FORM_SEGMENT':
    return state.update('segments', (segments) => segments.delete(action.payload));
  default:
    return state;
  }
};

export { formReducer, formState };
