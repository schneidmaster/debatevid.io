import React from 'react';
import PropTypes from 'prop-types';
import renderIf from 'render-if';
import abbreviate from 'number-abbreviate';
import classnames from 'classnames';
import { Video } from 'components/store/records';
import Tags from 'components/Video/components/Tags';

const VideoInfo = ({ video, loggedIn, favorited, favorite, unfavorite }) => {
  return (
    <div className='video-show'>
      <h3>
        {renderIf(loggedIn)(
          <i
            className={classnames('fa', 'fa-heart', 'favorite', { favorited })}
            onClick={() => favorited ? unfavorite() : favorite()}
          />
        )}
        {video.getTitle()}

        <div className='pull-right icons'>
          <i className='fa fa-eye' /> {abbreviate(video.views)}
          <i className='fa fa-heart' /> {abbreviate(video.favoritesCount)}
        </div>
      </h3>

      <div className='row'>
        <div className='col-md-12'>
          <div className='frame-wrapper'>
            <iframe {...video.getFrameProps()} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-9'>
          <Tags />
        </div>
        <div className='col-md-3 align-right'>
          <a href={`/users/${video.user.id}`}>
            <img src={video.user.avatar} alt={video.user.name} className='avatar' />
            {video.user.name}
          </a>
        </div>
      </div>
      <hr className='no-margin-top' />
      <div className='row'>
        <div className='col-md-12'>
          <h4>Tournament: <a href={`/tournaments/${video.tournament.id}`}>{video.tournament.getYearAndName()}</a></h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h4>Affirmative</h4>
          <p>
            School: <a href={`/schools/${video.affTeam.school.id}`}>{video.affTeam.school.getNameForCode()}</a>
          </p>
          <p>
            Team: <a href={`/teams/${video.affTeam.id}`}>{video.affTeam.getTeamCode()}</a>
          </p>
          <p>
            Debater: <a href={`/debaters/${video.affTeam.debaterOne.id}`}>{video.affTeam.debaterOne.getName()}</a>
            {renderIf(video.affTeam.debaterTwo)(
              <span>
                &nbsp;&amp; <a href={`/debaters/${video.affTeam.debaterTwo.id}`}>{video.affTeam.debaterTwo.getName()}</a>
              </span>
            )}
          </p>
        </div>

        <div className='col-md-6'>
          <h4>Negative</h4>
          <p>
            School: <a href={`/schools/${video.negTeam.school.id}`}>{video.negTeam.school.getNameForCode()}</a>
          </p>
          <p>
            Team: <a href={`/teams/${video.negTeam.id}`}>{video.negTeam.getTeamCode()}</a>
          </p>
          <p>
            Debater: <a href={`/debaters/${video.negTeam.debaterOne.id}`}>{video.negTeam.debaterOne.getName()}</a>
            {renderIf(video.negTeam.debaterTwo)(
              <span>
                &nbsp;&amp; <a href={`/debaters/${video.negTeam.debaterTwo.id}`}>{video.negTeam.debaterTwo.getName()}</a>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoInfo.propTypes = {
  video: PropTypes.instanceOf(Video).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  favorited: PropTypes.bool.isRequired,
  favorite: PropTypes.func.isRequired,
  unfavorite: PropTypes.func.isRequired,
};

export default VideoInfo;
