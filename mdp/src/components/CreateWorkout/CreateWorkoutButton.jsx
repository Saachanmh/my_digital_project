import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWorkoutButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-workout');
  };

  return (
    <div className="px-4 mb-5">
      <button
        className="w-full p-2 bg-gray-100 rounded-xl text-base text-center transition-colors hover:bg-gray-200 active:bg-gray-300 whitespace-nowrap"
        onClick={handleClick}
      >
        Créer une nouvelle routine d'entrainement
      </button>
    </div>
  );
};

export default CreateWorkoutButton;
