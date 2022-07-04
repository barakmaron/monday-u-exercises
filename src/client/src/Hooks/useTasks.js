import { useState, useEffect } from "react";
import ApiService from "../Api/ApiManger";

export const useTasks = (rerender) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            const tasks_from_server = await ApiService.GetResourceRequest('task');

            setTasks(tasks_from_server.tasks);
        };
        getTask();
    }, [rerender]);

    return tasks;
};