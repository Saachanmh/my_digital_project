import React from 'react';

const ExerciseHeader = ({ title, onAddToTraining }) => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <button 
        onClick={onAddToTraining}
        className="bg-gray-200 text-black py-2 px-4 rounded-full w-full font-medium"
      >
        Ajouter à mon entraînement
      </button>
    </div>
  );
};

export default ExerciseHeader;