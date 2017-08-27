import { List, Record } from 'immutable';
import { safeLoad as yaml } from 'js-yaml';
import Team from './team';
import Tournament from './tournament';
import User from './user';

const defaultVideo = {
  id: null,
  createdAt: null,
  debateType: null,
  debateLevel: null,
  thumbnail: null,
  key: null,
  provider: null,
  liveNow: false,
  isFeatured: false,
  tournamentId: null,
  tournament: new Tournament(),
  favoritesCount: 0,
  affTeamId: null,
  affTeam: new Team(),
  negTeamId: null,
  negTeam: new Team(),
  tags: List(),
  tagsVideos: null,
  views: 0,
  user: new User(),
};

export default class Video extends Record(defaultVideo) {
  getTitle() {
    return `${this.tournament.getYearAndName()}: ${this.affTeam.getTeamCode()} vs. ${this.negTeam.getTeamCode()}`;
  }

  getThumbnail() {
    if(this.provider === 'youtube') {
      return `https://img.youtube.com/vi/${this.key.first}/hqdefault.jpg`;
    } else if(this.thumbnail) {
      return this.thumbnail.replace('200x150', '600x450');
    }
  }

  getFrameProps() {
    const keyArray = yaml(this.key);
    const firstKey = keyArray.shift();

    let src;
    let providerProps;

    if(this.provider === 0) {
      src = `https://www.youtube.com/embed/${firstKey}?origin=https://debatevid.io`;
      if(keyArray.length > 0) {
        src = `&playlist=${keyArray.join(',')}`;
      }
      providerProps = {
        type: 'text/html',
      };
    } else if(this.provider === 1) {
      src = `https://player.vimeo.com/video/${firstKey}`;
      providerProps = {
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true,
      };
    }

    return Object.assign({
      id: 'vidframe',
      frameBorder: 0,
      src,
    }, providerProps);
  }

  matchingTag(term) {
    return this.tags.find((tag) => tag.matches(term)) !== undefined;
  }

  matchingTagId(id) {
    return this.tags.find((tag) => tag.id === id) !== undefined;
  }

  matches(term) {
    if(term === '') {
      return true;
    } else {
      return this.getTitle().toLowerCase().includes(term.toLowerCase()) || this.matchingTag(term);
    }
  }
}
