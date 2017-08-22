import { connect } from 'react-redux';
import Filter from './Filter';
import { setFilterValue, deleteFilter } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.getIn(['common', 'filters', ownProps.filterId]),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFilterValue(value) {
      dispatch(setFilterValue({ filterId: ownProps.filterId, value }));
    },
    deleteFilter(filterId) {
      dispatch(deleteFilter({ filterId }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
