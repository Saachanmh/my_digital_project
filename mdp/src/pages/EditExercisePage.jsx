import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ExerciseForm from '../components/ExerciseForm/ExerciseForm';
import { useStorageContext } from '../services/StorageContext';

const EditExercisePage = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-auto">
      <div className="flex items-center p-4 border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-2 text-[var(--color-purple)] hover:text-[var(--color-purple-700)]"
        >
          ← Retour
        </button>
        <h1 className="text-2xl font-bold text-[var(--color-purple)]">Modifier l'exercice</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-32">Chargement...</div>
        ) : (
          <ExerciseForm isEditMode={true} initialExercise={exercise} />
        )}
      </div>
    </div>
  );
};

export default EditExercisePage;