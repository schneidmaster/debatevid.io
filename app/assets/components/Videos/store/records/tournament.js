import { Record } from 'immutable';

const defaultTournament = {
  id: null,
  name: null,
  year: null,
};

export default class Tournament extends Record(defaultTournament) {
  getYearAndName() {
    return `${this.year} ${this.name}`;
  }
}
