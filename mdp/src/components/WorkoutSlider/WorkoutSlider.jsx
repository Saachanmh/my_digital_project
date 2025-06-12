import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';

const WorkoutSlider = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getAllRoutines, getAllSessions, isInitialized } = useStorageContext();

  // Charger les routines et séances depuis le stockage
  useEffect(() => {
    if (isInitialized) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const routinesData = await getAllRoutines();
          const sessionsData = await getAllSessions();
          setRoutines(routinesData || []);
          setSessions(sessionsData || []);
        } catch (err) {
          console.error('Erreur lors du chargement des données:', err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  }, [isInitialized, getAllRoutines, getAllSessions]);

  const handleCreateWorkout = () => {
    navigate('/create-workout');
  };

  const handleViewSession = (sessionId) => {
    navigate(`/workout-session/${sessionId}`);
  };

  return (
    <div className="px-4 mb-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-display font-bold">Mes routines</h3>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          Une erreur est survenue lors du chargement des données
        </div>
      ) : (
        <>
          {routines.length > 0 ? (
            <div className="mb-6">
              <div className="flex overflow-x-auto gap-4 pb-2">
                {routines.map(routine => (
                  <div key={routine.id} className="min-w-[250px] bg-gray-100 rounded-xl p-4">
                    <h4 className="text-base font-medium mb-2">{routine.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{routine.details || 'Aucun détail'}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          
          <div className="flex justify-between items-center mb-3 mt-6">
            <h3 className="text-lg font-display font-bold">Mes entraînements</h3>
          </div>
          
          {sessions.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 pb-2 mb-4">
              {sessions.map((session, index) => {
                // Alterner entre les couleurs purple et pinkish
                const bgColorClass = index % 2 === 0 ? 'bg-pink-300' : 'bg-purple-700';
                const textColorClass = index % 2 === 0 ? 'text-dark-900' : 'text-white';
                
                return (
                  <div 
                    key={session.id} 
                    className={`min-w-[250px] ${bgColorClass} rounded-xl p-4 cursor-pointer shadow-normal`}
                    onClick={() => handleViewSession(session.id)}
                  >
                    <div className="flex flex-col">
                      <h4 className={`text-base font-bold mb-1 font-display ${textColorClass}`}>{session.name}</h4>
                      <p className={`text-sm ${textColorClass} mb-2`}>{session.duration}h30</p>
                      <p className={`text-xs ${textColorClass}`}>Pecs - Épaules - Triceps</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-xl mb-4">
              <p className="text-gray-500 mb-4">Aucun entraînement trouvé</p>
            </div>
          )}
          
          <button
            onClick={handleCreateWorkout}
            className="w-full bg-purple text-white font-bold py-3 px-6 rounded-xl shadow-normal hover:bg-purple-700 transition-colors"
          >
            Créer un entraînement
          </button>
        </>
      )}
    </div>
  );
};

export default WorkoutSlider;