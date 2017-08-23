import { connect } from 'react-redux';
import Segments from './Segments';
import { addFormSegment, deleteFormSegment, setSegmentInput } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    segmentInput: state.getIn(['form', 'segmentInput']),
    segments: state.getIn(['form', 'segments']),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSegmentInput(value) {
      dispatch(setSegmentInput(value));
    },
    addFormSegment(value) {
      dispatch(addFormSegment(value));
    },
    deleteFormSegment(value) {
      dispatch(deleteFormSegment(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Segments);
