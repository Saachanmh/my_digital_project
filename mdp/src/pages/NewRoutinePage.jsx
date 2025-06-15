import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DailyWorkout from '../components/DailyWorkout/DailyWorkout';
import { useStorageContext } from '../services/StorageContext';
import { createRoutine, createSession } from '../services/models';

function NewRoutinePage() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [routineDetails, setRoutineDetails] = useState('');
  const [showSessionDrawer, setShowSessionDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Contexte de stockage
  const { 
    addRoutine, 
    addSession, 
    getAllSessions, 
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

  // sessions selectionnés 
  const [selectedSessions, setSelectedSessions] = useState([]);

  // Charger les sessions depuis la base de données
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
    // Create a new session with selected days
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day);

    if (selectedDaysArray.length === 0) {
      alert('Veuillez sélectionner au moins un jour');
      return;
    }

    const newSession = {
      ...session,
      days: selectedDaysArray
    };

    setSelectedSessions([...selectedSessions, newSession]);
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

  const handleAddRoutine = async () => {
    if (!routineName) {
      alert('Veuillez donner un nom à votre routine');
      return;
    }

    if (selectedSessions.length === 0) {
      alert('Veuillez ajouter au moins une séance');
      return;
    }

    try {
      // Créer la routine
      const selectedDaysArray = Array.from(new Set(
        selectedSessions.flatMap(session => session.days)
      ));

      const newRoutine = createRoutine(
        routineName,
        routineDetails,
        selectedDaysArray
      );

      // Ajouter la routine à la base de données
      const routineId = await addRoutine(newRoutine);

      // Associer les sessions existantes à cette routine
      for (const sessionData of selectedSessions) {
        // Si la session a déjà un ID, c'est une session existante
        if (sessionData.id) {
          // Nous ne créons pas de nouvelle session, mais nous pouvons mettre à jour
          // la session existante si nécessaire (par exemple, pour ajouter des jours)
          // Cette étape est optionnelle selon votre logique métier
          console.log(`Session existante associée à la routine: ${sessionData.id}`);
        } else {
          // C'est une nouvelle session, nous la créons
          const newSession = createSession(
            sessionData.name,
            routineId,
            60, // durée par défaut
            300 // calories par défaut
          );

          await addSession(newSession);
        }
      }

      // Naviguer vers la page d'entraînement
      navigate('/training');
    } catch (error) {
      console.error('Erreur lors de la création de la routine:', error);
      alert('Une erreur est survenue lors de la création de la routine');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Nouvelle Routine</h1>
        
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
            <div key={index} className="bg-gray-100 p-3 rounded-lg mb-3">
              <h3 className="font-semibold">{session.name}</h3>
              <p className="text-sm text-gray-600">Jours: {session.days.join(', ')}</p>
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
          onClick={handleAddRoutine}
          className="w-full p-4 bg-purple text-white rounded-lg text-center"
        >
          Enregistrer la routine
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

export default NewRoutinePage;