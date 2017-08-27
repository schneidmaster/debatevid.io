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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign(
    {
      favorite() {
        dispatchProps.favorite(stateProps.video.id);
      },
      unfavorite() {
        dispatchProps.unfavorite(stateProps.video.id);
      },
    },
    stateProps,
  );
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoInfo);
