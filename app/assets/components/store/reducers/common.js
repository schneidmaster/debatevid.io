import { List, Map } from "immutable";
import {
  Debater,
  School,
  Tag,
  Team,
  Tournament,
  Video,
  Favorite,
  User
} from "components/store/records";
import { simpleMap } from "components/helpers/reducers";
import { createFilters } from "components/Videos/helpers/filters";

const commonState = Map({
  loggedIn: false,
  currentUser: new User(),
  page: 1,
  itemsPerPage: 12,
  levels: List(),
  types: List(),
  tournaments: List(),
  schools: List(),
  teams: List(),
  debaters: List(),
  tags: List(),
  favorites: List(),
  videos: List(),
  users: List(),
  filters: Map(),
  possibleFilters: Map(),
  searchTerm: "",
  sortOrder: ""
});

const inflateTeams = (teams, { schools, debaters }) => {
  return teams.map(team =>
    team.merge(
      Map({
        debaterOne: debaters.get(team.debaterOneId),
        debaterTwo: debaters.get(team.debaterTwoId),
        school: schools.get(team.schoolId)
      })
    )
  );
};

const inflateVideos = (videos, { tournaments, teams, tags }) => {
  return videos.map(video =>
    video.merge(
      Map({
        tournament: tournaments.get(video.tournamentId),
        affTeam: teams.get(video.affTeamId),
        negTeam: teams.get(video.negTeamId),
        tags: video.tagsVideos.map(tagVideo => tags.get(tagVideo.tagId))
      })
    )
  );
};

const commonReducer = (state, action) => {
  switch (action.type) {
    case "HYDRATE":
      const { data } = action.payload;

      const tournaments = simpleMap(data.tournaments, Tournament);
      const schools = simpleMap(data.schools, School);
      const debaters = simpleMap(data.debaters, Debater);
      const tags = simpleMap(data.tags, Tag);
      const favorites = simpleMap(data.favorites, Favorite, "videoId");
      const teams = inflateTeams(simpleMap(data.teams, Team), {
        schools,
        debaters
      });
      const videos = inflateVideos(simpleMap(data.videos, Video), {
        tournaments,
        teams,
        tags
      });
      const users = simpleMap(data.users, User);

      const levels = Map(data.levels);
      const types = Map(data.types);
      const possibleFilters = createFilters({
        levels,
        types,
        tournaments,
        schools,
        teams,
        debaters,
        tags
      });

      return state.merge(
        Map({
          loggedIn: data.logged_in,
          currentUser: data.current_user,
          levels,
          types,
          possibleFilters,
          tournaments,
          schools,
          teams,
          debaters,
          tags,
          favorites,
          videos,
          users
        })
      );
    case "SET_PAGE":
      return state.set("page", action.payload);
    case "SET_FILTER":
      return state
        .setIn(["filters", action.payload.id], action.payload)
        .set("page", 1);
    case "SET_FILTER_VALUE":
      return state
        .setIn(
          ["filters", action.payload.filterId, "value"],
          action.payload.value
        )
        .set("page", 1);
    case "DELETE_FILTER":
      return state
        .deleteIn(["filters", action.payload.filterId])
        .set("page", 1);
    case "SET_SEARCH_TERM":
      return state.set("searchTerm", action.payload).set("page", 1);
    case "SET_SORT_ORDER":
      return state.set("sortOrder", action.payload);
    case "ADD_FAVORITE":
      return state.setIn(
        ["favorites", action.payload.videoId],
        new Favorite(action.payload)
      );
    case "DELETE_FAVORITE":
      return state.deleteIn(["favorites", action.payload]);
    case "DEFLATE":
      return commonState;
    default:
      return state;
  }
};

export { commonReducer, commonState };
