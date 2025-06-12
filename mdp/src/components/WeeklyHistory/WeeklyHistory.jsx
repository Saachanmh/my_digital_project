import React from 'react';

const WeeklyHistory = () => {
  // Mock data for workout history
  const workoutHistory = [
    { day: 'Mer.', date: 15, completed: true },
    { day: 'Mar.', date: 14, completed: true },
    { day: 'Lun.', date: 13, completed: true },
    { day: 'Jeu.', date: 10, completed: true }
  ];

  return (
    <div className="px-2 mb-5 bg-yellow text-dark rounded-2xl">
      <h3 className="text-lg py-4 font-display font-bold">Historique de la semaine</h3>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {workoutHistory.map((workout, index) => (
          <div key={index} className="min-w-[70px] h-[70px] bg-white rounded-xl flex flex-col items-center justify-center p-2">
            <div className="text-md font-bold text-gray-600">{workout.day}</div>
            <div className="text-lg font-medium mt-1">{workout.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyHistory;