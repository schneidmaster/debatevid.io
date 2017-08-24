import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import Select from 'components/common/RFReactSelect';
import { Map } from 'immutable';
import classnames from 'classnames';

const required = value => value || value === 0 ? undefined : 'Required';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => {
  return (
    <input {...input} type={type} placeholder={label} className={classnames(className, { error: touched && error })} />
  );
};

const Details = ({ hide, handleSubmit, levels, types, tags }) => {
  if(hide) {
    return null;
  } else {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Video details</h3>
        </div>
        <div className='panel-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Level</label>
              <Field
                name='level'
                options={levels.map((value, label) => ({ value, label })).toArray()}
                component={Select}
                validate={[required]}
              />
            </div>

            <div className='form-group'>
              <label>Debate type</label>
              <Field
                name='debateType'
                options={types.map((value, label) => ({ value, label })).toArray()}
                component={Select}
                validate={[required]}
              />
            </div>

            <div className='form-group'>
              <label>Year</label>
              <Field
                className='form-control'
                name='year'
                component={renderField}
                type='number'
                validate={[required]}
              />
            </div>

            <div className='form-group'>
              <label>Tags</label>
              <Field
                name='type'
                options={tags.map((tag) => ({ value: String(tag.id), label: tag.title })).toArray()}
                component={Select}
                multi
              />
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

Details.propTypes = {
  hide: PropTypes.bool.isRequired,
  levels: PropTypes.instanceOf(Map).isRequired,
  types: PropTypes.instanceOf(Map).isRequired,
  tags: PropTypes.instanceOf(Map).isRequired,
};

export default Details;
