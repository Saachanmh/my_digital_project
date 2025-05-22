import React from 'react';

const WorkoutSlider = () => {
  // Mock data for workouts
  const workouts = [
    {
      id: 1,
      title: "Push",
      exercises: "Pecs - Épaules - Triceps",
      completed: false
    },
    {
      id: 2,
      title: "Pull",
      exercises: "Dos - Biceps",
      completed: true
    },
    {
      id: 3,
      title: "Legs",
      exercises: "Quadriceps - Ischio-jambiers - Mollets",
      completed: false
    }
  ];

  return (
    <div className="px-4 mb-5">
      <h3 className="text-lg font-medium mb-3">Mes entrainements</h3>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {workouts.map(workout => (
          <div key={workout.id} className="min-w-[250px] bg-gray-100 rounded-xl p-4 flex justify-between items-center">
            <div>
              <h4 className="text-base font-medium mb-2">{workout.title}</h4>
              <p className="text-sm text-gray-600">{workout.exercises}</p>
            </div>
            <div>
              <div className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center ${
                workout.completed ? 'bg-green-500 border-green-500 text-white' : ''
              }`}>
                {workout.completed && <span>✓</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSlider;