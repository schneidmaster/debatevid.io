import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Map } from 'immutable';
import { Row } from 'react-bootstrap';
import chunk from 'components/Videos/helpers/chunk';
import VideoBlock from 'components/Videos/components/VideoBlock';

const VideosTable = ({ videos, page, itemsPerPage, videosTotal, handlePageChange }) => {
  return (
    <div>
      {chunk(videos, 3).map((chunk, idx) => {
        return (
          <Row className='mb' key={idx}>
            {chunk.map((video) => <VideoBlock key={video.id} video={video} />).toList()}
          </Row>
        );
      })}

      <Row className='text-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={videosTotal}
          onChange={handlePageChange}
        />
      </Row>
    </div>
  );
};

VideosTable.propTypes = {
  videos: PropTypes.instanceOf(Map).isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  videosTotal: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default VideosTable;
