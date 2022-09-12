import React, { useEffect, useState, useCallback } from 'react';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, error, TaskHandler] = useHttp('GET', 'https://react-http-ab3a2-default-rtdb.firebaseio.com/texts.json', useCallback(() => {}, []), setTasks);
  
  useEffect(() => {
    TaskHandler();
  }, [TaskHandler]);

  const taskAddHandler = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={TaskHandler}
      />
    </React.Fragment>
  );
}

export default App;
