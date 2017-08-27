import React from 'react';
import Segments from 'components/Submit/components/Segments';
import Details from 'components/Submit/components/Details';

const SubmitApp = () => {
  return (
    <div>
      <h1>Submit Video</h1>

      <div className='row'>
        <div className='col-md-6 col-xs-12'>
          <Segments />
        </div>
        <div className='col-md-6 col-xs-12'>
          <Details />
        </div>
      </div>
    </div>
  );
};

export default SubmitApp;
