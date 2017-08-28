import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import Filter from 'components/Videos/components/Filter';
import Search from 'components/Videos/components/Search';
import Sort from 'components/Videos/components/Sort';
import { List, Map } from 'immutable';
import styles from './FiltersBar.css';

const FiltersBar = ({ filters, availableFilters, addFilter }) => {
  return (
    <Row className='mb'>
      <Col xs={12} className={styles.filters}>
        <div className={styles.filtersLeft}>
          <Sort />

          <DropdownButton id='filters' className={styles.addFilter} title='Filter'>
            {availableFilters.map((filter) => {
              return (
                <MenuItem key={filter} onClick={(e) => addFilter(e, filter)}>
                  {filter.label}
                </MenuItem>
              );
            })}
          </DropdownButton>

          <div className={styles.filtersActive}>
            {filters.keySeq().map((key) => <Filter key={key} filterId={key} />)}
          </div>
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
