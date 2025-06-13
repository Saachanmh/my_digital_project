import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorageContext } from '../services/StorageContext';

function EditRoutinePage() {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const [routineName, setRoutineName] = useState('');
  const [routineDetails, setRoutineDetails] = useState('');
  const [showSessionDrawer, setShowSessionDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingRoutine, setLoadingRoutine] = useState(true);

  // Contexte de stockage
  const { 
    updateRoutine, 
    getRoutineById,
    addSession, 
    getAllSessions, 
    getSessionsByRoutineId,
    updateSession,
    isInitialized 
  } = useStorageContext();

  // jours de la semaine
  const [selectedDays, setSelectedDays] = useState({
    L: false,
    M: false,
    M2: false,
    J: false,
    V: false,
    S: false,
    D: false
  });

  // sessions depuis la base de données
  const [sessions, setSessions] = useState([]);

  // sessions selectionnés pour cette routine
  const [selectedSessions, setSelectedSessions] = useState([]);

  // Charger la routine et ses sessions
  useEffect(() => {
    if (isInitialized && routineId) {
      const loadRoutineData = async () => {
        try {
          setLoadingRoutine(true);
          // Charger la routine
          const routine = await getRoutineById(routineId);
          if (routine) {
            setRoutineName(routine.name);
            setRoutineDetails(routine.description || '');
            
            // Initialiser les jours sélectionnés
            if (routine.days && routine.days.length > 0) {
              const daysState = {
                L: false,
                M: false,
                M2: false,
                J: false,
                V: false,
                S: false,
                D: false
              };
              
              routine.days.forEach(day => {
                daysState[day] = true;
              });
              
              setSelectedDays(daysState);
            }
            
            // Charger les sessions associées à cette routine
            const routineSessions = await getSessionsByRoutineId(routineId);
            setSelectedSessions(routineSessions || []);
          } else {
            console.error('Routine non trouvée');
            navigate('/training');
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la routine:', error);
        } finally {
          setLoadingRoutine(false);
        }
      };
      
      loadRoutineData();
    }
  }, [isInitialized, routineId, getRoutineById, getSessionsByRoutineId, navigate]);
  
  // Garder une référence aux sessions originales pour comparer lors de la mise à jour
  const [originalSessions, setOriginalSessions] = useState([]);
  
  useEffect(() => {
    // Mettre à jour les sessions originales lorsque les sessions sélectionnées changent initialement
    if (selectedSessions.length > 0 && originalSessions.length === 0) {
      setOriginalSessions([...selectedSessions]);
    }
  }, [selectedSessions, originalSessions]);

  // Charger toutes les sessions disponibles
  useEffect(() => {
    if (isInitialized) {
      const loadSessions = async () => {
        try {
          setIsLoading(true);
          const sessionsData = await getAllSessions();
          setSessions(sessionsData || []);
        } catch (error) {
          console.error('Erreur lors du chargement des sessions:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadSessions();
    }
  }, [isInitialized, getAllSessions]);

  const handleDayToggle = (day) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day]
    });
  };

  const toggleSessionDrawer = () => {
    setShowSessionDrawer(!showSessionDrawer);
  };

  const handleSessionSelect = (session) => {
    // Vérifier si la session est déjà sélectionnée
    const isAlreadySelected = selectedSessions.some(s => s.id === session.id);
    if (isAlreadySelected) {
      alert('Cette séance est déjà dans la routine');
      return;
    }

    // Créer une nouvelle session avec les jours sélectionnés
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day);

    if (selectedDaysArray.length === 0) {
      alert('Veuillez sélectionner au moins un jour');
      return;
    }

    const sessionWithDays = {
      ...session,
      days: selectedDaysArray
    };

    setSelectedSessions([...selectedSessions, sessionWithDays]);
    setSelectedDays({
      L: false,
      M: false,
      M2: false,
      J: false,
      V: false,
      S: false,
      D: false
    });
    setShowSessionDrawer(false);
  };

  const handleRemoveSession = (sessionId) => {
    setSelectedSessions(selectedSessions.filter(session => session.id !== sessionId));
  };

  const handleUpdateRoutine = async () => {
    if (!routineName) {
      alert('Veuillez donner un nom à votre routine');
      return;
    }

    if (selectedSessions.length === 0) {
      alert('Veuillez ajouter au moins une séance');
      return;
    }

    try {
      // Mettre à jour la routine
      const selectedDaysArray = Array.from(new Set(
        selectedSessions.flatMap(session => session.days || [])
      ));

      const updatedRoutine = {
        id: routineId,
        name: routineName,
        description: routineDetails,
        days: selectedDaysArray,
        updatedAt: new Date().toISOString()
      };

      await updateRoutine(updatedRoutine);

      // Identifier les sessions qui ont été supprimées
      const currentSessionIds = selectedSessions.map(session => session.id);
      const removedSessions = originalSessions.filter(session => !currentSessionIds.includes(session.id));
      
      // Mettre à jour les sessions supprimées pour enlever leur association avec cette routine
      for (const sessionData of removedSessions) {
        const updatedSession = {
          ...sessionData,
          routineId: null, // Enlever l'association avec la routine
          updatedAt: new Date().toISOString()
        };
        await updateSession(updatedSession);
      }

      // Mettre à jour les sessions associées
      for (const sessionData of selectedSessions) {
        // Si la session a un routineId différent ou n'en a pas, c'est une nouvelle association
        if (sessionData.routineId !== routineId) {
          const updatedSession = {
            ...sessionData,
            routineId: routineId,
            updatedAt: new Date().toISOString()
          };
          await updateSession(updatedSession);
        }
      }

      // Naviguer vers la page d'entraînement
      navigate('/training');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la routine:', error);
      alert('Une erreur est survenue lors de la mise à jour de la routine');
    }
  };

  if (loadingRoutine) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
        <div className="p-4 flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Modifier la Routine</h1>
        
        {/* Routine Details Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Votre nom de séance"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
          />
          <textarea
            placeholder="Détails"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={routineDetails}
            onChange={(e) => setRoutineDetails(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Séances</h2>
        
        {/* Selected Sessions List */}
        <div className="mb-6">
          {selectedSessions.map((session, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg mb-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{session.name}</h3>
                <p className="text-sm text-gray-600">Jours: {session.days ? session.days.join(', ') : 'Aucun jour'}</p>
              </div>
              <button 
                onClick={() => handleRemoveSession(session.id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        {/* Add Session Button */}
        <button
          onClick={toggleSessionDrawer}
          className="w-full p-4 bg-gray-200 rounded-lg text-center mb-6"
        >
          Ajouter une séance
        </button>

        {/* Save Routine Button */}
        <button
          onClick={handleUpdateRoutine}
          className="w-full p-4 bg-purple text-white rounded-lg text-center"
        >
          Mettre à jour la routine
        </button>
      </div>

      {/* Session Selection Drawer */}
      {showSessionDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-5">
            <h2 className="text-xl font-bold mb-4">Sélectionner les jours</h2>
            
            <div className="flex justify-between mb-6">
              {Object.entries({
                L: 'L',
                M: 'M',
                M2: 'M',
                J: 'J',
                V: 'V',
                S: 'S',
                D: 'D'
              }).map(([key, label]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="mb-2">{label}</span>
                  <div 
                    className={`w-6 h-6 border ${selectedDays[key] ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} rounded flex items-center justify-center cursor-pointer`}
                    onClick={() => handleDayToggle(key)}
                  >
                    {selectedDays[key] && <span className="text-white">✓</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              {isLoading ? (
                <p className="text-center">Chargement des séances...</p>
              ) : sessions.length > 0 ? (
                sessions.map(session => (
                  <div 
                    key={session.id} 
                    className="bg-gray-100 p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSessionSelect(session)}
                  >
                    <h3 className="font-semibold">{session.name}</h3>
                    {session.muscles && <p className="text-sm text-gray-600">{session.muscles}</p>}
                  </div>
                ))
              ) : (
                <p className="text-center">Aucune séance disponible</p>
              )}
            </div>

            <div className="flex justify-between">
              <button 
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={() => setShowSessionDrawer(false)}
              >
                Annuler
              </button>
              <button 
                className="bg-gray-200 px-4 py-2 rounded-lg flex items-center"
                onClick={() => navigate('/create-workout')}
              >
                <span className="mr-2">+</span>
                Créer une séance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRoutinePage;