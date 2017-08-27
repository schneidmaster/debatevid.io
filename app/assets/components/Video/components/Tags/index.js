import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Tags from './Tags';
import { addTag, createTag } from 'components/store/actions';

const mapStateToProps = (state, ownProps) => {
  const video = state.getIn(['video', 'video']);

  const tags =
    state.getIn(['video', 'tags'])
      .sortBy((tag) => tag.title)
      .map((tag) => ({ value: String(tag.id), label: tag.title }))
      .toArray();

  return {
    video,
    tags,
    tagInput: state.getIn(['video', 'tagInput']),
    adding: state.getIn(['video', 'adding']),
    loggedIn: state.getIn(['video', 'loggedIn']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag() {
      dispatch(addTag());
    },
    onSubmit(values) {
      dispatch(createTag(values.get('tag')));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'videoTags' })
)(Tags);
