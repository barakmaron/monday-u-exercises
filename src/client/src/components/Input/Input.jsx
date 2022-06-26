import React from 'react';
import PropTypes from  'prop-types';
import style from './input.module.css';

const Input = ({ size, label, id, required }) => {
  return (
    <>
      <input
      id={id}
      type='text'
      className={`${style.text_input} ${style[size]}`}
      placeholder=' '
      required={required}>
      </input>
      <label htmlFor={id}>{label}</label>
    </>
  )
};

Input.prototype = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    id: PropTypes.string,
    required: PropTypes.bool
}; 

Input.defaultProps = {
    size: 'medium',
    required: true
};

export default Input;
