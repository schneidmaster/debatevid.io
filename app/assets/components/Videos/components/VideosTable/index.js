import { connect } from 'react-redux';
import VideosTable from './VideosTable';
import { setPage } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  const page = state.getIn(['common', 'page']);
  const itemsPerPage = state.getIn(['common', 'itemsPerPage']);
  const start = itemsPerPage * (page - 1);
  const searchTerm = state.getIn(['common', 'searchTerm']);
  const sortOrder = state.getIn(['common', 'sortOrder']);

  let videos =
    state
      .getIn(['common', 'filters'])
      .reduce((videos, filter) => filter.filter(videos), state.getIn(['common', 'videos']));

  if(searchTerm !== '') {
    videos = videos.filter((video) => video.matches(searchTerm));
  }

  videos = videos.sortBy((video) => {
    switch(sortOrder) {
    case 'viewed':
      return video.views;
    case 'favd':
      return video.favoritesCount;
    case 'recent':
    default:
      return video.createdAt;
    }
  });

  if(sortOrder === '') {
    videos = videos.sortBy(video => video.isFeatured);
  }

  videos = videos.reverse();

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
