import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TabBar from '../components/Tabbar/Tabbar';
import ExerciseHeader from '../components/ExerciseDetail/ExerciseHeader';
import ExerciseImage from '../components/ExerciseDetail/ExerciseImage';
import ExerciseSection from '../components/ExerciseDetail/ExerciseSection';
import { CircularProgress } from '@mui/material';
import { getExosById } from '../api/exerciseDB';

const ExerciseDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    // Simuler un appel API pour récupérer les données de l'exercice
    const fetchExerciseData = async () => {
      setLoading(true);
      try {
        // Dans une application réelle, vous feriez un appel API ici
        // Exemple: const response = await fetch(`/api/exercises/${id}`);
        
        // Simulation d'un délai de chargement
        const exoData = await getExosById(id)
        
        setExerciseData(exoData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Gérer l'erreur ici
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, [id]);

  return (
    <div className="min-h-screen bg-white pb-24">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : exerciseData ? (
        <>
          <ExerciseHeader 
            title={exerciseData.name} 
            onAddToTraining={() => alert('Exercice ajouté à l\'entraînement')}
          />
          
          <ExerciseImage imageUrl={exerciseData.gifUrl} title={exerciseData.name} />
          
          <div className="px-4 py-6 space-y-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {exerciseData.bodyPart}
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {exerciseData.target}
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {exerciseData.equipment}
              </span>
              {exerciseData.secondaryMuscles && exerciseData.secondaryMuscles.map((muscle, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {muscle}
                </span>
              ))}
            </div>
            
            <ExerciseSection 
              title="Muscles ciblés :" 
              content={`Principal: ${exerciseData.target}${exerciseData.secondaryMuscles ? `, Secondaires: ${exerciseData.secondaryMuscles.join(', ')}` : ''}`} 
            />
            
            <ExerciseSection 
              title="Équipement :" 
              content={exerciseData.equipment} 
            />
            
            <ExerciseSection 
              title="Instructions :" 
              content={
                <ol className="list-decimal pl-5 space-y-2">
                  {exerciseData.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              } 
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">Exercice non trouvé</p>
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0">
        <TabBar />
      </div>
    </div>
  );
};

export default ExerciseDetailPage;