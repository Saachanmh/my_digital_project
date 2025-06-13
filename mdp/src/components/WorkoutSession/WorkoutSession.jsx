import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';
import { createExercise, createSet } from '../../services/models';

const WorkoutSession = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Utiliser le contexte de stockage
  const { 
    getSessionById, 
    getExercisesBySessionId,
    updateSession,
    deleteExercise,
    deleteSession,
    isInitialized 
  } = useStorageContext();
  
  // Charger les données de la séance
  useEffect(() => {
    if (isInitialized) {
      const loadSessionData = async () => {
        try {
          setIsLoading(true);
          
          // Si aucun sessionId n'est fourni, utiliser des données par défaut
          if (!sessionId) {
            // Utiliser des données par défaut pour la démo
            setSession({
              id: 'default',
              name: "Push",
              duration: 90,
              calories: 560,
              routineId: 'default'
            });
            setExercises([
              {
                id: 'demo1',
                name: "Développé couché",
                muscles: ["Pectoraux", "Triceps"],
                sets: [
                  { id: 'd1s1', reps: 12, weight: 40, completed: false },
                  { id: 'd1s2', reps: 12, weight: 40, completed: false },
                  { id: 'd1s3', reps: 12, weight: 40, completed: false }
                ]
              },
              {
                id: 'demo2',
                name: "Élévations latérales",
                muscles: ["Épaules"],
                sets: [
                  { id: 'd2s1', reps: 12, weight: 10, completed: false },
                  { id: 'd2s2', reps: 12, weight: 10, completed: false },
                  { id: 'd2s3', reps: 12, weight: 10, completed: false }
                ]
              }
            ]);
          } else {
            // Récupérer la séance depuis la base de données
            const sessionData = await getSessionById(sessionId);
            if (!sessionData) {
              throw new Error('Séance non trouvée');
            }
            setSession(sessionData);
            
            // Récupérer les exercices de la séance
            const exercisesData = await getExercisesBySessionId(sessionId);
            setExercises(exercisesData || []);
          }
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

  const handleGoBack = () => {
    navigate('/training'); // Navigate back to the training page
  };
  
  const handleStartWorkout = async () => {
    if (!session) return;
    
    try {
      // Mettre à jour la séance pour indiquer qu'elle est en cours
      const updatedSession = {
        ...session,
        scheduledDate: new Date().toISOString()
      };
      
      await updateSession(updatedSession);
      
      // Navigate to the workout timer page
      navigate(`/workout-timer/${sessionId}`);
    } catch (err) {
      console.error('Erreur lors du démarrage de la séance:', err);
      alert('Une erreur est survenue lors du démarrage de la séance');
    }
  };
  
  const handlePostpone = async () => {
    if (!session) return;
    
    try {
      // Calculer la date de demain
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Mettre à jour la séance pour la reporter à demain
      const updatedSession = {
        ...session,
        scheduledDate: tomorrow.toISOString()
      };
      
      await updateSession(updatedSession);
      
      alert("Session reportée à demain");
      navigate('/training');
    } catch (err) {
      console.error('Erreur lors du report de la séance:', err);
      alert('Une erreur est survenue lors du report de la séance');
    }
  };
  
  const handleEditExercise = (exerciseId) => {
    navigate(`/edit-exercise/${exerciseId}?sessionId=${sessionId}`);
  };
  
  const handleAddExercise = () => {
    navigate(`/create-exercise?sessionId=${sessionId}`);
  };
  
  const handleDeleteExercise = async (exerciseId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) return;
    
    try {
      await deleteExercise(exerciseId);
      
      // Mettre à jour la liste des exercices
      setExercises(exercises.filter(ex => ex.id !== exerciseId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'exercice:', err);
      alert('Une erreur est survenue lors de la suppression de l\'exercice');
    }
  };

  const handleDeleteSession = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) return;
    
    try {
      await deleteSession(sessionId);
      navigate('/training');
    } catch (err) {
      console.error('Erreur lors de la suppression de la séance:', err);
      alert('Une erreur est survenue lors de la suppression de la séance');
    }
  };

  const toggleMenu = (exerciseId, event) => {
    // Empêcher la propagation pour éviter que le document.addEventListener ne se déclenche immédiatement
    if (event) {
      event.stopPropagation();
    }
    setOpenMenuId(openMenuId === exerciseId ? null : exerciseId);
  };

  // Fermer le menu lorsqu'on clique n'importe où sur la page
  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  // Afficher un message de chargement
  if (isLoading) {
    return (
      <div className="p-4 bg-white min-h-screen flex items-center justify-center">
        <p>Chargement de la séance...</p>
      </div>
    );
  }
  
  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="p-4 bg-white min-h-screen flex flex-col items-center justify-center">
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
  
  // Afficher un message si la séance n'existe pas
  if (!session) {
    return (
      <div className="p-4 bg-white min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">Séance non trouvée</p>
        <button 
          onClick={() => navigate('/training')}
          className="bg-dark text-white py-2 px-4 rounded-xl"
        >
          Retour à l'entraînement
        </button>
      </div>
    );
  }

  // Formater la durée
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? mins : ''}` : `${mins}min`;
  };
  
  // Formater les séries d'un exercice
  const formatSets = (sets) => {
    if (!sets || !sets.length) return 'Aucune série';
    
    return sets.map((set, index) => {
      return `${set.reps} x ${set.weight}kg`;
    }).join('  ');
  };

  return (
    <div className="p-4 bg-white min-h-screen relative">
      {/* Back button in top left corner */}
      <button 
        onClick={handleGoBack}
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center"
        aria-label="Return to training page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex justify-center items-center mb-6 pt-2">
        <h1 className="text-2xl font-bold text-center font-display">{session.name}</h1>
        <button 
          onClick={handleDeleteSession}
          className="ml-2 text-red-600 p-2 rounded-full hover:bg-red-100"
          aria-label="Supprimer cette séance"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* Duration and Calories */}
      <div className="flex gap-4 mb-6">
        <div className="bg-purple rounded-full px-4 py-2 flex items-center justify-center">
          <span className="text-white">{formatDuration(session.duration)}</span>
        </div>
        <div className="bg-pinkish rounded-full px-4 py-2 flex items-center justify-center">
          <span className="text-white">{session.calories} kcal</span>
        </div>
      </div>
      
      {/* Exercises Section */}
      <div className="mb-6">
        <h2 className="text-xl mb-4 font-display font-bold">Exercices</h2>
        
        {exercises.length === 0 && (
          <p className="text-center text-gray-500 mb-4">Aucun exercice dans cette séance</p>
        )}
        
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-yellow rounded-xl p-4 mb-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display mb-2">{exercise.name}</h3>
                <div className="flex gap-2 mb-2">
                  {exercise.muscles.map((muscle, index) => (
                    <span key={index} className="bg-dark text-white text-xs px-2 py-1 rounded-full">
                      {muscle}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-dark">{formatSets(exercise.sets)}</p>
              </div>
              
              {/* Menu dropdown */}
              <div className="relative">
                <button 
                  className="text-gray-500 p-1" 
                  onClick={(e) => toggleMenu(exercise.id, e)}
                  aria-label="Menu options"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                {openMenuId === exercise.id && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    onClick={(e) => e.stopPropagation()} // Empêcher la propagation pour éviter que le menu ne se ferme quand on clique dessus
                  >
                    <div className="py-1">
                      <button 
                        onClick={() => {
                          handleEditExercise(exercise.id);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => {
                          handleDeleteExercise(exercise.id);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Exercise Button */}
        <button 
          className="w-full bg-purple text-white py-3 rounded-xl mb-4"
          onClick={handleAddExercise}
        >
          Ajouter un exercice
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <button 
          onClick={handleStartWorkout}
          className="col-span-2 bg-dark text-white py-3 rounded-xl font-display"
        >
          Commencer
        </button>
        <button 
          onClick={handlePostpone}
          className="bg-pinkish text-pinkish-800 py-3 rounded-xl font-display"
        >
          Mettre à demain
        </button>
      </div>
    </div>
  );
};

export default WorkoutSession;