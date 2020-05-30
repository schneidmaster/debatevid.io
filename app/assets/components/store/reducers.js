import { Map } from "immutable";
import { combineReducers } from "redux-immutable";
import { commonReducer, commonState } from "./reducers/common";
import { leaderboardReducer, leaderboardState } from "./reducers/leaderboard";
import { segmentsReducer, segmentsState } from "./reducers/segments";
import { videoReducer, videoState } from "./reducers/video";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  common: commonReducer,
  form: formReducer,
  leaderboard: leaderboardReducer,
  segments: segmentsReducer,
  video: videoReducer
});

const initialState = Map({
  common: commonState,
  form: Map(),
  leaderboard: leaderboardState,
  segments: segmentsState,
  video: videoState
});

export { reducers, initialState };
