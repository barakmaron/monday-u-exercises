import { React, useRef, useState, useEffect, useCallback } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Flex, Toast } from 'monday-ui-react-core';
import { useError } from '../../Hooks/useError';
import { useSuccessful } from '../../Hooks/useSuccessful';
import style from './tasks_page.module.css';
import TasksConnector from '../../components/TasksContainer/TaskContainerConnector';


const TasksPage = ({ AddAction, ClearAllAction, SortByNameAction }) => {
  const [pending, setPending] = useState(0);
  const input_ref = useRef(null);
  const errorHook = useError();
  const successfulHook = useSuccessful();

  /*useEffect(() => {
      const number_of_tasks = tasks.length;
      const number_of_done_tasks = tasks.filter(task => task.status).length;
      setPending(number_of_tasks - number_of_done_tasks);
  }, [tasks]);*/

  const add_call = useCallback(
    () => {
      AddAction(input_ref.current.value);
      input_ref.current.value = '';
    },
    [AddAction]
  );

  const clear_all_call = useCallback(
    () => {
      ClearAllAction();
    }, [ClearAllAction]
  );

  const sort_by_name_call = useCallback(
    () =>  {
      SortByNameAction();
    }, [SortByNameAction]
  );

  return (
    <>
      <Flex>
        <Input size='fit_available' label="Add your new todo" input_ref={input_ref}></Input>
        <Button background_color='green' size='small' icon='plus' on_click={add_call}></Button>
      </Flex>
      <TasksConnector></TasksConnector>
      <span className={style.pending_tasks_text}>You have {pending} pending todo's</span>
      <Button size="large" background_color="red" on_click={clear_all_call} label="clear all"></Button>
      <Button size="large" background_color="primary" on_click={sort_by_name_call} label="sort by name"></Button>
      {errorHook.error && <Toast open type={Toast.types.NEGATIVE} autoHideDuration={5000}>
        {errorHook.message}
      </Toast>}
      {successfulHook.successful && <Toast open type={Toast.types.POSITIVE} autoHideDuration={5000}>
        {successfulHook.message}
      </Toast>}
    </>
  )
}

export default TasksPage;
