import React from 'react';

const DailyWorkout = () => {
  // Mock data for current workout
  const currentWorkout = {
    title: "Mon entrainement du jour",
    exercises: "Pecs - Épaules - Triceps",
    completed: false
  };

  return (
    <div className="px-4 mb-5">
      <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-medium mb-2">{currentWorkout.title}</h3>
          <p className="text-sm text-gray-600">{currentWorkout.exercises}</p>
        </div>
        <div>
          <div className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center ${
            currentWorkout.completed ? 'bg-green-500 border-green-500 text-white' : ''
          }`}>
            {currentWorkout.completed && <span>✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWorkout;