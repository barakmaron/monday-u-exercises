import { React, useRef, useState, useEffect } from 'react';
import TaskContainer from '../../components/TasksContainer/TaskContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Flex, Toast } from 'monday-ui-react-core';
import { useTasks } from '../../Hooks/useTasks';
import { AddNewResourceRequest, DeleteResourceRequest, PatchResourceRequest, PutResourceRequest } from '../../Api/ApiManger';
import { useError } from '../../Hooks/useError';
import { useSuccessful } from '../../Hooks/useSuccessful';
import style from './tasks_page.module.css';


const Tasks = () => {
  const [rerender, setRerender] = useState(false);
  const [pending, setPending] = useState(0);
  const tasks = useTasks(rerender);
  const input_ref = useRef(null);
  const errorHook = useError();
  const successfulHook = useSuccessful();

  async function AddTask() {
    try {
      await AddNewResourceRequest('task', { task: input_ref.current.value });
      successfulHook.setASuccessful(`New Todo was added`);
      input_ref.current.value = '';
      setRerender((value) => !value);      
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function DeleteTask(id) {
    try {
      await DeleteResourceRequest(`task/${id}`);
      successfulHook.setASuccessful(`Todo was deleted successfully`);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function CompleteTask(id) {
    try {
      await PatchResourceRequest(`task/${id}`);
      successfulHook.setASuccessful(`Todo was set successfully`);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function EditTask(id, data) {
    try {
      await PutResourceRequest(`task/${id}`, data);
      successfulHook.setASuccessful(`Todo was edited successfully`);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  useEffect(() => {
      const number_of_tasks = tasks.length;
      const number_of_done_tasks = tasks.filter(task => task.status).length;
      setPending(number_of_tasks - number_of_done_tasks);
  }, [tasks]);

  return (
    <>
      <Flex>
        <Input size='fit_available' label="Add your new todo" input_ref={input_ref}></Input>
        <Button background_color='green' size='small' icon='plus' on_click={AddTask}></Button>
      </Flex>
      <TaskContainer
        tasks={tasks}
        delete_call={DeleteTask}
        complete_call={CompleteTask}
        edit_call={EditTask}></TaskContainer>
      <span className={style.pending_tasks_text}>You have {pending} pending todo's</span>
      <Button size="large" background_color="red" on_click={()=>{}} label="clear all"></Button>
      <Button size="large" background_color="primary" on_click={()=>{}} label="sort by name"></Button>
      {successfulHook.error && <Toast open type={Toast.types.NEGATIVE} autoHideDuration={5000}>
        {errorHook.message}
      </Toast>}
      {successfulHook.successful && <Toast open type={Toast.types.POSITIVE} autoHideDuration={5000}>
        {successfulHook.message}
      </Toast>}
    </>
  )
}

export default Tasks;
