import { List, Map } from 'immutable';
import { Filter } from 'components/store/records';

export const createFilters = ({ levels, types, tournaments, schools, teams, debaters, tags }) => {
  return List([
    new Filter({
      id: 'level',
      label: 'Level',
      type: 'select',
      options: levels.set('Any', 'any').sort().reverse(),
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
      options: types.set('Any', 'any').sort().reverse(),
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
    new Filter({
      id: 'year',
      label: 'Year',
      type: 'select',
      options: Map(tournaments.map(t => t.year).groupBy(y => y).keySeq().sort().map((y) => [y, y])).set('Any', 'any').reverse(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.tournament.year === intValue);
        }
      },
    }),
    new Filter({
      id: 'tournament',
      label: 'Tournament',
      type: 'select',
      options: tournaments.map(t => t.getYearAndName()).set('any', 'Any').sort().flip(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.tournament.id === intValue);
        }
      },
    }),
    new Filter({
      id: 'school',
      label: 'School',
      type: 'select',
      options: schools.map(s => s.getName()).set('any', 'Any').sort().flip(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.affTeam.school.id === intValue || video.negTeam.school.id === intValue);
        }
      },
    }),
    new Filter({
      id: 'team',
      label: 'Team',
      type: 'select',
      options: teams.map(t => t.getTeamCode()).set('any', 'Any').sort().flip(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => video.affTeam.id === intValue || video.negTeam.id === intValue);
        }
      },
    }),
    new Filter({
      id: 'debater',
      label: 'Debater',
      type: 'select',
      options: debaters.map(d => d.getName()).set('any', 'Any').sort().flip(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          const intValue = parseInt(this.value);
          return videos.filter((video) => {
            return (
              video.affTeam.debaterOne.id === intValue ||
              video.affTeam.debaterTwo.id === intValue ||
              video.negTeam.debaterOne.id === intValue ||
              video.negTeam.debaterTwo.id === intValue
            );
          });
        }
      },
    }),
    new Filter({
      id: 'tag',
      label: 'Tag',
      type: 'select',
      options: tags.map(t => t.title).set('any', 'Any').sort().flip(),
      value: 'any',
      filter(videos) {
        if(this.value === 'any') {
          return videos;
        } else {
          return videos.filter((video) => video.matchingTagId(this.value));
        }
      },
    }),
  ]);
};
