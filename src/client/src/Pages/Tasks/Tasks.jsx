import { React, useRef, useState } from 'react';
import TaskContainer from '../../components/TasksContainer/TaskContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Flex, Toast } from 'monday-ui-react-core';
import { useTasks } from '../../Hooks/useTasks';
import { AddNewResourceRequest, DeleteResourceRequest, PatchResourceRequest, PutResourceRequest } from '../../Api/ApiManger';
import { useError } from '../../Hooks/useError';


const Tasks = () => {
  const [rerender, setRerender] = useState(false);
  const tasks = useTasks(rerender);
  const input_ref = useRef(null);
  const errorHook = useError();

  async function AddTask() {
    try {
      await AddNewResourceRequest('task', { task: input_ref.current.value });
      input_ref.current.value = '';
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function DeleteTask(id) {
    try {
      await DeleteResourceRequest(`task/${id}`);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function CompleteTask(id) {
    try {
      await PatchResourceRequest(`task/${id}`);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

  async function EditTask(id, data) {
    try {
      await PutResourceRequest(`task/${id}`, data);
      setRerender((value) => !value);
    } catch (error) {
      errorHook.setAnError(`Http code ${error.statusCode}: ${error.message}`);
    }
  }

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
        edit_call={EditTask}
        on_error={errorHook.setAnError}></TaskContainer>
      {errorHook.error && <Toast open type={Toast.types.NEGATIVE} autoHideDuration={5000}>
        {errorHook.message}
      </Toast>}
    </>
  )
}

export default Tasks;
