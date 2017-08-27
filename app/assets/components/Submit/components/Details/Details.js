import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import Select from 'components/common/RFReactSelect';
import renderIf from 'render-if';
import classnames from 'classnames';

const required = value => value || value === 0 ? undefined : 'Required';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => {
  return (
    <input {...input} type={type} placeholder={label} className={classnames(className, { error: touched && error })} />
  );
};

const Details = ({ hide, handleSubmit, levels, types, debateType, year, tournaments, tags, schools, affSchool, negSchool, debaters }) => {
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
                name='debateLevel'
                options={levels}
                component={Select}
                validate={[required]}
              />
            </div>

            <div className='form-group'>
              <label>Debate type</label>
              <Field
                name='debateType'
                options={types}
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

            {renderIf(year)(
              <div className='form-group'>
                <label>Tournament</label>
                <Field
                  name='tournament'
                  options={tournaments}
                  component={Select}
                  validate={[required]}
                  creatable
                />
              </div>
            )}

            <div className='form-group'>
              <label>Tags</label>
              <Field
                name='tags'
                options={tags}
                component={Select}
                multi
              />
            </div>

            <hr />

            <div className='form-group'>
              <label>Aff School</label>
              <Field
                name='affSchool'
                options={schools}
                component={Select}
                validate={[required]}
                creatable
              />
            </div>

            {renderIf(affSchool)(
              <div>
                <div className='form-group'>
                  <label>{debateType === 2 ? 'Aff Debater' : 'Aff Debater 1'}</label>
                  <Field
                    name='affDebaterOne'
                    options={debaters}
                    component={Select}
                    validate={[required]}
                    creatable
                  />
                </div>

                {renderIf(debateType !== 2)(
                  <div className='form-group'>
                    <label>Aff Debater 2</label>
                    <Field
                      name='affDebaterTwo'
                      options={debaters}
                      component={Select}
                      validate={[required]}
                      creatable
                    />
                  </div>
                )}
              </div>
            )}

            <hr />

            <div className='form-group'>
              <label>Neg School</label>
              <Field
                name='negSchool'
                options={schools}
                component={Select}
                validate={[required]}
                creatable
              />
            </div>

            {renderIf(negSchool)(
              <div>
                <div className='form-group'>
                  <label>{debateType === 2 ? 'Neg Debater' : 'Neg Debater 1'}</label>
                  <Field
                    name='negDebaterOne'
                    options={debaters}
                    component={Select}
                    validate={[required]}
                    creatable
                  />
                </div>

                {renderIf(debateType !== 2)(
                  <div className='form-group'>
                    <label>Neg Debater 2</label>
                    <Field
                      name='negDebaterTwo'
                      options={debaters}
                      component={Select}
                      validate={[required]}
                      creatable
                    />
                  </div>
                )}
              </div>
            )}

            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

Details.propTypes = {
  hide: PropTypes.bool.isRequired,
  levels: PropTypes.instanceOf(Array).isRequired,
  types: PropTypes.instanceOf(Array).isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
  tournaments: PropTypes.instanceOf(Array).isRequired,
  schools: PropTypes.instanceOf(Array).isRequired,
  debaters: PropTypes.instanceOf(Array).isRequired,
  debateType: PropTypes.number,
  year: PropTypes.number,
  affSchool: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  negSchool: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  handleSubmit: PropTypes.func.isRequired,
};

export default Details;
