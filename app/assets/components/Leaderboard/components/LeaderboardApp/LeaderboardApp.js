import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Row, Col, Table, Panel, Tooltip, Glyphicon, OverlayTrigger } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const LeaderboardApp = ({ tagsPage, videosPage, scorePage, itemsPerPage, tagsUsers, videosUsers, scoreUsers, setTagsPage, setVideosPage, setScorePage }) => {
  const tooltip = (
    <Tooltip id='score-tooltip'>
      3 points per video, 1 point per tag
    </Tooltip>
  );

  return (
    <Row>
      <Col md={4} xs={12}>
        <Panel header='Top score'>
          <Table striped>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>
                  Score
                  {' '}
                  <OverlayTrigger placement='right' overlay={tooltip}>
                    <Glyphicon glyph='question-sign' />
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              {scoreUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className='text-center'>
            <Pagination
              activePage={scorePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={scoreUsers.size}
              onChange={setScorePage}
            />
          </div>
        </Panel>
      </Col>

      <Col md={4} xs={12}>
        <Panel header='Top submitters'>
          <Table striped>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Videos</th>
              </tr>
            </thead>
            <tbody>
              {videosUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.videosCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className='text-center'>
            <Pagination
              activePage={videosPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={videosUsers.size}
              onChange={setVideosPage}
            />
          </div>
        </Panel>
      </Col>

      <Col md={4} xs={12}>
        <Panel header='Top taggers'>
          <Table striped>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {tagsUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.tagsCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className='text-center'>
            <Pagination
              activePage={tagsPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={tagsUsers.size}
              onChange={setTagsPage}
            />
          </div>
        </Panel>
      </Col>
    </Row>
  );
};

LeaderboardApp.propTypes = {
  tagsPage: PropTypes.number.isRequired,
  videosPage: PropTypes.number.isRequired,
  scorePage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  tagsUsers: PropTypes.instanceOf(List).isRequired,
  videosUsers: PropTypes.instanceOf(List).isRequired,
  scoreUsers: PropTypes.instanceOf(List).isRequired,
  setTagsPage: PropTypes.func.isRequired,
  setVideosPage: PropTypes.func.isRequired,
  setScorePage: PropTypes.func.isRequired,
};

export default LeaderboardApp;
