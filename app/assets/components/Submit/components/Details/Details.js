import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form/es/immutable';
import Select from 'components/common/RFReactSelect';
import renderIf from 'render-if';
import classnames from 'classnames';

const required = value => value || value === 0 ? undefined : 'Required';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => {
  return (
    <input {...input} type={type} placeholder={label} className={classnames(className, { error: touched && error })} />
  );
};

const Details = ({ hide, handleSubmit, levels, types, debateType, year, tournaments, tags, schools, affSchool, negSchool, affDebaters, negDebaters }) => {
  if(hide) {
    return null;
  } else {
    return (
      <Panel header='Video details'>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <ControlLabel>Level</ControlLabel>
            <Field
              name='debateLevel'
              options={levels}
              component={Select}
              validate={[required]}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Debate type</ControlLabel>
            <Field
              name='debateType'
              options={types}
              component={Select}
              validate={[required]}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Year</ControlLabel>
            <Field
              className='form-control'
              name='year'
              component={renderField}
              type='number'
              validate={[required]}
            />
          </FormGroup>

          {renderIf(year)(
            <FormGroup>
              <ControlLabel>Tournament</ControlLabel>
              <Field
                name='tournament'
                options={tournaments}
                component={Select}
                validate={[required]}
                creatable
              />
            </FormGroup>
          )}

          <FormGroup>
            <ControlLabel>Tags</ControlLabel>
            <Field
              name='tags'
              options={tags}
              component={Select}
              creatable
              multi
            />
          </FormGroup>

          <hr />

          <FormGroup>
            <ControlLabel>Aff School</ControlLabel>
            <Field
              name='affSchool'
              options={schools}
              component={Select}
              validate={[required]}
              creatable
            />
          </FormGroup>

          {renderIf(affSchool)(
            <div>
              <FormGroup>
                <ControlLabel>{debateType === 2 ? 'Aff Debater' : 'Aff Debater 1'}</ControlLabel>
                <Field
                  name='affDebaterOne'
                  options={affDebaters}
                  component={Select}
                  validate={[required]}
                  creatable
                />
              </FormGroup>

              {renderIf(debateType !== 2)(
                <FormGroup>
                  <ControlLabel>Aff Debater 2</ControlLabel>
                  <Field
                    name='affDebaterTwo'
                    options={affDebaters}
                    component={Select}
                    validate={[required]}
                    creatable
                  />
                </FormGroup>
              )}
            </div>
          )}

          <hr />

          <FormGroup>
            <ControlLabel>Neg School</ControlLabel>
            <Field
              name='negSchool'
              options={schools}
              component={Select}
              validate={[required]}
              creatable
            />
          </FormGroup>

          {renderIf(negSchool)(
            <div>
              <FormGroup>
                <ControlLabel>{debateType === 2 ? 'Neg Debater' : 'Neg Debater 1'}</ControlLabel>
                <Field
                  name='negDebaterOne'
                  options={negDebaters}
                  component={Select}
                  validate={[required]}
                  creatable
                />
              </FormGroup>

              {renderIf(debateType !== 2)(
                <FormGroup>
                  <ControlLabel>Neg Debater 2</ControlLabel>
                  <Field
                    name='negDebaterTwo'
                    options={negDebaters}
                    component={Select}
                    validate={[required]}
                    creatable
                  />
                </FormGroup>
              )}
            </div>
          )}

          <Button type='submit' bsStyle='primary'>Submit</Button>
        </form>
      </Panel>
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
  affDebaters: PropTypes.instanceOf(Array).isRequired,
  negDebaters: PropTypes.instanceOf(Array).isRequired,
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
