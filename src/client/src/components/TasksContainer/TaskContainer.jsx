import { React, useState, useEffect } from 'react';
import PropTypes from  'prop-types';
import style from './taskcontainer.module.css';
import { Tooltip, Loader } from 'monday-ui-react-core';
import TaskConnector from '../Task/TaskConnector';

const TaskContainer = ({ itemsEntities }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {    
    setIsLoading(true);
    setTasks(itemsEntities);
    setIsLoading(false);
  }, [itemsEntities]);

  if(isLoading)
    return <Loader size={40} />;
  return (
    <ul id={style.todo_tasks_container} className={tasks.length ? undefined : style.empty}>
      {tasks.map((task, index) => {
        const content = (task.done && task.status) ? `Was set as done at: ${task.done}` : `This item is not done it...`;
        return(
          <Tooltip 
            key={`task_id${task.id}tooltip`}
            immediateShowDelay={0} 
            content={content}>
            <TaskConnector
            key={`task_id${task.id}`}
            number={index + 1}
            item={task}
            id={task.id}></TaskConnector>
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
