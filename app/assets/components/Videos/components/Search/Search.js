import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import styles from './Search.css';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.search}>
      <FormControl
        type='search'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search;
