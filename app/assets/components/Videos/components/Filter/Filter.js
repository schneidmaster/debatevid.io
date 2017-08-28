import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import Select from 'react-select';
import { Filter as FilterRecord } from 'components/store/records';
import styles from './Filter.css';

const Filter = ({ filter, setFilterValue, deleteFilter }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filterLabel}>{filter.label}</div>

      <Select
        value={filter.value}
        options={filter.options.map((value, label) => ({ value, label })).toArray()}
        onChange={({ value }) => setFilterValue(value)}
        clearable={false}
      />

      <Glyphicon glyph='remove' onClick={(e) => deleteFilter(filter.id)} />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.instanceOf(FilterRecord).isRequired,
  deleteFilter: PropTypes.func.isRequired,
};

export default Filter;
