import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';
import { createSession, createExercise, createSet } from '../../services/models';

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const [sessionName, setSessionName] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // For pagination dots
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [calories, setCalories] = useState(300); // Default 300 calories
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Utiliser le contexte de stockage
  const { 
    addSession, 
    addExercise,
    getAllExercises,
    isInitialized 
  } = useStorageContext();

  // Charger les exercices disponibles
  useEffect(() => {
    if (isInitialized) {
      const loadExercises = async () => {
        try {
          const allExercises = await getAllExercises();
          // Pour l'instant, nous n'utilisons pas cette liste, mais elle pourrait être utile
          // pour suggérer des exercices à l'utilisateur
        } catch (error) {
          console.error('Erreur lors du chargement des exercices:', error);
        }
      };
      
      loadExercises();
    }
  }, [isInitialized, getAllExercises]);

  // Handle starting the workout
  const handleStart = async () => {
    if (!sessionName.trim()) {
      alert('Veuillez donner un nom à votre séance');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Créer la nouvelle séance
      const newSession = createSession(
        sessionName,
        routineId || 'default', // Utiliser 'default' si aucun routineId n'est fourni
        duration,
        calories
      );
      
      // Ajouter la séance à la base de données
      const sessionId = await addSession(newSession);
      
      // Rediriger vers la page de la séance
      navigate(`/workout-session/${sessionId}`);
    } catch (error) {
      console.error('Erreur lors de la création de la séance:', error);
      alert('Une erreur est survenue lors de la création de la séance');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 pt-8">
        {/* Workout name input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Votre nom de séance"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-full bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-purple)]"
          />
        </div>

        {/* Time and calories selectors */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 absolute -top-3 left-4 z-10"></div>
            <div className="w-full bg-white rounded-full p-4 pl-16 flex items-center justify-center shadow-sm border border-gray-200">
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-12 bg-transparent text-center focus:outline-none"
                min="5"
                max="240"
              />
              <span className="ml-1 text-gray-500">min</span>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 absolute -top-3 left-4 z-10"></div>
            <div className="w-full bg-white rounded-full p-4 pl-16 flex items-center justify-center shadow-sm border border-gray-200">
              <input 
                type="number" 
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-12 bg-transparent text-center focus:outline-none"
                min="0"
                max="2000"
              />
              <span className="ml-1 text-gray-500">kcal</span>
            </div>
          </div>
        </div>

        {/* Exercises section */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">Exercices</h2>
          <button 
            className="w-full bg-gray-200 rounded-3xl p-6 text-center shadow-sm"
            onClick={() => {
              // Créer la nouvelle séance d'abord
              if (!sessionName.trim()) {
                alert('Veuillez donner un nom à votre séance avant d\'ajouter un exercice');
                return;
              }
              
              const createSessionAndRedirect = async () => {
                setIsLoading(true);
                try {
                  // Créer la nouvelle séance
                  const newSession = createSession(
                    sessionName,
                    routineId || 'default',
                    duration,
                    calories
                  );
                  
                  // Ajouter la séance à la base de données
                  const sessionId = await addSession(newSession);
                  
                  // Rediriger vers la page de création d'exercice avec le sessionId
                  navigate(`/create-exercise?sessionId=${sessionId}`);
                } catch (error) {
                  console.error('Erreur lors de la création de la séance:', error);
                  alert('Une erreur est survenue lors de la création de la séance');
                } finally {
                  setIsLoading(false);
                }
              };
              
              createSessionAndRedirect();
            }}
          >
            Ajouter un exercice
          </button>
        </div>

        {/* Empty space for exercise list */}
        <div className="flex-1"></div>

      </div>
    </div>
  );
};

export default CreateWorkoutPage;