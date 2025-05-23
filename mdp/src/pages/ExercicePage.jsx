import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TabBar from '../components/Tabbar/Tabbar';
import CategoryDrawer from '../components/Drawers/CategoryDrawer';
import { getAllExos } from '../api/exerciseDB';

const ExercicePage = () => {
    
  const [openDrawer, setOpenDrawer] = useState(null);
  const [category,setCategory] = useState({
    name:'',
    id:''
  })

  const exerciseCategories = [
    { id: 'fessier', name: 'Fessier' },
    { id: 'abdos', name: 'Abdos' },
    { id: 'jambes', name: 'Jambes' },
    { id: 'epaules', name: 'Epaules' },
    { id: 'pecs', name: 'Pecs' },
    { id: 'bras', name: 'Bras' },
    { id: 'dos', name: 'Dos' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'etirement', name: 'Etirement' },
  ];


  const handleDrawerOpen = (category) => {
    setCategory({...category})
    setOpenDrawer(category.id);
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
