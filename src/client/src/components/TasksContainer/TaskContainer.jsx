import React from 'react';
import PropTypes from  'prop-types';
import Task from '../Task/Task';
import style from './taskcontainer.module.css';
import { Tooltip } from 'monday-ui-react-core';

const TaskContainer = ({ tasks, delete_call, complete_call, edit_call }) => {
  return (
    <ul id={style.todo_tasks_container} className={tasks.length ? undefined : style.empty}>
      {tasks.map((task, index) => {
        const content = (task.done && task.status) ? `Was set as done at: ${task.done}` : `This item is not done it...`;
        return(
          <Tooltip 
            key={`task_id${task.id}tooltip`}
            immediateShowDelay={0} 
            content={content}>
            <Task
            key={`task_id${task.id}`}
            number={index + 1}
            item={task}
            delete_call={() => delete_call(task.id)}
            complete_call={() => complete_call(task.id)}
            edit_call={edit_call}></Task>
          </Tooltip>
        );
      })}
    </ul>
  );
};

TaskContainer.prototype = {
    tasks: PropTypes.array,
    delete_call: PropTypes.func,
    complete_call: PropTypes.func,
    edit_call: PropTypes.func
}; 

TaskContainer.defaultProps = {
    tasks: [],
    delete_call: null,
    complete_call: null,
    edit_call: null
};

export default TaskContainer;
