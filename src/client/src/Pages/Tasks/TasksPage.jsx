import { React, useRef, useState, useEffect, useCallback } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Flex, Toast, Loader, Heading, Tooltip } from 'monday-ui-react-core';
import { useError } from '../../Hooks/useError';
import { useSuccessful } from '../../Hooks/useSuccessful';
import style from './tasks_page.module.css';
import TasksConnector from '../../components/TasksContainer/TaskContainerConnector';
import { useDebounce } from '../../Hooks/useDebounce';
import CheckBox from '../../components/CheckBox/CheckBox';


const TasksPage = ({ tasks, AddAction, ClearAllAction, SortByNameAction, successful, failed, is_loading, FailedAction, SearchAction, HideDoneAction, deleted }) => {
  const [pending, setPending] = useState(0);
  const [search, setSearch] = useState('');
  const input_ref = useRef(null);
  const input_search_ref = useRef(null);
  const errorHook = useError();
  const successfulHook = useSuccessful();
  const search_debounceHook = useDebounce(search, 200);

  useEffect(() => {
    const number_of_tasks = tasks.length;
    const number_of_done_tasks = tasks.filter(task => task.status).length;
    setPending(number_of_tasks - number_of_done_tasks);
  }, [tasks]);

  useEffect(() => {
    if (successful !== '')
      successfulHook.setASuccessful(successful);
  }, [successful])

  useEffect(() => {
    if (failed !== '')
      errorHook.setAnError(failed);
  }, [failed]);

  const add_call = useCallback(
    () => {
      if (input_ref.current.value) {
        AddAction(input_ref.current.value);
        input_ref.current.value = '';
      }
      else
        FailedAction(`Task cant be empty`);
    },
    [AddAction, FailedAction]
  );

  const handleEnterPressed = useCallback(event => {
    if (event.key === "Enter") {
      event.preventDefault();
      add_call();
    }
  }, [add_call])

  const clear_all_call = useCallback(
    () => {
      ClearAllAction();
    }, [ClearAllAction]
  );

  const sort_by_name_call = useCallback(
    () => {
      SortByNameAction();
    }, [SortByNameAction]
  );

  const search_call = useCallback(
    () => {
      SearchAction(input_search_ref.current.value);
    }, [SearchAction]
  );

  useEffect(() => {
    SearchAction(search_debounceHook);
  }, [SearchAction, search_debounceHook]
  );

  const onSearchChange = useCallback(() => {
    setSearch(input_search_ref.current.value);
  }, []);

  const hide_done_call = useCallback(
    () => {
      HideDoneAction();
    }, [HideDoneAction]);

  const restore_call_back = useCallback(
    () => {
      if (deleted.length) {
        const todo_value_to_add = deleted.is_pokemon ? deleted.PokemonDatum.pokemon_id : deleted.ItemName;
        AddAction(todo_value_to_add.toString());
      }
      else
        FailedAction(`There is no memory of deleted todo...`);
    }, [deleted, AddAction, FailedAction]
  );

  if (is_loading)
    return (<div className={style.loader_container}>
      <div>
        <Loader value={40} color={Loader.colors.PRIMARY} hasBackground />
      </div>
    </div>);

  return (
    <>
      <Flex>
        <Input size='fit_available' label="Add your new todo" input_ref={input_ref} on_key_press={handleEnterPressed}></Input>
        <Button background_color='green' size='small' icon='plus' on_click={add_call}></Button>
      </Flex>
      <Flex>
        <Input size='fit_available' label="Search" input_ref={input_search_ref} on_key_press={onSearchChange}></Input>
        <Button background_color='blue' size='small' icon='search' on_click={search_call}></Button>
      </Flex>
      <Flex justify={Flex.justify.SPACE_BETWEEN}>
        <Flex>
          <CheckBox id={'hide_done_tasks'} state={false} on_click={hide_done_call}></CheckBox>
          <Heading type={Heading.types.h3} value="Hide done todos" id="hide_done_h3" />
        </Flex>
        <Tooltip
          key={`restore_last_deleted`}
          immediateShowDelay={0}
          content="Restore last deleted todo">
          <Button size="small" background_color="blue" on_click={restore_call_back} icon="arrow"></Button>
        </Tooltip>
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
