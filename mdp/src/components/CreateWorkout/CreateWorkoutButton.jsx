import React from 'react';

const CreateWorkoutButton = ({ onClick }) => {
  return (
    <div className="px-4 mb-5">
      <button
        className="shadow-normal w-full p-2 bg-purple rounded-xl text-base text-center transition-colors text-white font-display font-bold whitespace-nowrap"
        onClick={onClick}
      >
        Créer une nouvelle routine d'entrainement
      </button>
    </div>
  );
};

export default CreateWorkoutButton;
