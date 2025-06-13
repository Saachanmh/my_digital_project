import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStorageContext } from '../../services/StorageContext';
import { createExercise } from '../../services/models';

const ExerciseForm = ({ isEditMode = false, initialExercise = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addExercise, updateExercise, getExerciseById } = useStorageContext();
  const [isButtonDisabled,setIsButtonDisabled] = useState()
  // Récupérer le sessionId depuis les paramètres de l'URL
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId');

  // Default values for a new exercise
  const defaultExercise = {
    name: '',
    muscles: ['muscle1'],
    sets: [{ reps: '', weight: '' }],
    restTime: 120,
    comments: '',
    sessionId: sessionId // Ajouter le sessionId à l'exercice
  };

  // Use initial exercise data if in edit mode, otherwise use defaults
  const [exercise, setExercise] = useState(isEditMode ? {
    ...initialExercise,
    muscles: initialExercise?.muscles || ['muscle1'], // Ensure muscles array exists
    sets: initialExercise?.sets || [{ reps: '', weight: '' }], // Ensure sets array exists
    restTime: initialExercise?.restTime || 120,
    comments: initialExercise?.comments || ''
  } : defaultExercise);
  
  // Charger les données de l'exercice si on est en mode édition
  useEffect(() => {
    if (isEditMode && initialExercise?.id) {
      const loadExercise = async () => {
        try {
          const exerciseData = await getExerciseById(initialExercise.id);
          if (exerciseData) {
            setExercise(exerciseData);
          }
        } catch (err) {
          console.error('Erreur lors du chargement de l\'exercice:', err);
        }
      };
      
      loadExercise();
    }
  }, [isEditMode, initialExercise, getExerciseById]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Valider les données du formulaire
      if (!exercise.name.trim()) {
        alert('Veuillez entrer un nom pour l\'exercice');
        return;
      }
      
      // Valider les séries
      const validSets = exercise.sets.filter(set => set.reps && set.weight);
      if (validSets.length === 0) {
        alert('Veuillez ajouter au moins une série avec répétitions et poids');
        return;
      }
      
      // Créer un nouvel exercice ou mettre à jour l'existant
      if (isEditMode) {
        await updateExercise(exercise);
        console.log('Exercice mis à jour:', exercise);
      } else {
        // Créer un nouvel exercice avec un ID unique
        const newExercise = createExercise(
          exercise.name,
          sessionId, // S'assurer que le sessionId est bien défini
          exercise.muscles,
          exercise.sets,
          exercise.comments,
          ''
        );
        
        await addExercise(newExercise);
        console.log('Nouvel exercice ajouté:', newExercise);
      }
      
      // Rediriger vers la page de séance avec le bon ID
      if (sessionId) {
        navigate(`/workout-session/${sessionId}`);
      } else {
        navigate('/workout-session');
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de l\'exercice:', err);
      alert('Une erreur est survenue lors de la sauvegarde de l\'exercice');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle set input changes
  const handleSetInputChange = (index, field, value) => {
    const newSets = [...exercise.sets];
    newSets[index][field] = value;
    setExercise(prev => ({
      ...prev,
      sets: newSets
    }));
  };

  // Handle rest time changes with debouncing
  const handleRestTimeChange = (change) => {
    if (isButtonDisabled) return;

    setExercise(prev => {
      const newRestTime = prev.restTime + change;
      return {
        ...prev,
        restTime: newRestTime < 0 ? 0 : newRestTime
      };
    });

    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500); // Disable buttons for 500ms
  };

  // Handle adding a new set
  const handleAddSet = () => {
    setExercise(prev => ({
      ...prev,
      sets: [...prev.sets, { reps: '', weight: '' }]
    }));
  };

  // Handle going back
  const handleGoBack = () => {
    if (sessionId) {
      navigate(`/workout-session/${sessionId}`);
    } else {
      navigate('/workout-session');
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Modifier exercice' : 'Créer exercice'}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Exercise Name */}
        <div className="mb-6">
          {isEditMode ? (
            <div className="flex items-center mb-2">
              <h2 className="text-lg font-medium">{exercise.name}</h2>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full ml-2">
                {exercise.muscles && exercise.muscles.length > 0 ? exercise.muscles[0] : 'Aucun muscle'}
              </span>
            </div>
          ) : (
            <div className="flex flex-col mb-4">
              <label htmlFor="exerciseName" className="mb-2">Nom de l'exercice</label>
              <input
                type="text"
                id="exerciseName"
                name="name"
                value={exercise.name}
                onChange={handleInputChange}
                placeholder="Ex: Développé couché"
                className="p-2 border rounded-lg"
              />
              <div className="flex items-center mt-2">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {exercise.muscles && exercise.muscles.length > 0 ? exercise.muscles[0] : 'Aucun muscle'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sets and Reps */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-4">Masse et répétition</h2>

          <div className="grid grid-cols-4 gap-2 mb-2">
            {exercise.sets.map((set, index) => (
              <React.Fragment key={index}>
                <div className="bg-gray-100 rounded-lg p-2 text-center">
                  <input
                    type="text"
                    value={set.reps}
                    onChange={(e) => handleSetInputChange(index, 'reps', e.target.value)}
                    className="w-full bg-transparent text-center"
                    placeholder="reps"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg p-2 text-center">
                  <input
                    type="text"
                    value={set.weight}
                    onChange={(e) => handleSetInputChange(index, 'weight', e.target.value)}
                    className="w-full bg-transparent text-center"
                    placeholder="weight"
                  />
                </div>
              </React.Fragment>
            ))}
            {/* Add set button */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center">
              <button
                type="button"
                onClick={handleAddSet}
                className="text-gray-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Rest Time */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Temps de repos par série</h2>

          <div className="bg-gray-200 rounded-lg p-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleRestTimeChange(-10)}
              className="w-8 h-8 flex items-center justify-center"
              disabled={isButtonDisabled}
            >
              −
            </button>

            <span>{exercise.restTime} s</span>

            <button
              type="button"
              onClick={() => handleRestTimeChange(10)}
              className="w-8 h-8 flex items-center justify-center"
              disabled={isButtonDisabled}
            >
              +
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-10">
          <h2 className="text-base font-medium mb-2">Commentaire{isEditMode ? 's' : ''}</h2>

          <textarea
            name="comments"
            value={exercise.comments}
            onChange={handleInputChange}
            placeholder="Ajouter des notes sur l'exercice..."
            className="w-full h-32 p-3 bg-gray-100 rounded-lg resize-none"
          ></textarea>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-1/3 bg-gray-300 text-gray-700 py-3 rounded-xl font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="w-2/3 bg-purple text-white py-3 rounded-xl font-medium"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
