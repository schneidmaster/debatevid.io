import { Range } from 'immutable';

export default (list, chunkSize = 1) => {
  return Range(0, list.count(), chunkSize).map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize));
};
