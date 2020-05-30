import { Record } from "immutable";

const defaultTag = {
  id: null,
  title: null
};

export default class Tag extends Record(defaultTag) {
  matches(term) {
    return this.title.toLowerCase().includes(term.toLowerCase());
  }
}
