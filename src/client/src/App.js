import { Heading } from 'monday-ui-react-core';
import { Tab, DialogContentContainer } from 'monday-ui-react-core';
import styles from './App.module.css';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom';

import Tasks from './Pages/Tasks/Tasks';



function App() {
  const navigate = useNavigate();
  return (   
    <div id={styles.main_container}>
      <Heading
      type={Heading.types.h1}
      value={`TODO List`}
      />
      <DialogContentContainer id={styles.container} className={styles.white_box}>
        <Tab onClick={() => navigate('/tasks')} active>Tasks</Tab>
        <Tab onClick={() => navigate('/test')} >Disabled</Tab>
        <Tab>Active</Tab>
        <Routes>
          <Route exact path='/' element={<Navigate to="/tasks" />}></Route>
          <Route exact path='/tasks' element={<Tasks></Tasks>}></Route>
        </Routes> 
      </DialogContentContainer>
    </div>
  );
}

export default App;
