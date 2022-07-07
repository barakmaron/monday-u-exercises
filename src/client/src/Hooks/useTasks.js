import { useState, useEffect } from "react";
import { GetResourceRequest } from "../Api/ApiManger";

export const useTasks = (rerender) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            const tasks_from_server = await GetResourceRequest('task');

            setTasks(tasks_from_server);
        };
        getTask();
    }, [rerender]);

    return tasks;
};