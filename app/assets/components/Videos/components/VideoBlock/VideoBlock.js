import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import renderIf from 'render-if';
import { Video } from 'components/store/records';

const VideoBlock = ({ video, loggedIn, favorited, favorite, unfavorite }) => {
  return (
    <div className='col-md-4 video-preview' key={video.id}>
      {renderIf(loggedIn)(
        <div
          className={classnames('favorite', { favorited })}
          onClick={(e) => favorited ? unfavorite() : favorite()}
        >
          <i className='fa fa-favorite' />
        </div>
      )}
      <a href={`/videos/${video.id}`}>
        <img src={video.thumbnail} alt={video.getTitle()} />
        {video.getTitle()}
      </a>
    </div>
  );
};

VideoBlock.propTypes = {
  video: PropTypes.instanceOf(Video).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  favorited: PropTypes.bool,
  favorite: PropTypes.func.isRequired,
  unfavorite: PropTypes.func.isRequired,
};

export default VideoBlock;
