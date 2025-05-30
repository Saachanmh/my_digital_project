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
    { id: 'fessier', name: 'Fessier' ,color:"yellow",gridArea: "1 / 1 / 3 / 3"},
    { id: 'waist', name: 'Abdos' ,color:"purple", gridArea:"1 / 3 / 3 / 5"},
    { id: 'upper legs', name: 'Jambes' ,color:"pinkish", gridArea:"1 / 5 / 4 / 7"},
    { id: 'shoulders', name: 'Epaules' ,color:"pinkish", gridArea:"3 / 1 / 5 / 3"},
    { id: 'chest', name: 'Pecs' ,color:"yellow", gridArea:"3 / 3 / 5 / 5"},
    { id: 'upper arms', name: 'Bras' ,color:"purple", gridArea:"5 / 1 / 6 / 5"},
    { id: 'back', name: 'Dos' ,color:"purple", gridArea:"4 / 5 / 6 / 7"},
    { id: 'cardio', name: 'Cardio' ,color:"yellow", gridArea:"6 / 1 / 9 / 4"},
    { id: 'etirement', name: 'Etirement' ,color:"pinkish", gridArea:"6 / 4 / 9 / 7"},
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
        <h1 className="text-2xl font-display">Exercices</h1>
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
      <div 
        style={{gridTemplateColumns:'repeat(6, 1fr)', gridTemplateRows:'repeat(8, 1fr)'}}
        className="grid gap-2">
        {exerciseCategories.map((category) => {
          // Special layout for wider items
          let className = `bg-${category.color} rounded-xl flex items-center justify-center p-4`;
          
          if (category.id === 'bras' || category.id === 'dos') {
            className += ' col-span-2';
          }
          
          return (
            <div
              key={category.id}
              className={className}
              style={{gridArea:category.gridArea}}
              onClick={() => handleDrawerOpen(category)}
            >
              <span className="font-bold font-display text-white text-xl">{category.name}</span>
            </div>
          );
        })}
      </div>

      {/* Create New Exercise Button */}
      <div className="mt-6">
        <button
          className="bg-dark text-white hover:bg-gray-300 normal-case rounded-2xl py-8 w-full"
        >
          Créer un nouvel exercice
        </button>
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
