import { connect } from 'react-redux';
import VideosTable from './VideosTable';
import { setPage } from 'components/Videos/store/actions';

const mapStateToProps = (state, ownProps) => {
  const page = state.getIn(['common', 'page']);
  const itemsPerPage = state.getIn(['common', 'itemsPerPage']);
  const videos = state.getIn(['common', 'videos']);
  const start = itemsPerPage * (page - 1);

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
