import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';
import { useState, useEffect } from 'react';

const CreateWorkoutButton = ({onClick}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const { isInitialized } = useStorageContext();
  
  useEffect(() => {
    if (isInitialized) {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const handleClick = () => {
    navigate('/new-routine');
  };

  if (isLoading) {
    return null; // Ne rien afficher pendant le chargement
  }

  return (
    <div className="px-4 mb-5">
      <button
        className="shadow-normal w-full p-2 bg-purple rounded-xl text-base text-center transition-colors text-white font-display font-bold whitespace-nowrap"
        onClick={handleClick}
      >
        Créer une nouvelle routine 
      </button>
    </div>
  );
};

export default CreateWorkoutButton;
