import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TabBar from '../components/Tabbar/Tabbar';
import CategoryDrawer from '../components/Drawers/CategoryDrawer';
import { getAllExos, getExosByBodyPart } from '../api/exerciseDB';

const ExercicePage = () => {
    
  const [openDrawer, setOpenDrawer] = useState(null);
  const [category, setCategory] = useState({
    name:'',
    id:''
  });
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const exerciseCategories = [
    { id: 'fessier', name: 'Fessier' },
    { id: 'waist', name: 'Abdos' },
    { id: 'upper legs', name: 'Jambes' },
    { id: 'shoulders', name: 'Epaules' },
    { id: 'chest', name: 'Pecs' },
    { id: 'upper arms', name: 'Bras' },
    { id: 'back', name: 'Dos' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'etirement', name: 'Etirement' },
  ];


  const handleDrawerOpen = async (category) => {
    setCategory({...category});
    setOpenDrawer(category.id);
    setLoading(true);
    
    try {
      const exercisesData = await getExosByBodyPart(category.id);
      setExercises(exercisesData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerClose = () => {
    setOpenDrawer(null);
  };

  return (
    <div className="p-4 pb-16 relative min-h-screen bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Exercices</h1>
        <button className="text-gray-600 text-sm">Voir tout</button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <TextField
          fullWidth
          placeholder="Recherche"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            className: 'rounded-full bg-gray-200',
          }}
          sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />
      </div>

      {/* Exercise Categories Grid */}
      <div className="grid grid-cols-3 gap-3">
        {exerciseCategories.map((category) => {
          // Special layout for wider items
          let className = 'bg-gray-200 rounded-xl flex items-center justify-center p-4 h-24';
          
          if (category.id === 'bras' || category.id === 'dos') {
            className += ' col-span-2';
          }
          
          return (
            <div
              key={category.id}
              className={className}
              onClick={() => handleDrawerOpen(category)}
            >
              <span className="font-medium">{category.name}</span>
            </div>
          );
        })}
      </div>

      {/* Create New Exercise Button */}
      <div className="mt-6">
        <Button
          variant="contained"
          fullWidth
          className="bg-gray-200 text-black hover:bg-gray-300 normal-case rounded-xl py-3"
          sx={{ boxShadow: 'none' }}
        >
          Créer un nouvel exercice
        </Button>
      </div>

        {/* Drawer for each category */}
        <CategoryDrawer
            key={category.id}
            category={category}
            exercises={exercises}
            loading={loading}
            open={openDrawer === category.id}
            onClose={handleDrawerClose}
        />
      <div className="fixed bottom-0 left-0 right-0">
        <TabBar />
      </div>
    </div>
  );
};

export default ExercicePage;
