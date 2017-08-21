import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type='search'
      placeholder='Search'
      className='form-control'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search;
