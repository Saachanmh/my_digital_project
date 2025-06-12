import { useState, useEffect, useCallback } from 'react';
import * as storageService from './storageService';

/**
 * Hook personnalisé pour utiliser le service de stockage
 * Fournit des méthodes pour interagir avec les données stockées localement
 */
const useStorage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Initialiser la base de données au chargement du hook
  useEffect(() => {
    const initDb = async () => {
      try {
        await storageService.initDatabase();
        setIsInitialized(true);
      } catch (err) {
        console.error('Erreur lors de l\'initialisation de la base de données:', err);
        setError(err);
      }
    };

    initDb();
  }, []);

  // Wrapper pour gérer les erreurs des opérations de base de données
  const handleOperation = useCallback(async (operation, ...args) => {
    try {
      if (!isInitialized) {
        await storageService.initDatabase();
        setIsInitialized(true);
      }
      return await operation(...args);
    } catch (err) {
      console.error('Erreur lors de l\'opération:', err);
      setError(err);
      throw err;
    }
  }, [isInitialized]);

  // API pour les routines
  const addRoutine = useCallback((routine) => {
    return handleOperation(storageService.addRoutine, routine);
  }, [handleOperation]);

  const getAllRoutines = useCallback(() => {
    return handleOperation(storageService.getAllRoutines);
  }, [handleOperation]);

  const getRoutineById = useCallback((id) => {
    return handleOperation(storageService.getRoutineById, id);
  }, [handleOperation]);

  const updateRoutine = useCallback((routine) => {
    return handleOperation(storageService.updateRoutine, routine);
  }, [handleOperation]);

  const deleteRoutine = useCallback((id) => {
    return handleOperation(storageService.deleteRoutine, id);
  }, [handleOperation]);

  // API pour les séances
  const addSession = useCallback((session) => {
    return handleOperation(storageService.addSession, session);
  }, [handleOperation]);

  const getAllSessions = useCallback(() => {
    return handleOperation(storageService.getAllSessions);
  }, [handleOperation]);

  const getSessionById = useCallback((id) => {
    return handleOperation(storageService.getSessionById, id);
  }, [handleOperation]);

  const getSessionsByRoutineId = useCallback((routineId) => {
    return handleOperation(storageService.getSessionsByRoutineId, routineId);
  }, [handleOperation]);

  const updateSession = useCallback((session) => {
    return handleOperation(storageService.updateSession, session);
  }, [handleOperation]);

  const deleteSession = useCallback((id) => {
    return handleOperation(storageService.deleteSession, id);
  }, [handleOperation]);

  // API pour les exercices
  const addExercise = useCallback((exercise) => {
    return handleOperation(storageService.addExercise, exercise);
  }, [handleOperation]);

  const getAllExercises = useCallback(() => {
    return handleOperation(storageService.getAllExercises);
  }, [handleOperation]);

  const getExerciseById = useCallback((id) => {
    return handleOperation(storageService.getExerciseById, id);
  }, [handleOperation]);

  const getExercisesBySessionId = useCallback((sessionId) => {
    return handleOperation(storageService.getExercisesBySessionId, sessionId);
  }, [handleOperation]);

  const updateExercise = useCallback((exercise) => {
    return handleOperation(storageService.updateExercise, exercise);
  }, [handleOperation]);

  const deleteExercise = useCallback((id) => {
    return handleOperation(storageService.deleteExercise, id);
  }, [handleOperation]);

  return {
    isInitialized,
    error,
    
    // API Routines
    addRoutine,
    getAllRoutines,
    getRoutineById,
    updateRoutine,
    deleteRoutine,
    
    // API Séances
    addSession,
    getAllSessions,
    getSessionById,
    getSessionsByRoutineId,
    updateSession,
    deleteSession,
    
    // API Exercices
    addExercise,
    getAllExercises,
    getExerciseById,
    getExercisesBySessionId,
    updateExercise,
    deleteExercise
  };
};

export default useStorage;