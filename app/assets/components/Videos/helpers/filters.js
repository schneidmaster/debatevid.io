import { List } from 'immutable';
import { Filter } from 'components/Videos/store/records';
// List(['level', 'type', 'year', 'tournament', 'school', 'team', 'debater', 'tag'])

export const createFilters = ({ levels, types, tournaments, schools, teams, debaters, tags }) => {
  return List([
    new Filter({
      id: 'level',
      label: 'Level',
      type: 'select',
      options: levels.set('Any', 'any'),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.debateLevel === intValue);
        }
      },
    }),
    new Filter({
      id: 'type',
      label: 'Format',
      type: 'select',
      options: types.set('Any', 'any'),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.debateType === intValue);
        }
      },
    }),
  ]);
};
