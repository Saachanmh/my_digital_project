import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExerciseForm from '../components/ExerciseForm/ExerciseForm';
import { useStorageContext } from '../services/StorageContext';

const EditExercisePage = () => {
  // Récupérer l'ID de l'exercice depuis les paramètres d'URL
  const { id } = useParams(); // Utiliser 'id' au lieu de 'exerciseId' pour correspondre à la route
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId');

  // Utiliser le contexte de stockage
  const { getExerciseById } = useStorageContext();
  const [exercise, setExercise] = useState({ id, sessionId, muscles: ['muscle1'] });
  const [loading, setLoading] = useState(true);

  // Charger les données de l'exercice
  useEffect(() => {
    const loadExercise = async () => {
      try {
        if (id) {
          const exerciseData = await getExerciseById(id);
          if (exerciseData) {
            setExercise(exerciseData);
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement de l\'exercice:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadExercise();
  }, [id, getExerciseById]);

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <ExerciseForm 
      isEditMode={true} 
      initialExercise={exercise} 
    />
  );
};

export default EditExercisePage;