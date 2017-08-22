import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Filter as FilterRecord } from 'components/store/records';

const Filter = ({ filter, setFilterValue, deleteFilter }) => {
  let input;
  switch(filter.type) {
  case 'select':
    input = (
      <Select
        value={filter.value}
        options={filter.options.map((value, label) => ({ value, label })).toArray()}
        onChange={({ value }) => setFilterValue(value)}
        clearable={false}
      />
    );
    break;
  case 'input':
    input = (
      <input value={filter.value} onChange={(e) => setFilterValue(e.target.value)} />
    );
    break;
  }

  return (
    <div className='filter'>
      <div className='filter-label'>{filter.label}</div>

      <div className='filter-input'>
        {input}
      </div>

      <i className='fa fa-times' onClick={(e) => deleteFilter(filter.id)} />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.instanceOf(FilterRecord).isRequired,
  deleteFilter: PropTypes.func.isRequired,
};

export default Filter;
