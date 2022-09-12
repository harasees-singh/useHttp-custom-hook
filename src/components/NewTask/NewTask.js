import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [isLoading, error, TaskHandler] = useHttp('POST', 'https://react-http-ab3a2-default-rtdb.firebaseio.com/texts.json', props.onAddTask, () => {});
  return (
    <Section>
      <TaskForm onEnterTask={TaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
