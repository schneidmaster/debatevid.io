import { Map } from 'immutable';

const leaderboardState = Map({
  itemsPerPage: 10,
  tagsPage: 1,
  videosPage: 1,
  scorePage: 1,
});

const leaderboardReducer = (state, action) => {
  switch(action.type) {
  case 'SET_TAGS_PAGE':
    return state.set('tagsPage', action.payload);
  case 'SET_VIDEOS_PAGE':
    return state.set('videosPage', action.payload);
  case 'SET_SCORE_PAGE':
    return state.set('scorePage', action.payload);
  default:
    return state;
  }
};

export { leaderboardReducer, leaderboardState };
