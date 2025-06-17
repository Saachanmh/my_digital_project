import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WeeklyCalendar = () => {
  const navigate = useNavigate();
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  // State to track the center day (initially today)
  const [centerDate, setCenterDate] = useState(new Date());

  // Generate array of dates centered around the selected date
  const getDaysAround = () => {
    const days = [];
    const currentDate = new Date(centerDate);
    
    // Get 3 days before
    for (let i = -3; i < 0; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dayIndex = (date.getDay() + 6) % 7; // Convert to 0=Monday format
      
      days.push({
        dayName: weekDays[dayIndex],
        date: date.getDate(),
        fullDate: new Date(date),
        isToday: isSameDay(date, new Date())
      });
    }
    
    // Add center day
    days.push({
      dayName: weekDays[(currentDate.getDay() + 6) % 7],
      date: currentDate.getDate(),
      fullDate: new Date(currentDate),
      isToday: isSameDay(currentDate, new Date()),
      isCenter: true
    });
    
    // Get 3 days after
    for (let i = 1; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dayIndex = (date.getDay() + 6) % 7; // Convert to 0=Monday format
      
      days.push({
        dayName: weekDays[dayIndex],
        date: date.getDate(),
        fullDate: new Date(date),
        isToday: isSameDay(date, new Date())
      });
    }
    
    return days;
  };

  // Helper function to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Function to navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(centerDate);
    newDate.setDate(centerDate.getDate() - 1);
    setCenterDate(newDate);
  };

  // Function to navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(centerDate);
    newDate.setDate(centerDate.getDate() + 1);
    setCenterDate(newDate);
  };

  // Get the days to display
  const displayDays = getDaysAround();

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
      <h2 className="mb-4 text-2xl font-medium font-display">Entrainements</h2>

      {/* Calendar days with navigation */}
      <div className="flex items-center justify-between mb-5">
        
        {/* Days display */}
        <div className="flex justify-between flex-1 px-2 z-10">
          {displayDays.map((day, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{
                opacity: Math.abs(index - 3) > 1 ? 0.5 : 1,
                transform: day.isCenter ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              <div className="text-base text-gray-800 mb-1">{day.dayName}</div>
              <div className={`w-10 h-10 flex items-center justify-center text-lg ${
                day.isToday ? 'bg-purple text-white rounded-full' : 
                day.isCenter ? 'bg-gray-200 rounded-full' : ''
              }`}>
                {day.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Workout Card with navigation controls at the top */}
      <div className="bg-dark text-white rounded-2xl p-5 flex justify-between items-center relative overflow-hidden -mt-4 shadow-normal">
        {/* Top curve cutout */}
        <svg className='absolute top-0 left-1/2 transform -translate-x-1/2' width="62" height="14" viewBox="0 0 62 14" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.5 14C18 14 12 0 0 0H62C50 0 45 14 31.5 14Z"/>
        </svg>
       

        <div className="mt-2 w-full">
          <h3 className="text-lg font-medium mb-2">{currentWorkout.title}</h3>
          <p className="text-base mb-3">{currentWorkout.exercises}</p>
          <button
            onClick={handleSessionButtonClick}
            className="p-2 bg-yellow rounded-xl cursor-pointer hover:bg-gray-100 active:bg-gray-200 text-dark"
            aria-label="Go to session"
          >
            Commencer
          </button>
        </div>

        {/* Separate div for the duration circle */}
        <div className="absolute" style={{ top: '10px', right: '20px' }}>
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-sm text-dark font-display font-bold">
            <span>1h30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
