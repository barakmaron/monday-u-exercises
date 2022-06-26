import React from 'react';
import PropTypes from  'prop-types';
import style from './task.module.css';
import pokemon_style from './task_pokemon.module.css';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';

const Task = ({  number, item }) => {
  const text = item.is_pokemon ? `Catch ${item.ItemName}` : item.ItemName;
  //checkbox
  return (
    <li id={item.id} className={`${style.todo_task}`}>
      <div className={`${style.checkbox_container}`}>
        <CheckBox id={item.id} state={item.status}></CheckBox>
      </div>
      <div className={`${style.task_text_container}`}>
        <span className={`${style.task_number}`}>
          {number})
        </span>
        <span className={`${style.task_text}`}>
          {text}
        </span>
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
        {!item.is_pokemon && <Button size='small' icon='pencil' background_color='blue'></Button>}
        <Button size='small' icon='trash' background_color='red'></Button>
      </div>
    </li>
  )
};

Task.prototype = {
    item: PropTypes.object,
    number: PropTypes.number
}; 

Task.defaultProps = {
    number: 1
};

export default Task;
