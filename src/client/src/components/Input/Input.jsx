import React from 'react';
import PropTypes from  'prop-types';
import style from './input.module.css';

const Input = ({ size, label, id, required, input_ref }) => {
  const fit_available = size === 'fit_available' ? style.fit_available : ''
  return (
    <div className={`${style.input_div} ${fit_available}`}>
      <input
      id={id}
      type='text'
      className={`${style.text_input} ${style[size]}`}
      placeholder=' '
      required={required}
      ref={input_ref}>
      </input>
      <label htmlFor={id}>{label}</label>
    </div>
  )
};

Input.prototype = {
    size: PropTypes.oneOf(['small', 'medium', 'large', 'fit_available']),
    id: PropTypes.string,
    required: PropTypes.bool
}; 

Input.defaultProps = {
    size: 'medium',
    required: true
};

export default Input;
