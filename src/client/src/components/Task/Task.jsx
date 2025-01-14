import { React, useState, useRef } from 'react';
import PropTypes from  'prop-types';
import style from './task.module.css';
import pokemon_style from './task_pokemon.module.css';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import Input from '../Input/Input';
import { TbArrowWaveRightDown } from 'react-icons/tb';

const Task = ({  number, item, delete_call, complete_call, edit_call }) => {
  const [edit, setEdit] = useState(false);
  const edit_input_ref = useRef(null);

  const text = item.is_pokemon ? `Catch ${item.ItemName}` : item.ItemName;

  function EditTask() {
    edit_call(item.id, { task_text: edit_input_ref.current.value });
    setEdit((value) => !value);
  }
  return (
    <li id={item.id} className={`${style.todo_task}`}>
      <div className={`${style.checkbox_container}`}>
        <CheckBox id={item.id} state={item.status} on_click={complete_call}></CheckBox>
      </div>
      <div className={`${style.task_text_container}`}>
        <span className={`${style.task_number}`}>
          {number})
        </span>
        <span className={`${style.task_text}`}>
          {text}
        </span>
        {edit && <div className={style.edit_task}>
          <TbArrowWaveRightDown></TbArrowWaveRightDown>
          <Input size="small" label={item.ItemName} input_ref={edit_input_ref}></Input>
          <Button 
          background_color="green" 
          icon="check" 
          size="small"
          on_click={EditTask}></Button>
        </div>}
      </div>
      {item.is_pokemon && <div className={pokemon_style.image_sprites}> 
        {item.PokemonDatum.PokemonImages.map((image, index) => {
          const show_hide_class = index === 0 ? pokemon_style.show : pokemon_style.hide;
          return(
            <img 
            alt={item.ItemName}
            className={`${pokemon_style.pokemon_image} ${show_hide_class}`}
            key={`pokemon_id${item.PokemonDatum.id}image_id${image.id}`} 
            src={image.image}/>
          );
        })}
      </div>}
      <div className={`${style.task_buttons}`}>
        {!item.is_pokemon && <Button size='small' icon='pencil' background_color='blue' on_click={() => setEdit((value) => !value)}></Button>}
        <Button 
        size='small' 
        icon='trash' 
        background_color='red' 
        on_click={delete_call}></Button>
      </div>
    </li>
  )
};

Task.prototype = {
    item: PropTypes.object,
    number: PropTypes.number,
    delete_call: PropTypes.func,
    complete_call: PropTypes.func
}; 

Task.defaultProps = {
    number: 1,
    delete_call: null,
    complete_call: null
};

export default Task;
