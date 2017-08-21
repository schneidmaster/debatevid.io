import { connect } from 'react-redux';
import Search from './Search';
import { setSearchTerm } from 'components/Videos/store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    searchTerm: state.getIn(['common', 'searchTerm']),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSearchTerm(value) {
      dispatch(setSearchTerm(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
