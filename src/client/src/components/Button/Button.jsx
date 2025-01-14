import React from 'react';
import PropTypes from  'prop-types';
import style from './button.module.css';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { BsPencil, BsPlusLg } from 'react-icons/bs';

const Button = ({ size, label, icon, background_color, on_click, disabled }) => {
    const icons = {
        check: <FaCheck></FaCheck>,
        pencil: <BsPencil></BsPencil>,
        trash: <FaTrashAlt></FaTrashAlt>,
        plus: <BsPlusLg></BsPlusLg>
    };
  return (
    <button
    type='button'
    className={`${style.button} ${style[size]} ${style[background_color]}`}
    onClick={on_click}
    disabled={ disabled ? 'disabled' : '' }>
      <span>{label || icons[icon]}</span>
    </button>
  )
};

Button.prototype = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    background_color: PropTypes.oneOf(['primary', 'green', 'blue', 'red']),
    label: PropTypes.string,
    icon: PropTypes.oneOf(['check', 'pencil', 'trash', 'plus']),
    disabled: PropTypes.bool,
    on_click: PropTypes.func
}; 

Button.defaultProps = {
    background_color: 'primary',
    size: 'medium',
    on_click: undefined,
    icon: undefined,
    disabled: false
};

export default Button;
