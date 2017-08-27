import { connect } from 'react-redux';
import VideoInfo from './VideoInfo';
import { favorite, unfavorite, addTag, setTagInput } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  const video = state.getIn(['video', 'video']);

  const tags =
    state.getIn(['video', 'tags'])
      .sortBy((tag) => tag.title)
      .map((tag) => ({ value: String(tag.id), label: tag.title }))
      .toArray();

  return {
    video,
    tags,
    tagInput: state.getIn(['video', 'tagInput']),
    adding: state.getIn(['video', 'adding']),
    loggedIn: state.getIn(['video', 'loggedIn']),
    favorited: state.getIn(['video', 'favorites']).has(video.id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag() {
      dispatch(addTag());
    },
    setTagInput(value) {
      dispatch(setTagInput(value));
    },
    favorite(videoId) {
      dispatch(favorite(videoId));
    },
    unfavorite(videoId) {
      dispatch(unfavorite(videoId));
    },
  };
};

const mergeProps = (stateProps, { addTag, setTagInput, favorite, unfavorite }) => {
  return Object.assign(
    {
      addTag,
      setTagInput,
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
