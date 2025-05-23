import React from 'react';
import ExerciseForm from '../components/ExerciseForm/ExerciseForm';

const EditExercisePage = () => {
  // Mock data for the exercise being edited
  const exerciseData = {
    name: 'Lat pulldown',
    muscles: ['muscle1'],
    sets: [{ reps: '12', weight: '40kg' }, { reps: '12', weight: '40' }, { reps: '12', weight: '40' }],
    restTime: 120,
    comments: 'super description de cet exo de ouf\nj\'adore suer et transpirer en homme musculeux'
  };

  return <ExerciseForm isEditMode={true} initialExercise={exerciseData} />;
};

export default EditExercisePage;