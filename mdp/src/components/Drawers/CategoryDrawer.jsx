import React from 'react';
import { Drawer, CircularProgress } from '@mui/material';
import ExoCard from '../Cards/ExoCard';

const CategoryDrawer = ({ category, exercises = [], loading = false, open, onClose }) => {

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'rounded-t-xl p-4 h-2/3',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{category.name}</h2>
        <button onClick={onClose} className="text-gray-600">
          Fermer
        </button>
      </div>
      <div className="overflow-y-auto">
        <p>Liste des exercices pour {category.name}</p>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : exercises.length > 0 ? (
          <div className='grid grid-cols-2 gap-2.5'>
            {exercises.map((exo) => (
              <ExoCard
                className="rounded-3xl bg-gray-200 p-2.5 w-full flex flex-col items-center"
                key={exo.id}
                exo={exo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <p>Aucun exercice trouvé pour cette catégorie</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CategoryDrawer;