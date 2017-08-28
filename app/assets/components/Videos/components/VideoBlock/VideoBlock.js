import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Col, Glyphicon } from 'react-bootstrap';
import renderIf from 'render-if';
import abbreviate from 'number-abbreviate';
import { Video } from 'components/store/records';
import styles from './VideoBlock.css';

const VideoBlock = ({ video, loggedIn, favorited, favorite, unfavorite }) => {
  return (
    <Col md={4}>
      <div className={styles.videoPreview}>
        {renderIf(loggedIn)(
          <div
            className={classnames(styles.favorite, { [styles.favorited]: favorited })}
            onClick={(e) => favorited ? unfavorite() : favorite()}
          >
            <Glyphicon glyph='heart' />
          </div>
        )}
        <div className={styles.videoBlock}>
          <a href={`/videos/${video.id}`}>
            <img src={video.getThumbnail()} alt={video.getTitle()} />

            <div className={styles.videoInfo}>
              <div className={styles.videoTitle}>
                {video.getTitle()}
              </div>

              <div className={styles.videoStats}>
                <Glyphicon glyph='eye-open' /> {abbreviate(video.views)}
                <Glyphicon glyph='heart' /> {abbreviate(video.favoritesCount)}
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
