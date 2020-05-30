import React from "react";
import PropTypes from "prop-types";
import renderIf from "render-if";
import abbreviate from "number-abbreviate";
import classnames from "classnames";
import { Row, Col, Glyphicon } from "react-bootstrap";
import { Video } from "components/store/records";
import Tags from "components/Video/components/Tags";

const VideoInfo = ({ video, loggedIn, favorited, favorite, unfavorite }) => {
  return (
    <div className="video-show">
      <h3>
        {renderIf(loggedIn)(
          <Glyphicon
            glyph="heart"
            className={classnames("favorite", { favorited })}
            onClick={() => (favorited ? unfavorite() : favorite())}
          />
        )}
        {video.getTitle()}
      </h3>

      <Row>
        <Col xs={12}>
          <div className="frame-wrapper">
            <iframe {...video.getFrameProps()} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={9} xs={12}>
          <Tags />
        </Col>

        <Col md={3} xs={12} className="align-right">
          <div className="icons">
            <Glyphicon glyph="eye-open" /> {abbreviate(video.views)}
            <Glyphicon glyph="heart" /> {abbreviate(video.favoritesCount)}
          </div>

          <a href={`/users/${video.user.id}`}>
            <img
              src={video.user.avatar}
              alt={video.user.name}
              className="avatar"
            />
            {video.user.name}
          </a>
        </Col>
      </Row>

      <hr className="no-margin-top" />

      <Row>
        <Col xs={12}>
          <h4>
            Tournament:{" "}
            <a href={`/tournaments/${video.tournament.id}`}>
              {video.tournament.getYearAndName()}
            </a>
          </h4>
        </Col>
      </Row>

      <Row>
        <Col md={6} xs={12}>
          <h4>Affirmative</h4>
          <p>
            School:{" "}
            <a href={`/schools/${video.affTeam.school.id}`}>
              {video.affTeam.school.getName()}
            </a>
          </p>
          <p>
            Team:{" "}
            <a href={`/teams/${video.affTeamId}`}>
              {video.affTeam.getTeamCode()}
            </a>
          </p>
          <p>
            Debater:{" "}
            <a href={`/debaters/${video.affTeam.debaterOne.id}`}>
              {video.affTeam.debaterOne.getName()}
            </a>
            {renderIf(video.affTeam.debaterTwo)(() => (
              <span>
                &nbsp;&amp;{" "}
                <a href={`/debaters/${video.affTeam.debaterTwo.id}`}>
                  {video.affTeam.debaterTwo.getName()}
                </a>
              </span>
            ))}
          </p>
        </Col>

        <Col md={6} xs={12}>
          <h4>Negative</h4>
          <p>
            School:{" "}
            <a href={`/schools/${video.negTeam.school.id}`}>
              {video.negTeam.school.getName()}
            </a>
          </p>
          <p>
            Team:{" "}
            <a href={`/teams/${video.negTeamId}`}>
              {video.negTeam.getTeamCode()}
            </a>
          </p>
          <p>
            Debater:{" "}
            <a href={`/debaters/${video.negTeam.debaterOne.id}`}>
              {video.negTeam.debaterOne.getName()}
            </a>
            {renderIf(video.negTeam.debaterTwo)(() => (
              <span>
                &nbsp;&amp;{" "}
                <a href={`/debaters/${video.negTeam.debaterTwo.id}`}>
                  {video.negTeam.debaterTwo.getName()}
                </a>
              </span>
            ))}
          </p>
        </Col>
      </Row>
    </div>
  );
};

VideoInfo.propTypes = {
  video: PropTypes.instanceOf(Video).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  favorited: PropTypes.bool.isRequired,
  favorite: PropTypes.func.isRequired,
  unfavorite: PropTypes.func.isRequired
};

export default VideoInfo;
