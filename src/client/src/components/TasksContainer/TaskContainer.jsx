import React from 'react';
import PropTypes from  'prop-types';
import Task from '../Task/Task';
import style from './taskcontainer.module.css';

const TaskContainer = ({ tasks }) => {
  return (
    <ul id={style.todo_tasks_container} className={!tasks.length && style.empty}>
      {tasks.map((task, index) => {
        return(
          <Task
          key={`task_id${task.id}`}
          number={index + 1}
          item={task}></Task>
        );
      })}
    </ul>
  )
};

TaskContainer.prototype = {
    tasks: PropTypes.array
}; 

TaskContainer.defaultProps = {
    tasks: []
};

export default TaskContainer;
