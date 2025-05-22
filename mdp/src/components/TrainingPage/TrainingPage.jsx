import React, { useState } from 'react';
import WeeklyCalendar from './WeeklyCalendar';
import DailyWorkout from '../DailyWorkout/DailyWorkout';
import CreateWorkoutButton from '../CreateWorkout/CreateWorkoutButton';
import WeeklyHistory from './WeeklyHistory';
import WorkoutSlider from './WorkoutSlider';

const TrainingPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateWorkout = () => {
    // In a real app, this would open a form or modal
    setShowCreateForm(true);
    alert("Cette fonctionnalité serait implémentée pour créer un nouvel entrainement");
    setShowCreateForm(false);
  };

  return (
    <div className="font-sans max-w-lg mx-auto pb-20">
      <div className="pt-2">
        <WeeklyCalendar />
        <DailyWorkout />
        <CreateWorkoutButton onClick={handleCreateWorkout} />
        <WeeklyHistory />
        <WorkoutSlider />
      </div>
    </div>
  );
};

export default TrainingPage;