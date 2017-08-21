import { connect } from 'react-redux';
import VideosTable from './VideosTable';
import { setPage } from 'components/Videos/store/actions';

const mapStateToProps = (state, ownProps) => {
  const page = state.getIn(['common', 'page']);
  const itemsPerPage = state.getIn(['common', 'itemsPerPage']);
  const start = itemsPerPage * (page - 1);
  const searchTerm = state.getIn(['common', 'searchTerm']);

  const videos =
    state
      .getIn(['common', 'filters'])
      .reduce((videos, filter) => filter.filter(videos), state.getIn(['common', 'videos']))
      .filter((video) => video.matches(searchTerm));

  return {
    page,
    itemsPerPage,
    videos: videos.slice(start, start + itemsPerPage),
    videosTotal: videos.size,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePageChange(page) {
      dispatch(setPage(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosTable);
