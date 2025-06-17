import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';

const WorkoutTimer = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // Sera défini en fonction de l'exercice
  const [isResting, setIsResting] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(false);
  const timerRef = useRef(null);

  // Utiliser le contexte de stockage
  const { 
    getSessionById, 
    getExercisesBySessionId,
    updateExercise,
    isInitialized 
  } = useStorageContext();

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Charger les données de la séance et des exercices
  useEffect(() => {
    if (isInitialized && sessionId) {
      const loadSessionData = async () => {
        try {
          setIsLoading(true);
          
          // Récupérer la séance depuis la base de données
          const sessionData = await getSessionById(sessionId);
          if (!sessionData) {
            throw new Error('Séance non trouvée');
          }
          setSession(sessionData);
          
          // Récupérer les exercices de la séance
          const exercisesData = await getExercisesBySessionId(sessionId);
          if (!exercisesData || exercisesData.length === 0) {
            throw new Error('Aucun exercice trouvé pour cette séance');
          }
          setExercises(exercisesData);

          // Initialiser avec le premier exercice et la première série
          setCurrentExerciseIndex(0);
          setCurrentSetIndex(0);
          setIsExerciseCompleted(false);
          setIsResting(false);
          
          // Ne pas démarrer le timer tout de suite, attendre que l'utilisateur valide l'exercice
          setIsPaused(true);
        } catch (err) {
          console.error('Erreur lors du chargement de la séance:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadSessionData();
    }
  }, [isInitialized, sessionId, getSessionById, getExercisesBySessionId]);

  // Gérer le timer
  useEffect(() => {
    // Si on est en train de charger ou s'il y a une erreur, ne pas démarrer le timer
    if (isLoading || error || !exercises.length) return;

    // Si le timer est en pause, ne pas démarrer
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Démarrer le timer
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          // Quand le timer atteint zéro
          clearInterval(timerRef.current);
          
          if (isResting) {
            // Fin du temps de repos, passer à l'exercice suivant ou à la série suivante
            handleNextExerciseOrSet();
          } else {
            // Fin de l'exercice, passer au temps de repos
            setIsResting(true);
            setTime(30); // 30 secondes de repos par défaut
            setIsPaused(false); // Démarrer automatiquement le temps de repos
          }
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isResting, isLoading, error, exercises]);

  // Passer à l'exercice ou à la série suivante
  const handleNextExerciseOrSet = () => {
    const currentExercise = exercises[currentExerciseIndex];
    
    if (!currentExercise) return;
    
    // Si on a terminé toutes les séries de l'exercice actuel
    if (currentSetIndex >= (currentExercise.sets?.length || 0) - 1) {
      // Passer à l'exercice suivant
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
      } else {
        // Fin de la séance
        navigate('/workout-complete');
        return;
      }
    } else {
      // Passer à la série suivante du même exercice
      setCurrentSetIndex(currentSetIndex + 1);
    }
    
    // Réinitialiser les états pour le nouvel exercice/série
    setIsResting(false);
    setIsExerciseCompleted(false);
    setIsPaused(true); // Attendre que l'utilisateur valide l'exercice
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    // Arrêter le timer actuel
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Passer à l'exercice ou à la série suivante
    handleNextExerciseOrSet();
  };
  
  const handleGoBack = () => {
    navigate(`/workout-session/${sessionId}`);
  };

  // Valider l'exercice actuel et démarrer le timer
  const handleValidateExercise = () => {
    if (isExerciseCompleted) return;
    
    // Marquer l'exercice comme complété
    setIsExerciseCompleted(true);
    
    // Démarrer le timer pour le temps de repos
    const currentExercise = exercises[currentExerciseIndex];
    if (currentExercise && currentExercise.sets && currentExercise.sets[currentSetIndex]) {
      // Utiliser le temps de repos défini ou une valeur par défaut
      const restTime = currentExercise.restTime || 30; // 30 secondes par défaut
      setTime(restTime);
      setIsResting(true);
      setIsPaused(false); // Démarrer automatiquement le timer
    }
  };

  // Afficher un message de chargement
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white items-center justify-center">
        <p>Chargement de la séance...</p>
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="flex flex-col h-screen bg-white items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/training')}
          className="bg-dark text-white py-2 px-4 rounded-xl"
        >
          Retour à l'entraînement
        </button>
      </div>
    );
  }

  // Obtenir l'exercice et la série actuels
  const currentExercise = exercises[currentExerciseIndex];
  const currentSet = currentExercise?.sets?.[currentSetIndex] || { reps: 0, weight: 0 };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with back button and centered title */}
      <header className="p-6 flex items-center justify-center relative">
        <button 
          onClick={handleGoBack}
          className="absolute left-6 w-8 h-8 flex items-center justify-center"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{session?.name || 'Séance'}</h1>
      </header>

      {/* Control buttons on right side */}
      <div className="fixed right-6 top-6 flex flex-col gap-4">
        <button 
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={handlePauseResume}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? (
            // Play icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          ) : (
            // Pause icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        
        <div className="w-12 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">Kcal</span>
        </div>
        
        <div className="w-12 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center relative" onClick={handleSkip}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span className="text-xs">Suivant</span>
        </div>
      </div>

      {/* Main content - Exercise information */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {currentExercise && (
          <div className="text-center mb-8">
            {/* Image de l'exercice */}
            <div className="mb-6 flex justify-center">
              {currentExercise.imageUrl ? (
                <img 
                  src={currentExercise.imageUrl} 
                  alt={currentExercise.name} 
                  className="max-h-64 object-contain rounded-xl"
                />
              ) : (
                <div className="h-64 w-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  Image non disponible
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">{currentExercise.name}</h2>
            <div className="flex gap-2 justify-center mb-4">
              {currentExercise.muscles?.map((muscle, index) => (
                <span key={index} className="bg-dark text-white text-xs px-2 py-1 rounded-full">
                  {muscle}
                </span>
              ))}
            </div>
            <p className="text-xl">
              {currentSet.reps} répétitions × {currentSet.weight} kg
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Série {currentSetIndex + 1}/{currentExercise.sets?.length || 0}
            </p>
          </div>
        )}
      </main>

      {/* Footer with timer */}
      <footer className="bg-purple p-6 pb-24 rounded-t-3xl relative">
        {/* Checkmark icon in center top */}
        <div 
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 ${isExerciseCompleted ? 'bg-yellow' : 'bg-gray-200'} rounded-full flex items-center justify-center cursor-pointer ${!isResting && !isExerciseCompleted ? 'hover:bg-yellow-400' : ''}`}
          onClick={!isResting && !isExerciseCompleted ? handleValidateExercise : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Timer */}
        <div className="text-center pt-4">
          <div className="text-5xl text-white font-display font-bold mb-2">{formatTime(time)}</div>
          <div className="text-sm text-white">
            {isResting ? 'Temps de repos' : 'Temps d\'exercice'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkoutTimer;