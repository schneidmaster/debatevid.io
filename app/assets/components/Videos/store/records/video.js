import { List, Record } from 'immutable';
import Tag from './tag';
import Team from './team';
import Tournament from './tournament';

const defaultVideo = {
  id: null,
  debateType: null,
  debateLevel: null,
  thumbnail: null,
  liveNow: false,
  isFeatured: false,
  tournament: new Tournament(),
  affTeam: new Team(),
  negTeam: new Team(),
  tags: List(),
};

export default class Video extends Record(defaultVideo) {
  constructor({ id, debateType, debateLevel, thumbnail, liveNow, isFeatured, tournament, affTeam, negTeam, tagsVideos } = {}) {
    super({
      id,
      debateType,
      debateLevel,
      thumbnail,
      liveNow,
      isFeatured,
      tournament: new Tournament(tournament),
      affTeam: new Team(affTeam),
      negTeam: new Team(negTeam),
      tags: tagsVideos.map(tv => new Tag(tv.tag)),
    });
  }

  getTitle() {
    return `${this.tournament.getYearAndName()}: ${this.affTeam.getTeamCode()} vs. ${this.negTeam.getTeamCode()}`;
  }
}
