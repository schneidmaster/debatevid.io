import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Panel, Glyphicon, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import renderIf from 'render-if';

const Segments = ({ segmentInput, segments, setSegmentInput, addFormSegment, deleteFormSegment }) => {
  const hasSegments = segments.size > 0;
  const firstSegment = segments.first();

  return (
    <Panel header='Video segments'>
      {renderIf(hasSegments)(
        <div className='video-preview'>
          <strong>{firstSegment.title}</strong>
          <img src={firstSegment.thumbnail} alt={firstSegment.title} />
        </div>
      )}

      {segments.map((segment, idx) => {
        return (
          <div className='segment' key={segment.key}>
            <a href={segment.getLink()} target='_blank'>{segment.title}</a>

            <Glyphicon glyph='remove' className='pull-right' onClick={(e) => deleteFormSegment(idx)} />
          </div>
        );
      })}

      {renderIf(!hasSegments)(
        <p>Enter link to video from YouTube or Vimeo</p>
      )}
      {renderIf(hasSegments && firstSegment.provider === 'youtube')(
        <p>Add additional links if the video is in multiple segments.</p>
      )}

      {renderIf(!hasSegments || firstSegment.provider === 'youtube')(
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Link'
              value={segmentInput}
              onChange={(e) => setSegmentInput(e.target.value)}
            />
            <InputGroup.Button>
              <Button bsStyle='primary' onClick={addFormSegment}>Add</Button>
            </InputGroup.Button>
          </InputGroup>
          {renderIf(!hasSegments)(
            <p className='help-block'>
              If the video is in multiple segments on YouTube, you can add each link and DebateVid.io will automatically display as a playlist. Only one segment is supported for Vimeo.
            </p>
          )}
        </FormGroup>
      )}
    </Panel>
  );
};

Segments.propTypes = {
  segmentInput: PropTypes.string.isRequired,
  segments: PropTypes.instanceOf(List).isRequired,
  setSegmentInput: PropTypes.func.isRequired,
  addFormSegment: PropTypes.func.isRequired,
  deleteFormSegment: PropTypes.func.isRequired,
};

export default Segments;
