import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // For pagination dots

  // Handle starting the workout
  const handleStart = () => {
    // In a real app, you would save the workout data
    // For now, just navigate back to the training page
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-4">
        <h1 className="text-lg font-medium">Page créer séance</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Workout name input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Votre nom de séance"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-full bg-gray-50 focus:outline-none"
          />
        </div>

        {/* Time selectors */}
        <div className="flex space-x-2 mb-6">
          <div className="flex-1 bg-gray-100 rounded-full p-3 flex items-center justify-center">
            <span className="text-gray-500">??</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-full p-3 flex items-center justify-center">
            <span className="text-gray-500">??</span>
          </div>
          <button 
            onClick={handleStart}
            className="flex-grow-2 bg-gray-200 rounded-full p-3 text-center font-medium"
          >
            Commencer
          </button>
        </div>

        {/* Exercises section */}
        <div className="mb-4">
          <h2 className="text-base font-medium mb-2">Exercices</h2>
          <button 
            className="w-full bg-gray-200 rounded-xl p-4 text-center"
            onClick={() => navigate('/create-exercise')}
          >
            Ajouter un exercice
          </button>
        </div>

        {/* Empty space for exercise list */}
        <div className="flex-1"></div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 py-4">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`w-6 h-6 rounded-full ${currentStep === step ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => setCurrentStep(step)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutPage;