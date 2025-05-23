import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExerciseForm = ({ isEditMode = false, initialExercise = null }) => {
  const navigate = useNavigate();
  
  // Default values for a new exercise
  const defaultExercise = {
    name: '',
    muscles: ['muscle1'],
    sets: [{ reps: '', weight: '' }],
    restTime: 120,
    comments: ''
  };
  
  // Use initial exercise data if in edit mode, otherwise use defaults
  const [exercise, setExercise] = useState(isEditMode ? initialExercise : defaultExercise);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the exercise data to your state/database
    console.log('Exercise saved:', exercise);
    navigate('/workout-session');
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle rest time changes
  const handleRestTimeChange = (change) => {
    setExercise(prev => ({
      ...prev,
      restTime: Math.max(0, prev.restTime + change)
    }));
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
    navigate('/workout-session');
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
                {exercise.muscles[0]}
              </span>
            </div>
          ) : (
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                muscle1
              </span>
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
                    value={isEditMode ? '12x' : 'rep.'}
                    readOnly={isEditMode}
                    className="w-full bg-transparent text-center"
                  />
                </div>
                {index < 3 && (
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <input
                      type="text"
                      value={isEditMode ? '40kg' : 'poids'}
                      readOnly={isEditMode}
                      className="w-full bg-transparent text-center"
                    />
                  </div>
                )}
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
            >
              −
            </button>
            
            <span>{exercise.restTime} s</span>
            
            <button
              type="button"
              onClick={() => handleRestTimeChange(10)}
              className="w-8 h-8 flex items-center justify-center"
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
            value={isEditMode ? 'super description de cet exo de ouf\nj\'adore suer et transpirer en homme musculeux' : ''}
            onChange={handleInputChange}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies venenatis, lectus leo sodales odio..."
            className="w-full h-32 p-3 bg-gray-100 rounded-lg resize-none"
          ></textarea>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ExerciseForm;