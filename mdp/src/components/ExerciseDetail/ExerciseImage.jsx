import React from 'react';

const ExerciseImage = ({ imageUrl, title }) => {
  return (
    <div className="px-4">
      <div className="bg-gray-100 rounded-xl p-4 flex justify-center items-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="max-h-64 object-contain"
          />
        ) : (
          <div className="h-64 w-full flex items-center justify-center text-gray-400">
            Image non disponible
          </div>
        )}
      </div>
      <h2 className="text-center text-lg font-medium mt-2">{title}</h2>
    </div>
  );
};

export default ExerciseImage;