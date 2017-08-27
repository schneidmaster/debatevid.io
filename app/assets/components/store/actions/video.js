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

export const setTagInput = (payload) => {
  return {
    type: 'SET_TAG_INPUT',
    payload,
  };
};
