import { connect } from 'react-redux';
import Details from './Details';
import { setSegmentForm } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    hide: state.getIn(['form', 'segments']).size === 0,
    levels: state.getIn(['common', 'levels']),
    level: state.getIn(['form', 'level']),
    types: state.getIn(['common', 'types']),
    type: state.getIn(['form', 'type']),
    year: state.getIn(['form', 'year']),
    allTags: state.getIn(['common', 'tags']),
    tags: state.getIn(['form', 'tags']),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSegmentForm(field, value) {
      dispatch(setSegmentForm({ field, value }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
