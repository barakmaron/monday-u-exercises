import { useEffect } from "react";
import { GetResourceRequest } from "../Api/ApiManger";
import { randomColor } from 'randomcolor';

export const useStatistics = (setPieCreatedData, setBarPokemonData,setCompleted) => {
    useEffect(() => {
        const getStatistics = async () => {
            const created_from_server = await GetResourceRequest('statistics/created');
            const completed_from_server = await GetResourceRequest('statistics/completed');
            const pokemons_ratio_from_server = await GetResourceRequest('statistics/pokemon');            
            setPieCreatedData(() => {
                const labels = created_from_server.data.map(({date}) => date);
                const data = created_from_server.data.map(({number_todos}) => number_todos);
                const bgColor = created_from_server.data.map(() => randomColor());
                return ({
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: bgColor,
                            borderWidth: 2,
                        },
                    ]
                })
            });

            setBarPokemonData(() => {
                const data = [pokemons_ratio_from_server.data.pokemon_number, pokemons_ratio_from_server.data.regular_todo_number];
                return ({
                    labels: ["pokemons", "Regular todo"],
                    datasets: [
                        {
                            label: "todos",
                            data: data,
                            backgroundColor: randomColor()
                        }
                    ]
                });
            });

            setCompleted(() => {
                const max_time = new Date(completed_from_server.data.max_time_complete);
                const min_time = new Date(completed_from_server.data.min_time_complete);
                const average_time = new Date(completed_from_server.data.sum_time_complete / completed_from_server.data.number_completed);
                return({
                    max: {
                        days: max_time.getUTCDate() - 1,
                        hours: max_time.getUTCHours(),
                        minutes: max_time.getUTCMinutes()
                    },
                    min: {
                        days: min_time.getUTCDate() - 1,
                        hours: min_time.getUTCHours(),
                        minutes: min_time.getUTCMinutes()
                    },
                    average: {
                        days: average_time.getUTCDate() - 1,
                        hours: average_time.getUTCHours(),
                        minutes: average_time.getUTCMinutes()
                    },
                    number_completed: completed_from_server.data.number_completed
                });
            });
        };
        getStatistics();
        return () => {};
    }, [setBarPokemonData, setCompleted, setPieCreatedData]);
};