import { List, Record } from 'immutable';
import Team from './team';
import Tournament from './tournament';

const defaultVideo = {
  id: null,
  debateType: null,
  debateLevel: null,
  thumbnail: null,
  liveNow: false,
  isFeatured: false,
  tournamentId: null,
  tournament: new Tournament(),
  affTeamId: null,
  affTeam: new Team(),
  negTeamId: null,
  negTeam: new Team(),
  tags: List(),
  tagsVideos: null,
};

export default class Video extends Record(defaultVideo) {
  getTitle() {
    return `${this.tournament.getYearAndName()}: ${this.affTeam.getTeamCode()} vs. ${this.negTeam.getTeamCode()}`;
  }
}
