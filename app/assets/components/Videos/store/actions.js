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

export const setFilter = (payload) => {
  return {
    type: 'SET_FILTER',
    payload,
  };
};

export const setFilterValue = (payload) => {
  return {
    type: 'SET_FILTER_VALUE',
    payload,
  };
};

export const deleteFilter = (payload) => {
  return {
    type: 'DELETE_FILTER',
    payload,
  };
};

export const setSearchTerm = (payload) => {
  return {
    type: 'SET_SEARCH_TERM',
    payload,
  };
};
