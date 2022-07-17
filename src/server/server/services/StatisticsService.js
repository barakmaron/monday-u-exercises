const StorageService = require('./StorageService.js');
const dateformat = require( 'dateformat' );

async function GetCreatedStatistics() {
    const tasks = await StorageService.GetTasks();
    const dates = [];
    tasks.map(({ createdAt }) => {
        const date = dateformat(createdAt, "yyyy-mm-dd");
        const date_obj = dates.findIndex((date_in_array) => date_in_array.date === date)
        if(date_obj === -1)
            dates.push({ date: date, number_todos: 1});
        else
            dates[date_obj].number_todos += 1;
    });
    return dates;
}

async function GetCompletedStatistics() {
    const tasks = await StorageService.GetTasks();
    const data = {
        max_time_complete: 0,
        min_time_complete: 999999999,
        sum_time_complete: 0,
        number_completed: 0
    };
    tasks.map(({ status, createdAt, done }) => {
        if(status === true) {
            const crated_date = new Date(createdAt);
            const done_date = new Date(done);
            const diff = done_date.getTime() - crated_date.getTime();
            if(data.max_time_complete < diff)
                data.max_time_complete = diff
            if(data.min_time_complete > diff)
                data.min_time_complete = diff
            data.sum_time_complete += diff
            data.number_completed++;
        }
    });
    return data;
}

async function GetPokemonStatistics() {
    const tasks = await StorageService.GetTasks();
    const data = {
        pokemon_number: 0,
        regular_todo_number: 0
    };
    tasks.map(({ is_pokemon }) => {        
        is_pokemon ? data.pokemon_number++ : data.regular_todo_number++;
    });
    return data;
}


module.exports = {
    GetCreatedStatistics,
    GetCompletedStatistics,
    GetPokemonStatistics
}