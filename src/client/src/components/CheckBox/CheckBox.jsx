import { React, useState } from 'react';
import PropTypes from  'prop-types';
import style from './checkbox.module.css';

const CheckBox = ({ id, state, on_click }) => {
  const [checked, setChecked] = useState(state);
  function handleChange(){
    setChecked((value) => !value);
  }
  return (
    <label className={style.checkbox_label}>
      <input 
      type="checkbox" 
      className={style.checkbox_complete} 
      value="" 
      id={id}
      onChange={handleChange}
      checked={checked} 
      onClick={on_click}></input>
      <span className={style.checkbox_mark}></span>
    </label>
  )
};

CheckBox.prototype = {
    id: PropTypes.number,
    state: PropTypes.bool,
    on_click: PropTypes.func
}; 

CheckBox.defaultProps = {
    state: false
};

export default CheckBox;
