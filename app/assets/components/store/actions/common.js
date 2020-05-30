import { camelizeKeys } from "humps";

export const hydrate = payload => {
  return {
    type: "HYDRATE",
    payload
  };
};

export const deflate = payload => {
  return {
    type: "DEFLATE"
  };
};

export const setPage = payload => {
  return {
    type: "SET_PAGE",
    payload
  };
};

export const setFilter = payload => {
  return {
    type: "SET_FILTER",
    payload
  };
};

export const setFilterValue = payload => {
  return {
    type: "SET_FILTER_VALUE",
    payload
  };
};

export const deleteFilter = payload => {
  return {
    type: "DELETE_FILTER",
    payload
  };
};

export const setSearchTerm = payload => {
  return {
    type: "SET_SEARCH_TERM",
    payload
  };
};

export const setSortOrder = payload => {
  return {
    type: "SET_SORT_ORDER",
    payload
  };
};

const addFavorite = payload => {
  return {
    type: "ADD_FAVORITE",
    payload
  };
};

export const favorite = videoId => {
  return (dispatch, getState) => {
    const token = document.head.querySelector("[name=csrf-token]").content;
    fetch(`/videos/${videoId}/favorites`, {
      credentials: "same-origin",
      method: "POST",
      headers: { "X-CSRF-Token": token }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(addFavorite(camelizeKeys(response)));
      });
  };
};

const deleteFavorite = payload => {
  return {
    type: "DELETE_FAVORITE",
    payload
  };
};

export const unfavorite = videoId => {
  return (dispatch, getState) => {
    const token = document.head.querySelector("[name=csrf-token]").content;
    fetch(`/videos/${videoId}/favorites`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: { "X-CSRF-Token": token }
    }).then(() => dispatch(deleteFavorite(videoId)));
  };
};
