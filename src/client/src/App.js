import { Heading } from 'monday-ui-react-core';
import { Tab, DialogContentContainer } from 'monday-ui-react-core';
import styles from './App.module.css';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from 'react-router-dom';

import Statistics from './Pages/Statistics/Statistics';
import TasksPageConnector from './Pages/Tasks/TasksPageConnector';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  return (   
    <div id={styles.main_container}>
      <Heading
      type={Heading.types.h1}
      value={`TODO List`}
      />
      <DialogContentContainer id={styles.container} className={styles.white_box}>
        <Tab
        onClick={() => navigate('/tasks')}
        active={location.pathname === '/tasks'}>Tasks</Tab>
        <Tab 
        onClick={() => navigate('/statistics')} 
        active={location.pathname === '/statistics'}>statistics</Tab>
        <Routes>
          <Route exact path='/' element={<Navigate to="/tasks" />}></Route>
          <Route exact path='/tasks' element={<TasksPageConnector></TasksPageConnector>}></Route>
          <Route exact path='/statistics' element={<Statistics></Statistics>}></Route>
        </Routes> 
      </DialogContentContainer>
    </div>
  );
}

export default App;
