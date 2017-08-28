import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import styles from './Sort.css';

const Sort = ({ sortOrder, setSortOrder }) => {
  return (
    <div className={styles.sort}>
      <FormControl componentClass='select' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value=''>Sort</option>
        <option value='recent'>Sort Recent</option>
        <option value='viewed'>Sort Top Viewed</option>
        <option value='favd'>Sort Top Fav'd</option>
      </FormControl>
    </div>
  );
};

Sort.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default Sort;
