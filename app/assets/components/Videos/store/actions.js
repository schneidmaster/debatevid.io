export const hydrate = (payload) => {
  return {
    type: 'HYDRATE',
    payload,
  };
};

export const deflate = (payload) => {
  return {
    type: 'DEFLATE',
  };
};

export const setPage = (payload) => {
  return {
    type: 'SET_PAGE',
    payload,
  };
};
