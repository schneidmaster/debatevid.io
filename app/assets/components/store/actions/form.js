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

const objectAttributes = (value, nameParam = 'name') => {
  if(typeof value === 'undefined') {
    return null;
  } else if(isNaN(value)) {
    return { [nameParam]: value };
  } else {
    return { id: value };
  }
};

export const createVideo = (values) => {
  values = values.toJS();

  values.affTeamAttributes = {
    debaterOneAttributes: objectAttributes(values.affDebaterOne),
    debaterTwoAttributes: objectAttributes(values.affDebaterTwo),
    schoolAttributes: objectAttributes(values.affSchool),
  };
  delete values.affSchool;
  delete values.affDebaterOne;
  delete values.affDebaterTwo;

  values.negTeamAttributes = {
    debaterOneAttributes: objectAttributes(values.negDebaterOne),
    debaterTwoAttributes: objectAttributes(values.negDebaterTwo),
    schoolAttributes: objectAttributes(values.negSchool),
  };
  delete values.negSchool;
  delete values.negDebaterOne;
  delete values.negDebaterTwo;

  values.tournamentAttributes = objectAttributes(values.tournament);
  delete values.tournament;

  values.tagsAttributes = values.tags.map((tag) => objectAttributes(tag, 'title'));
  delete values.tags;

  return (dispatch) => {
    fetch(`/videos`, { credentials: 'same-origin', method: 'POST', body: decamelizeKeys(values) })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };
};
