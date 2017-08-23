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
    const link = getState().getIn(['form', 'segmentInput']);
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
