import React from 'react';
import { Row, Col } from 'react-bootstrap/es';
import Segments from 'components/Submit/components/Segments';
import Details from 'components/Submit/components/Details';

const SubmitApp = () => {
  return (
    <div>
      <h1>Submit Video</h1>

      <Row>
        <Col md={6} xs={12}>
          <Segments />
        </Col>
        <Col md={6} xs={12}>
          <Details />
        </Col>
      </Row>
    </div>
  );
};

export default SubmitApp;
