import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

const Segments = ({ segmentInput, segments, setSegmentInput, addFormSegment, deleteFormSegment }) => {
  const hasSegments = segments.size > 0;
  const firstSegment = segments.first();

  let preview;
  if(hasSegments) {
    preview = (
      <div className='video-preview'>
        <strong>{firstSegment.title}</strong>
        <img src={firstSegment.thumbnail} alt={firstSegment.title} />
      </div>
    );
  }

  let instruction;
  let helpBlock;
  let input;

  if(!hasSegments) {
    instruction = (
      <p>Enter link to video from YouTube or Vimeo</p>
    );
    helpBlock = (
      <p className='help-block'>
        If the video is in multiple segments on YouTube, you can add each link and DebateVid.io will automatically display as a playlist. Only one segment is supported for Vimeo.
      </p>
    );
  } else if(firstSegment.provider === 'youtube') {
    instruction = (
      <p>Add additional links if the video is in multiple segments.</p>
    );
  }

  if(!hasSegments || firstSegment.provider === 'youtube') {
    input = (
      <div className='form-group'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Link'
            value={segmentInput}
            onChange={(e) => setSegmentInput(e.target.value)}
          />
          <div className='input-group-btn'>
            <button className='btn btn-primary' onClick={addFormSegment}>Add</button>
          </div>
        </div>
        {helpBlock}
      </div>
    );
  }

  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Video segments</h3>
      </div>
      <div className='panel-body'>
        {preview}
        {segments.map((segment, idx) => {
          return (
            <div className='segment' key={segment.key}>
              <a href={segment.getLink()} target='_blank'>{segment.title}</a>

              <i className='fa fa-times pull-right' onClick={(e) => deleteFormSegment(idx)} />
            </div>
          );
        })}
        {instruction}
        {input}
      </div>
    </div>
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
