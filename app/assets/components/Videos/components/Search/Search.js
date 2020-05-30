import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search"
        className="form-control"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};

export default Search;
