import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Filter from 'components/Videos/components/Filter';
import Search from 'components/Videos/components/Search';
import Sort from 'components/Videos/components/Sort';
import { List, Map } from 'immutable';

const FiltersBar = ({ filters, availableFilters, addFilter }) => {
  return (
    <Row className='mb'>
      <Col xs={12} className='filters'>
        <div className='filters-left'>
          <Sort />
          <div className='dropdown add-filter'>
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

        <Search />
      </Col>
    </Row>
  );
};

FiltersBar.propTypes = {
  availableFilters: PropTypes.instanceOf(List).isRequired,
  filters: PropTypes.instanceOf(Map).isRequired,
  addFilter: PropTypes.func.isRequired,
};

export default FiltersBar;
