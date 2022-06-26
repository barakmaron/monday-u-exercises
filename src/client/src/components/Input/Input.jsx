import React from 'react';
import PropTypes from  'prop-types';
import style from './button.module.css';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { BsPencil, BsPlusLg } from 'react-icons/bs';

const Button = ({ size, label, icon, background_color, on_click }) => {
    const icons = {
        check: <FaCheck></FaCheck>,
        pencil: <BsPencil></BsPencil>,
        trash: <FaTrashAlt></FaTrashAlt>,
        plus: <BsPlusLg></BsPlusLg>
    };
  return (
    <button
    type='button'
    className={`${style[size]} ${style[background_color]}`}
    onClick={on_click}>
      <span>{label || icons[icon]}</span>
    </button>
  )
};

Button.prototype = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    background_color: PropTypes.oneOf(['primary', 'green', 'blue', 'red']),
    label: PropTypes.string,
    icon: PropTypes.oneOf(['check', 'pencil', 'trash', 'plus']),
    on_click: PropTypes.func
}; 

Button.defaultProps = {
    background_color: 'primary',
    size: 'medium',
    onClick: undefined,
    icon: undefined
};

export default Button;
