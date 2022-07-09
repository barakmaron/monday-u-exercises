import { React, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from  'prop-types';
import style from './task.module.css';
import pokemon_style from './task_pokemon.module.css';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import Input from '../Input/Input';
import { TbArrowWaveRightDown } from 'react-icons/tb';

const Task = ({  number, item, id, SetCompleteAction, SetDeleteAction, EditAction, search, hide_done }) => {
  const [edit, setEdit] = useState(false);
  const [render_flag, setRenderFlag] = useState(true);  
  const [search_flag, setSearch_flag] = useState(true);
  const edit_input_ref = useRef(null);

  const text = item.is_pokemon ? `Catch ${item.ItemName}` : item.ItemName;

  const complete_call = useCallback(
    () => {
      SetCompleteAction(id);
    },
    [SetCompleteAction, id]
  );

  const delete_call = useCallback(
    () => {
      SetDeleteAction(id);
    },
    [SetDeleteAction, id]
  );

  const edit_call = useCallback(
    () => {
      EditAction(id, edit_input_ref.current.value);
      setEdit((value) => !value);
    },
    [EditAction, id]
  );

  useEffect(() => {
    if(text.toLowerCase().indexOf(search) !== -1 )
      setSearch_flag(true);
    else if(search === '')
      setSearch_flag(true);
    else 
      setSearch_flag(false);
  }, [search, text]);

  useEffect(() => {    
    if(hide_done && item.status)
      setRenderFlag(false);
    else
      setRenderFlag(true);
  }, [hide_done, item.status]);
  

  if(search_flag && render_flag)
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
          on_click={edit_call}></Button>
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
