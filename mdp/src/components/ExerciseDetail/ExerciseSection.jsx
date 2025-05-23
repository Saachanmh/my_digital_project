import React from 'react';

const ExerciseSection = ({ title, content }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {typeof content === 'string' ? (
        <p className="text-gray-800">{content}</p>
      ) : (
        <div className="text-gray-800">{content}</div>
      )}
    </div>
  );
};

export default ExerciseSection;