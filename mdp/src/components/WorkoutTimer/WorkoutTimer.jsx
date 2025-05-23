import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkoutTimer = () => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(150); // 2:30 in seconds
  const [currentSet, setCurrentSet] = useState({ reps: 10, weight: 20 });
  const [currentSetIndex, setCurrentSetIndex] = useState(2);
  const [totalSets, setTotalSets] = useState(4);
  const timerRef = useRef(null);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    // Start the timer
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    // Logic to skip to next exercise
    if (currentSetIndex < totalSets) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      // End of workout
      navigate('/workout-complete');
    }
  };
  
  const handleGoBack = () => {
    navigate('/workout-session');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with back button and centered title */}
      <header className="p-6 flex items-center justify-center relative">
        <button 
          onClick={handleGoBack}
          className="absolute left-6 w-8 h-8 flex items-center justify-center"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Push</h1>
      </header>

      {/* Control buttons on right side */}
      <div className="fixed right-6 top-6 flex flex-col gap-4">
        <button 
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={handlePauseResume}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? (
            // Play icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          ) : (
            // Pause icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        
        <div className="w-12 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">Kcal</span>
        </div>
        
        <div className="w-12 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center relative" onClick={handleSkip}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span className="text-xs">Suivant</span>
        </div>
      </div>

      {/* Main content - empty space */}
      <main className="flex-grow"></main>

      {/* Footer with timer */}
      <footer className="bg-gray-200 p-6 rounded-t-3xl relative">
        {/* Checkmark icon in center top */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Timer */}
        <div className="text-center pt-4">
          <div className="text-5xl font-bold mb-2">{formatTime(time)}</div>
          <div className="text-sm text-gray-600">
            Série {currentSetIndex}/{totalSets} - {currentSet.reps}reps {currentSet.weight}kg
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkoutTimer;