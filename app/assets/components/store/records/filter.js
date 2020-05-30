import { Record, Map } from "immutable";

export default Record(
  {
    id: null,
    label: null,
    type: null,
    options: Map(),
    value: null,
    filter: null
  },
  "Filter"
);
