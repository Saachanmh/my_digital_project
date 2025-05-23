import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkoutSession = () => {
  const navigate = useNavigate();
  
  // Mock data for the workout session
  const workoutData = {
    title: "Push",
    duration: "1h30",
    calories: "560 kcal",
    exercises: [
      {
        id: 1,
        name: "Nom exercice",
        muscles: ["muscle1", "muscle1"],
        sets: "12 x 40kg  12 x 40kg  12 x ..."
      },
      {
        id: 2,
        name: "Nom exercice",
        muscles: ["muscle1"],
        sets: "12 reps  12 reps  12 reps"
      }
    ]
  };

  const handleGoBack = () => {
    navigate('/training'); // Navigate back to the training page
  };
  
  const handleStartWorkout = () => {
    // Navigate to the workout timer page
    navigate('/workout-timer');
  };
  
  const handlePostpone = () => {
    // Logic to postpone the workout
    alert("Session reportée à demain");
  };
  
  const handleEditExercise = (exerciseId) => {
    navigate(`/edit-exercise/${exerciseId}`);
  };
  
  const handleAddExercise = () => {
    navigate('/create-exercise');
  };

  return (
    <div className="p-4 bg-white min-h-screen relative">
      {/* Back button in top left corner */}
      <button 
        onClick={handleGoBack}
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center"
        aria-label="Return to training page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h1 className="text-2xl font-bold mb-6 text-center pt-2">{workoutData.title}</h1>
      
      {/* Duration and Calories */}
      <div className="flex gap-4 mb-6">
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-center">
          <span className="text-gray-600">{workoutData.duration}</span>
        </div>
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-center">
          <span className="text-gray-600">{workoutData.calories}</span>
        </div>
      </div>
      
      {/* Exercises Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Exercices</h2>
        
        {workoutData.exercises.map((exercise) => (
          <div key={exercise.id} className="bg-gray-100 rounded-xl p-4 mb-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-2">{exercise.name}</h3>
                <div className="flex gap-2 mb-2">
                  {exercise.muscles.map((muscle, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {muscle}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{exercise.sets}</p>
              </div>
              
              {/* Three dots menu button */}
              <button 
                className="text-gray-500 p-1"
                onClick={() => handleEditExercise(exercise.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Exercise Button */}
        <button 
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl mb-4"
          onClick={handleAddExercise}
        >
          Ajouter un exercice
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <button 
          onClick={handleStartWorkout}
          className="col-span-2 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium"
        >
          Commencer
        </button>
        <button 
          onClick={handlePostpone}
          className="bg-gray-200 text-gray-800 py-3 rounded-xl font-medium"
        >
          Reporter à demain
        </button>
      </div>
    </div>
  );
};

export default WorkoutSession;