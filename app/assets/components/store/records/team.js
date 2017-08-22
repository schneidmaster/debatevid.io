import { Record } from 'immutable';
import Debater from './debater';
import School from './school';

const defaultTeam = {
  id: null,
  schoolId: null,
  school: new School(),
  debaterOneId: null,
  debaterOne: new Debater(),
  debaterTwoId: null,
  debaterTwo: new Debater(),
};

export default class Team extends Record(defaultTeam) {
  getTeamCode() {
    return `${this.school.name} ${this.debaterOne.lastName.charAt(0)}${this.debaterTwo.lastName.charAt(0)}`;
  }
}
