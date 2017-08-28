import { camelizeKeys } from 'humps';

export const hydrateVideo = (payload) => {
  return {
    type: 'HYDRATE_VIDEO',
    payload,
  };
};

export const addTag = () => {
  return {
    type: 'ADD_TAG',
  };
};

const createdTag = (payload) => {
  return {
    type: 'CREATED_TAG',
    payload,
  };
};

export const createTag = (tag) => {
  return (dispatch, getState) => {
    const token = document.head.querySelector('[name=csrf-token]').content;
    const state = getState();
    const videoId = state.getIn(['video', 'video', 'id']);
    const headers = { 'X-CSRF-Token': token, 'Content-Type': 'application/json' };
    const body = JSON.stringify({ tag: { title: tag } });
    fetch(`/videos/${videoId}/tags.json`, { credentials: 'same-origin', method: 'POST', body, headers })
      .then((response) => response.json())
      .then((response) => {
        dispatch(createdTag(camelizeKeys(response)));
      });
  };
};
