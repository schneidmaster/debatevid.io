import { Record } from 'immutable';

const defaultSchool = {
  id: null,
  name: null,
  shortName: null,
};

export default class School extends Record(defaultSchool) {
  getNameForCode() {
    return this.shortName || this.name;
  }
};
