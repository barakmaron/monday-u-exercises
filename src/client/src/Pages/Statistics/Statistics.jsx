import { React, useState } from 'react';
import { useStatistics } from '../../Hooks/useStatustics';
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  Title, 
  CategoryScale,
  LinearScale,
  BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Heading, Divider } from 'monday-ui-react-core';
import StatisticsInitObjects from '../../globals/StatisticsInitObjects';
import style from './statistics.module.css';

ChartJS.register(ArcElement, 
  Tooltip, 
  Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const [pie_created_data, setPieCreatedData] = useState(StatisticsInitObjects.CREATED_OBJECT);
  const [bar_pokemon_data, setBarPokemonData] = useState(StatisticsInitObjects.POKEMON_OBJECT);

  const [completed, setCompleted] = useState(StatisticsInitObjects.COMPLETED_OBJECT);
  useStatistics(setPieCreatedData, setBarPokemonData, setCompleted);
  return ( <div className={style.statistics_main_container}>
      <div className={style.statistics_container}>
        <Heading type={Heading.types.h2} value="Number of todos created in each day" id="created_pie_h2"/>
        <div >
          <Pie data={pie_created_data}/>
        </div>
      </div>
      <div className={style.statistics_container}>
        <Heading type={Heading.types.h2} value="Number of pokemon vs regular tasks" id="pokemon_bar_h2"/>
        <div>
          <Bar data={bar_pokemon_data}/>
        </div>
      </div>
      <Divider direction={Divider.directions.HORIZONTAL} />
      <div className={style.statistics_container}>
        <Heading type={Heading.types.h2} value="Completed time statistics" id="completed_h2"/>      
        <div>
          <Heading type={Heading.types.h3} value="Max time:" id="max_time_h3"/>
          {completed.max.days} days {completed.max.hours} hours {completed.max.minutes} minuets
        </div>
        <div>
          <Heading type={Heading.types.h3} value="Min time:" id="Min_time_h3"/>
          {completed.min.days} days {completed.min.hours} hours {completed.min.minutes} minuets
        </div>
        <div>
          <Heading type={Heading.types.h3} value="Average time:" id="max_time_h3"/>
          {completed.average.days} days {completed.average.hours} hours {completed.average.minutes} minuets
        </div>
        <div>
          <Heading type={Heading.types.h3} value="Number of completed todos:" id="number_completed_h3"/>
          {completed.number_completed} todos
        </div>
      </div>
  </div>);
};

export default Statistics;
