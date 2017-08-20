import { Record } from 'immutable';
import Debater from './debater';
import School from './school';

const defaultTeam = {
  id: null,
  school: new School(),
  debaterOne: new Debater(),
  debaterTwo: new Debater(),
};

export default class Team extends Record(defaultTeam) {
  constructor({ id, school, debaterOne, debaterTwo } = {}) {
    super({ id, school, debaterOne: new Debater(debaterOne), debaterTwo: new Debater(debaterTwo) });
  }

  getTeamCode() {
    return `${this.school.name} ${this.debaterOne.lastName.charAt(0)}${this.debaterTwo.lastName.charAt(0)}`;
  }
}
