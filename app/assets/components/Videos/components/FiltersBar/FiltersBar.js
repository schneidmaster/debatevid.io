import React from 'react';
import PropTypes from 'prop-types';
import Filter from 'components/Videos/components/Filter';
import Search from 'components/Videos/components/Search';
import Sort from 'components/Videos/components/Sort';
import { List, Map } from 'immutable';

const FiltersBar = ({ filters, availableFilters, addFilter }) => {
  return (
    <div className='row mb'>
      <div className='col-md-10 filters'>
        <Sort />
        <div className='dropdown'>
          <button className='btn btn-default dropdown-toggle' type='button' id='addFilter' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
            Filter <span className='caret' />
          </button>
          <ul className='dropdown-menu' aria-labelledby='addFilter'>
            {availableFilters.map((filter) => {
              return (
                <li key={filter}>
                  <a href='#' onClick={(e) => addFilter(e, filter)}>{filter.label}</a>
                </li>
              );
            })}
          </ul>
        </div>

        {filters.keySeq().map((key) => <Filter key={key} filterId={key} />)}
      </div>
      <div className='col-md-2'>
        <Search />
      </div>
    </div>
  );
};

FiltersBar.propTypes = {
  availableFilters: PropTypes.instanceOf(List).isRequired,
  filters: PropTypes.instanceOf(Map).isRequired,
  addFilter: PropTypes.func.isRequired,
};

export default FiltersBar;
