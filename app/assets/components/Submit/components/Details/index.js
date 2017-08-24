import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Details from './Details';

const mapStateToProps = (state, ownProps) => {
  return {
    hide: state.getIn(['segments', 'segments']).size === 0,
    levels: state.getIn(['common', 'levels']),
    types: state.getIn(['common', 'types']),
    tags: state.getIn(['common', 'tags']).sortBy((tag) => tag.title),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit(values) {
      // todo: submit form to server
      console.log(values);
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'videoDetails' })
)(Details);
