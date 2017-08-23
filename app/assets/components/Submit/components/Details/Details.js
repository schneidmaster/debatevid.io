import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Map } from 'immutable';

const Details = ({ hide, setSegmentForm, levels, level, types, type, year, allTags, tags }) => {
  if(hide) {
    return null;
  } else {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Video details</h3>
        </div>
        <div className='panel-body'>
          <div className='form-group'>
            <label>Level</label>
            <Select
              value={level}
              options={levels.map((value, label) => ({ value, label })).toArray()}
              onChange={({ value }) => setSegmentForm('level', value)}
            />
          </div>

          <div className='form-group'>
            <label>Debate type</label>
            <Select
              value={type}
              options={types.map((value, label) => ({ value, label })).toArray()}
              onChange={({ value }) => setSegmentForm('type', value)}
            />
          </div>

          <div className='form-group'>
            <label>Year</label>
            <input
              type='number'
              className='form-control'
              value={year || ''}
              onChange={(e) => setSegmentForm('year', e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Tags</label>
            <Select
              value={tags}
              options={allTags.map((tag) => ({ value: String(tag.id), label: tag.title })).toArray()}
              onChange={(value) => setSegmentForm('tags', value)}
              multi
              simpleValue
            />
          </div>
        </div>
      </div>
    );
  }
};

Details.propTypes = {
  hide: PropTypes.bool.isRequired,
  setSegmentForm: PropTypes.func.isRequired,
  levels: PropTypes.instanceOf(Map).isRequired,
  level: PropTypes.number,
  types: PropTypes.instanceOf(Map).isRequired,
  type: PropTypes.number,
  year: PropTypes.number,
  allTags: PropTypes.instanceOf(Map),
  tags: PropTypes.string,
};

export default Details;
