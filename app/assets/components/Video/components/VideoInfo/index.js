import { connect } from 'react-redux';
import VideoInfo from './VideoInfo';
import { favorite, unfavorite } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  const video = state.getIn(['video', 'video']);

  return {
    video,
    loggedIn: state.getIn(['video', 'loggedIn']),
    favorited: state.getIn(['video', 'favorites']).has(video.id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    favorite(videoId) {
      dispatch(favorite(videoId));
    },
    unfavorite(videoId) {
      dispatch(unfavorite(videoId));
    },
  };
};

const mergeProps = (stateProps, { favorite, unfavorite }) => {
  return Object.assign(
    {
      favorite() {
        favorite(stateProps.video.id);
      },
      unfavorite() {
        unfavorite(stateProps.video.id);
      },
    },
    stateProps,
  );
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoInfo);
