import { connect } from 'react-redux';
import FiltersBar from './FiltersBar';
import { setFilter } from 'components/Videos/store/actions';

const mapStateToProps = (state, ownProps) => {
  const possibleFilters = state.getIn(['common', 'possibleFilters']);
  const filters = state.getIn(['common', 'filters']);

  return {
    availableFilters: possibleFilters.filterNot((filter, key) => filters.has(key)),
    filters,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter(e, filter) {
      e.preventDefault();
      dispatch(setFilter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
