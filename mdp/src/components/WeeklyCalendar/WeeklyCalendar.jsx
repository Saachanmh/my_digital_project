import React from 'react';
import { useNavigate } from 'react-router-dom';

const WeeklyCalendar = () => {
  const navigate = useNavigate();
  // Get current date and week days
  const today = new Date();
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  // Generate array of dates for the current week
  const getDaysInWeek = () => {
    const days = [];
    const day = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.setDate(diff + i));
      days.push({
        dayName: weekDays[i],
        date: date.getDate(),
        isToday: new Date().getDate() === date.getDate() && 
                 new Date().getMonth() === date.getMonth() &&
                 new Date().getFullYear() === date.getFullYear()
      });
    }
    return days;
  };

  const weekDates = getDaysInWeek();
  
  // Mock data for current workout
  const currentWorkout = {
    title: "Mon entrainement du jour",
    exercises: "Pecs - Épaules - Triceps",
    completed: false
  };

  // Function to handle button click
  const handleSessionButtonClick = () => {
    navigate('/workout-session');
  };


  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-medium">Entrainements</h2>
      
      {/* Calendar days - updated to match design */}
      <div className="flex justify-between mb-5">
        {weekDates.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-base text-gray-800 mb-1">{day.dayName}</div>
            <div className={`w-10 h-10 flex items-center justify-center text-lg ${day.isToday ? 
              'bg-gray-300 rounded-full' : ''}`}>
              {day.date}
            </div>
          </div>
        ))}
      </div>
      
      {/* Daily Workout Card - updated to match design */}
      <div className="bg-gray-200 rounded-2xl p-5 flex justify-between items-center mb-5 relative overflow-hidden -mt-4">
        {/* Top curve cutout */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-b-full"></div>

        <div className="mt-2 w-full">
          <h3 className="text-lg font-medium mb-2">{currentWorkout.title}</h3>
          <p className="text-base text-gray-700">{currentWorkout.exercises}</p>
        </div>

        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center absolute top-5 right-5">
          <span className="text-gray-400 text-sm">1h30</span>
        </div>

        {/* Bottom right button/indicator */}
        <button 
          onClick={handleSessionButtonClick}
          className="absolute bottom-4 right-4 bg-white rounded-xl w-12 h-8 cursor-pointer hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Go to session"
        >
          <span className="text-gray-500">→</span>
        </button>     </div>
    </div>
  );
};

export default WeeklyCalendar;