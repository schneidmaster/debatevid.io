import { List, Record } from 'immutable';
import Team from './team';
import Tournament from './tournament';

const defaultVideo = {
  id: null,
  createdAt: null,
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
  views: 0,
};

export default class Video extends Record(defaultVideo) {
  getTitle() {
    return `${this.tournament.getYearAndName()}: ${this.affTeam.getTeamCode()} vs. ${this.negTeam.getTeamCode()}`;
  }

  matchingTag(term) {
    return this.tags.find((tag) => tag.matches(term)) !== undefined;
  }

  matches(term) {
    if(term === '') {
      return true;
    } else {
      return this.getTitle().toLowerCase().includes(term.toLowerCase()) || this.matchingTag(term);
    }
  }
}
