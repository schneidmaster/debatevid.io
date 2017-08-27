import React from 'react';
import PropTypes from 'prop-types';
import Select, { Creatable } from 'react-select';
import classnames from 'classnames';

RFReactSelect.defaultProps = {
  multi: false,
  className: '',
  creatable: false,
};

RFReactSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
  className: PropTypes.string,
  creatable: PropTypes.bool,
};

export default function RFReactSelect({ input, options, multi, className, meta: { touched, error }, creatable, onNewOptionClick }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const transformedValue = transformValue(value, options, multi, creatable);

  let Component;
  if(creatable) {
    Component = Creatable;
  } else {
    Component = Select;
  }

  return (
    <Component
      valueKey='value'
      name={name}
      value={transformedValue}
      multi={multi}
      options={options}
      onChange={multi
        ? multiChangeHandler(onChange)
        : singleChangeHandler(onChange)
      }
      onBlur={() => onBlur(value)}
      onFocus={onFocus}
      className={classnames(className, { error: touched && error })}
      onNewOptionClick={onNewOptionClick}
    />
  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
  return function handleSingleChange(value) {
    func(value ? value.value : '');
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return function handleMultiHandler(values) {
    func(values.map(value => value.value));
  };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select 
 * wants the value in the form { value: "grape", label: "Grape" }
 * 
 * * For multi select, Redux Form keeps the value as array of strings, while React Select 
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi, creatable) {
  if (creatable && isNaN(value)) return { label: value, value };
  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option => {
    return multi
      ? value.indexOf(option.value) !== -1
      : option.value === value;
  });

  return multi ? filteredOptions : filteredOptions[0];
}
