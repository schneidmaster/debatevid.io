import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({ sortOrder, setSortOrder }) => {
  return (
    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='form-control sort'>
      <option value=''>Sort</option>
      <option value='recent'>Sort Recent</option>
      <option value='viewed'>Sort Top Viewed</option>
      <option value='liked'>Sort Top Liked</option>
    </select>
  );
};

Sort.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default Sort;
