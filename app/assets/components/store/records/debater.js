import { Record } from "immutable";

const defaultDebater = {
  id: null,
  schoolId: null,
  firstName: null,
  lastName: null
};

export default class Debater extends Record(defaultDebater) {
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
