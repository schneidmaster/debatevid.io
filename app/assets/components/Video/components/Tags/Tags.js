import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/RFReactSelect';
import { Field } from 'redux-form/es/immutable';
import renderIf from 'render-if';
import { Video } from 'components/store/records';

const Tags = ({ loggedIn, video, tags, adding, addTag, handleSubmit }) => {
  return (
    <div className='tags-row'>
      <div className='tags'>
        Tags:&nbsp;
        {renderIf(video.tags.size > 0)(
          <span>
            {video.tags.map((tag, idx) => {
              return (
                <span key={tag.title}>
                  {renderIf(idx > 0)(', ')}
                  <a href={`/tag/${tag.title}`}>{tag.title}</a>
                </span>
              );
            })}
          </span>
        )}
        {renderIf(video.tags.size === 0)(
          <span>No tags yet.</span>
        )}
      </div>

      {renderIf(adding)(
        <div>
          <form onSubmit={handleSubmit}>
            <Field
              name='tag'
              options={tags}
              component={Select}
              creatable
            />

            <button type='submit' className='btn btn-primary'>Add</button>
          </form>
        </div>
      )}
      {renderIf(loggedIn && !adding)(
        <i className='fa fa-plus' onClick={addTag} />
      )}
    </div>
  );
};

Tags.propTypes = {
  video: PropTypes.instanceOf(Video).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
  adding: PropTypes.bool,
  addTag: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Tags;
