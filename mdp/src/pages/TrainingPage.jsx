import WeeklyCalendar from '../components/WeeklyCalendar/WeeklyCalendar';
import CreateWorkoutButton from '../components/CreateWorkout/CreateWorkoutButton';
import WeeklyHistory from '../components/WeeklyHistory/WeeklyHistory';
import WorkoutSlider from '../components/WorkoutSlider/WorkoutSlider';

function TrainingPage() {
  return (
    <div className="App">
      <WeeklyCalendar />
      <CreateWorkoutButton />
      <WeeklyHistory />
      <WorkoutSlider />
    </div>
  );
}

export default TrainingPage;
