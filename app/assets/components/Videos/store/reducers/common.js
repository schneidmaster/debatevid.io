import Immutable from 'immutable';
import Video from 'components/Videos/store/records/video';
import camelize from 'camelize';

const commonState = Immutable.Map({
  page: 1,
  itemsPerPage: 12,
  videos: [],
});

const initialVideos = (videos) => Immutable.List(camelize(JSON.parse(videos)).map(v => new Video(v)));

const commonReducer = (state, action) => {
  switch(action.type) {
  case 'HYDRATE':
    return state.set('videos', initialVideos(action.payload.videos));
  case 'SET_PAGE':
    return state.set('page', action.payload);
  case 'DEFLATE':
    return commonState;
  default:
    return state;
  }
};

export { commonReducer, commonState };
