import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Col } from 'react-bootstrap';
import renderIf from 'render-if';
import abbreviate from 'number-abbreviate';
import { Video } from 'components/store/records';

const VideoBlock = ({ video, loggedIn, favorited, favorite, unfavorite }) => {
  return (
    <Col md={4}>
      <div className='video-preview'>
        {renderIf(loggedIn)(
          <div
            className={classnames('favorite', { favorited })}
            onClick={(e) => favorited ? unfavorite() : favorite()}
          >
            <i className='fa fa-favorite' />
          </div>
        )}
        <div className='video-block'>
          <a href={`/videos/${video.id}`}>
            <img src={video.getThumbnail()} alt={video.getTitle()} />

            <div className='video-info'>
              <div className='video-title'>
                {video.getTitle()}
              </div>

              <div className='video-stats'>
                <i className='fa fa-eye' />{abbreviate(video.views)}
                <i className='fa fa-heart' /> {abbreviate(video.favoritesCount)}
              </div>
            </div>
          </a>
        </div>
      </div>
    </Col>
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
