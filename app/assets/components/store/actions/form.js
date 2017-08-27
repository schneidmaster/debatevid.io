import { decamelizeKeys } from 'humps';

export const setSegmentInput = (payload) => {
  return {
    type: 'SET_SEGMENT_INPUT',
    payload,
  };
};

export const setSegmentForm = (payload) => {
  return {
    type: 'SET_SEGMENT_FORM',
    payload,
  };
};

const addHydratedFormSegment = (payload) => {
  return {
    type: 'ADD_FORM_SEGMENT',
    payload,
  };
};

export const addFormSegment = (link) => {
  return (dispatch, getState) => {
    const link = getState().getIn(['segments', 'segmentInput']);
    if(link === '') {
      return;
    }
    fetch(`/videos/info?link=${encodeURIComponent(link)}`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((response) => {
        if(response.exists) {
          alert('This video has already been submitted to DebateVid.io.');
        } else if(response.invalid) {
          alert('The provided link is invalid or could not be found.');
        } else {
          dispatch(addHydratedFormSegment(response));
          dispatch(setSegmentInput(''));
        }
      });
  };
};

export const deleteFormSegment = (payload) => {
  return {
    type: 'DELETE_FORM_SEGMENT',
    payload,
  };
};

const nestedAttributes = (key, attr, nameParam = 'name') => {
  if(isNaN(attr)) {
    return {
      [`${key}Attributes`]: {
        [nameParam]: attr,
      },
    };
  } else {
    return {
      [`${key}Id`]: attr,
    };
  }
};

export const createVideo = (values) => {
  return (dispatch, getState) => {
    values = values.toJS();

    values.affTeamAttributes = Object.assign(
      {},
      nestedAttributes('debaterOne', values.affDebaterOne),
      nestedAttributes('debaterTwo', values.affDebaterTwo),
      nestedAttributes('school', values.affSchool),
    );
    delete values.affSchool;
    delete values.affDebaterOne;
    delete values.affDebaterTwo;

    values.negTeamAttributes = Object.assign(
      {},
      nestedAttributes('debaterOne', values.negDebaterOne),
      nestedAttributes('debaterTwo', values.negDebaterTwo),
      nestedAttributes('school', values.negSchool),
    );
    delete values.negSchool;
    delete values.negDebaterOne;
    delete values.negDebaterTwo;

    values = Object.assign(values, nestedAttributes('tournament', values.tournament));
    delete values.tournament;

    values.tagsAttributes = values.tags.map((tag) => nestedAttributes('tag', tag, 'title'));
    delete values.tags;

    values.segments = getState().getIn(['segments', 'segments']).toJS();

    const token = document.head.querySelector('[name=csrf-token]').content;
    const headers = { 'X-CSRF-Token': token, 'Content-Type': 'application/json' };
    const body = JSON.stringify(decamelizeKeys(values));

    fetch('/videos', { credentials: 'same-origin', method: 'POST', body, headers })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };
};
