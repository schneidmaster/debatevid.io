import React from 'react';
import PropTypes from 'prop-types';
import { Filter as FilterRecord } from 'components/Videos/store/records';

const Filter = ({ filter, setFilterValue, deleteFilter }) => {
  let input;
  switch(filter.type) {
  case 'select':
    input = (
      <select value={filter.value} onChange={(e) => setFilterValue(e.target.value)}>
        {filter.options.map((option, label) => <option key={option} value={option}>{label}</option>).toList()}
      </select>
    );
  }

  return (
    <button className='btn btn-default'>
      {filter.label}

      {input}

      <i className='fa fa-times' onClick={(e) => deleteFilter(filter.id)} />
    </button>
  );
};

Filter.propTypes = {
  filter: PropTypes.instanceOf(FilterRecord).isRequired,
  deleteFilter: PropTypes.func.isRequired,
};

export default Filter;
