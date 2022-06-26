import React from 'react';
import PropTypes from  'prop-types';
import style from './checkbox.module.css';

const CheckBox = ({ id, state }) => {
  const checked = state ? 'checked' : ''
  return (
    <label className={style.checkbox_label}>
      <input type="checkbox" className={style.checkbox_complete} value="" id={id}
      checked={checked}></input>
      <span className={style.checkbox_mark}></span>
    </label>
  )
};

CheckBox.prototype = {
    id: PropTypes.number,
    state: PropTypes.bool
}; 

CheckBox.defaultProps = {
    state: false
};

export default CheckBox;
