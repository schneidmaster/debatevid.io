import { List, Map } from 'immutable';
import { VideoInfo } from 'components/store/records';

const segmentsState = Map({
  segmentInput: '',
  segments: List(),
});

const segmentsReducer = (state, action) => {
  switch(action.type) {
  case 'SET_SEGMENT_INPUT':
    return state.set('segmentInput', action.payload);
  case 'ADD_FORM_SEGMENT':
    return state.update('segments', (segments) => segments.push(new VideoInfo(action.payload)));
  case 'DELETE_FORM_SEGMENT':
    return state.update('segments', (segments) => segments.delete(action.payload));
  default:
    return state;
  }
};

export { segmentsReducer, segmentsState };
