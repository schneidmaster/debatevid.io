import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Map } from 'immutable';
import _ from 'mudash';

const VideosTable = ({ videos, page, itemsPerPage, videosTotal, handlePageChange }) => {
  return (
    <div>
      {_.chunk(videos, 3).map((chunk, idx) => {
        return (
          <div className='row mb' key={idx}>
            {chunk.map((video) => {
              return (
                <div className='col-md-4 video-preview' key={video.id}>
                  <a href={`/videos/${video.id}`}>
                    <img src={video.thumbnail} alt={video.getTitle()} />
                    {video.getTitle()}
                  </a>
                </div>
              );
            }).toList()}
          </div>
        );
      })}

      <Pagination
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={videosTotal}
        onChange={handlePageChange}
      />
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