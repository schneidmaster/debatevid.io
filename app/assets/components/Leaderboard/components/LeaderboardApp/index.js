import { connect } from 'react-redux';
import LeaderboardApp from './LeaderboardApp';
import { setTagsPage, setVideosPage, setScorePage } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  const users = state.getIn(['common', 'users']).sortBy((user) => user.name).toList();
  const tagsPage = state.getIn(['leaderboard', 'tagsPage']);
  const videosPage = state.getIn(['leaderboard', 'videosPage']);
  const scorePage = state.getIn(['leaderboard', 'scorePage']);
  const itemsPerPage = state.getIn(['leaderboard', 'itemsPerPage']);
  const tagsStart = itemsPerPage * (tagsPage - 1);
  const videosStart = itemsPerPage * (videosPage - 1);
  const scoreStart = itemsPerPage * (scorePage - 1);

  return {
    tagsPage,
    videosPage,
    scorePage,
    itemsPerPage,
    users,
    tagsUsers: users.sortBy((user) => -user.tagsCount).slice(tagsStart, tagsStart + itemsPerPage),
    videosUsers: users.sortBy((user) => -user.videosCount).slice(videosStart, videosStart + itemsPerPage),
    scoreUsers: users.sortBy((user) => -user.score).slice(scoreStart, scoreStart + itemsPerPage),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTagsPage() {
      dispatch(setTagsPage());
    },
    setVideosPage() {
      dispatch(setVideosPage());
    },
    setScorePage() {
      dispatch(setScorePage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardApp);
