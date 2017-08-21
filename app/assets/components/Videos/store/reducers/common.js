import { List, Map } from 'immutable';
import { Debater, School, Tag, Team, Tournament, Video } from 'components/Videos/store/records';
import camelize from 'camelize';
import { createFilters } from 'components/Videos/helpers/filters';

const commonState = Map({
  page: 1,
  itemsPerPage: 12,
  levels: List(),
  types: List(),
  tournaments: List(),
  schools: List(),
  teams: List(),
  debaters: List(),
  tags: List(),
  videos: List(),
  filters: Map(),
  possibleFilters: Map(),
  searchTerm: '',
});

const parseJson = (json) => camelize(JSON.parse(json));

const simpleMap = (json, Record) => Map(parseJson(json).map((r) => {
  const record = new Record(r);
  return [record.id, record];
}));

const inflateTeams = (teams, { schools, debaters }) => {
  return teams.map((team) => team.merge(Map({
    debaterOne: debaters.get(team.debaterOneId),
    debaterTwo: debaters.get(team.debaterTwoId),
    school: schools.get(team.schoolId),
  })));
};

const inflateVideos = (videos, { tournaments, teams, tags }) => {
  return videos.map((video) => video.merge(Map({
    tournament: tournaments.get(video.tournamentId),
    affTeam: teams.get(video.affTeamId),
    negTeam: teams.get(video.negTeamId),
    tags: video.tagsVideos.map((tagVideo) => tags.get(tagVideo.tagId)),
  })));
};

const commonReducer = (state, action) => {
  switch(action.type) {
  case 'HYDRATE':
    const { data } = action.payload;

    const tournaments = simpleMap(data.tournaments, Tournament);
    const schools = simpleMap(data.schools, School);
    const debaters = simpleMap(data.debaters, Debater);
    const tags = simpleMap(data.tags, Tag);
    const teams = inflateTeams(simpleMap(data.teams, Team), { schools, debaters });
    const videos = inflateVideos(simpleMap(data.videos, Video), { tournaments, teams, tags });

    const levels = Map(data.levels);
    const types = Map(data.types);
    const possibleFilters = createFilters({ levels, types, tournaments, schools, teams, debaters, tags });

    return state.merge(Map({
      levels,
      types,
      possibleFilters,
      tournaments,
      schools,
      teams,
      debaters,
      tags,
      videos,
    }));
  case 'SET_PAGE':
    return state.set('page', action.payload);
  case 'SET_FILTER':
    return state.setIn(['filters', action.payload.id], action.payload).set('page', 1);
  case 'SET_FILTER_VALUE':
    return state.setIn(['filters', action.payload.filterId, 'value'], action.payload.value).set('page', 1);
  case 'DELETE_FILTER':
    return state.deleteIn(['filters', action.payload.filterId]).set('page', 1);
  case 'SET_SEARCH_TERM':
    return state.set('searchTerm', action.payload).set('page', 1);
  case 'DEFLATE':
    return commonState;
  default:
    return state;
  }
};

export { commonReducer, commonState };
