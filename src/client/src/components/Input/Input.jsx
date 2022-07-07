import { React, useCallback, useState } from 'react';
import PropTypes from  'prop-types';
import style from './input.module.css';

const Input = ({ size, label, id, required, input_ref, on_key_press }) => {
  const fit_available = size === 'fit_available' ? style.fit_available : '';
  const [input, setInput] = useState('');
  const key_change = useCallback(
    event => {
      setInput(input_ref.current.value);
      on_key_press(event);
    }, [input_ref, on_key_press]
  );
  const clear_input = useCallback(
    event => {
      input_ref.current.value = '';
      setInput(input_ref.current.value);
      on_key_press(event);
    }, [input_ref, on_key_press]
  );
  return (
    <div className={`${style.input_div} ${fit_available}`}>
      <input
      id={id}
      type='text'
      className={`${style.text_input} ${style[size]}`}
      placeholder=' '
      required={required}
      ref={input_ref}
      onKeyUp={key_change}>
      </input>
      <label htmlFor={id}>{label}</label>
      {input !== '' && <button className={style.reset_input} onClick={clear_input}></button>}
    </div>
  )
};

Input.prototype = {
    size: PropTypes.oneOf(['small', 'medium', 'large', 'fit_available']),
    id: PropTypes.string,
    required: PropTypes.bool,
    on_key_press: PropTypes.func
}; 

Input.defaultProps = {
    size: 'medium',
    required: true,
    on_key_press: null
};

export default Input;
