import { connect } from 'react-redux';
import VideoBlock from './VideoBlock';
import { favorite, unfavorite } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.getIn(['common', 'loggedIn']),
    favorited: state.getIn(['common', 'favorites']).has(ownProps.video.id),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    favorite() {
      dispatch(favorite(ownProps.video.id));
    },
    unfavorite() {
      dispatch(unfavorite(ownProps.video.id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoBlock);
