import { List, Map } from 'immutable';
import { Debater, School, Tag, Team, Tournament, User, Video, Favorite } from 'components/store/records';
import { parseJson, simpleMap } from 'components/helpers/reducers';

const videoState = Map({
  tags: List(),
  favorites: List(),
  video: new Video(),
  adding: false,
  tagInput: '',
});

const videoReducer = (state, action) => {
  switch(action.type) {
  case 'HYDRATE_VIDEO':
    const { data } = action.payload;

    const tags = simpleMap(data.tags, Tag);
    const favorites = simpleMap(data.favorites, Favorite, 'videoId');

    const videoData = parseJson(data.video);

    const affSchool = new School(videoData.affTeam.debaterOne.school);
    const negSchool = new School(videoData.negTeam.debaterOne.school);
    const affDebaterOne = new Debater(Object.assign(videoData.affTeam.debaterOne, { school: affSchool }));
    let affDebaterTwo;
    if(videoData.affTeam.debaterTwo) {
      affDebaterTwo = new Debater(Object.assign(videoData.affTeam.debaterTwo, { school: affSchool }));
    }
    const negDebaterOne = new Debater(Object.assign(videoData.negTeam.debaterOne, { school: negSchool }));
    let negDebaterTwo;
    if(videoData.negTeam.debaterTwo) {
      negDebaterTwo = new Debater(Object.assign(videoData.negTeam.debaterTwo, { school: negSchool }));
    }

    const video = new Video(Object.assign(videoData, {
      tournament: new Tournament(videoData.tournament),
      tags: List(videoData.tagsVideos.map((tagVideo) => tags.get(tagVideo.tagId))),
      user: new User(videoData.user),
      affTeam: new Team({ school: affSchool, debaterOne: affDebaterOne, debaterTwo: affDebaterTwo }),
      negTeam: new Team({ school: negSchool, debaterOne: negDebaterOne, debaterTwo: negDebaterTwo }),
    }));

    return Map({
      loggedIn: data.logged_in,
      favorites,
      tags,
      video,
    });

  case 'ADD_FAVORITE':
    return state.setIn(['favorites', action.payload.videoId], new Favorite(action.payload));
  case 'DELETE_FAVORITE':
    return state.deleteIn(['favorites', action.payload]);
  case 'ADD_TAG':
    return state.set('adding', true);
  case 'SET_TAG_INPUT':
    return state.set('tagInput', action.payload);
  case 'CREATED_TAG':
    return state
      .set('adding', false)
      .set('tagInput', '')
      .updateIn(['video', 'tags'], (tags) => tags.push(new Tag(action.payload)));
  default:
    return state;
  }
};

export { videoReducer, videoState };
