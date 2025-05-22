import WeeklyCalendar from '../components/WeeklyCalendar/WeeklyCalendar';
import CreateWorkoutButton from '../components/CreateWorkout/CreateWorkoutButton';
import WeeklyHistory from '../components/WeeklyHistory/WeeklyHistory';
import WorkoutSlider from '../components/WorkoutSlider/WorkoutSlider';
import TabBar from '../components/TabBar/TabBar';

function TrainingPage() {
  return (
    <div className="App">
      <WeeklyCalendar />
      <CreateWorkoutButton />
      <WeeklyHistory />
      <WorkoutSlider />
      <TabBar />
    </div>
  );
}

export default TrainingPage;
