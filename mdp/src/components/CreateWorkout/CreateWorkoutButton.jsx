import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';
import { useState, useEffect } from 'react';

const CreateWorkoutButton = ({onClick}) => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const { getAllRoutines, getAllSessions, isInitialized } = useStorageContext();
  
  useEffect(() => {
    if (isInitialized) {
      const checkData = async () => {
        try {
          const routines = await getAllRoutines();
          const sessions = await getAllSessions();
          setHasData((routines && routines.length > 0) || (sessions && sessions.length > 0));
        } catch (error) {
          console.error('Erreur lors de la vérification des données:', error);
          setHasData(false);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkData();
    }
  }, [isInitialized, getAllRoutines, getAllSessions]);

  const handleClick = () => {
    navigate('/new-routine');
  };

  if (isLoading) {
    return null; // Ne rien afficher pendant le chargement
  }

  if (hasData) {
    return null; // Ne pas afficher le bouton s'il y a déjà des données
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
