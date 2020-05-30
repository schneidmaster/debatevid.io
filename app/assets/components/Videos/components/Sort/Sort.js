import React from "react";
import PropTypes from "prop-types";

const Sort = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="sort">
      <select
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value)}
        className="form-control"
      >
        <option value="">Sort</option>
        <option value="recent">Sort Recent</option>
        <option value="viewed">Sort Top Viewed</option>
        <option value="favd">Sort Top Fav'd</option>
      </select>
    </div>
  );
};

Sort.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired
};

export default Sort;
