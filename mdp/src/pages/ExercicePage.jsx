import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TabBar from '../components/Tabbar/Tabbar';
import CategoryDrawer from '../components/Drawers/CategoryDrawer';
import { getAllExos, getExosByBodyPart } from '../api/exerciseDB';
import { useNavigate } from 'react-router-dom';
import './ExercisePage.css'

// Import des images
import imgFessiers from '../assets/exercises/fessiers.png';
import imgAbdos from '../assets/exercises/abdos.png';
import imgJambes from '../assets/exercises/jambes.png';
import imgEpaules from '../assets/exercises/epaules.png';
import imgPecs from '../assets/exercises/pecs.png';
import imgBras from '../assets/exercises/bras.png';
import imgDos from '../assets/exercises/dos.png';
import imgCardio from '../assets/exercises/cardio.png';
import imgEtirement from '../assets/exercises/etirement.png';

const ExercicePage = () => {
    
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(null);
  const [category, setCategory] = useState({
    name:'',
    id:''
  });
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  const exerciseCategories = [
    { id: 'fessier', name: 'Fessier', color:"yellow", gridArea: "1 / 1 / 3 / 3", image: imgFessiers},
    { id: 'waist', name: 'Abdos', color:"purple", gridArea:"1 / 3 / 3 / 5", image: imgAbdos},
    { id: 'upper legs', name: 'Jambes', color:"pinkish", gridArea:"1 / 5 / 4 / 7", image: imgJambes},
    { id: 'shoulders', name: 'Epaules', color:"pinkish", gridArea:"3 / 1 / 5 / 3", image: imgEpaules},
    { id: 'chest', name: 'Pecs', color:"yellow", gridArea:"3 / 3 / 5 / 5", image: imgPecs},
    { id: 'upper arms', name: 'Bras', color:"purple", gridArea:"5 / 1 / 6 / 5", image: imgBras},
    { id: 'back', name: 'Dos', color:"purple", gridArea:"4 / 5 / 6 / 7", image: imgDos},
    { id: 'cardio', name: 'Cardio', color:"yellow", gridArea:"6 / 1 / 9 / 4", image: imgCardio},
    { id: 'etirement', name: 'Etirement', color:"pinkish", gridArea:"6 / 4 / 9 / 7", image: imgEtirement},
  ];

  // Fetch all exercises when component mounts
  useEffect(() => {
    const fetchAllExercises = async () => {
      setLoading(true);
      try {
        const data = await getAllExos();
        setAllExercises(data);
      } catch (error) {
        console.error('Error fetching all exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllExercises();
  }, []);

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

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Filter exercises based on search term
    const filteredResults = allExercises.filter(ex => 
      ex.name.toLowerCase().includes(value.toLowerCase())
    );
    
    setSearchResults(filteredResults.slice(0, 10)); // Limit to 10 results
  };

  // Handle selecting an exercise from search results
  const handleSelectExercise = (exercise) => {
    // Use React Router's navigate instead of window.location.href
    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <div className="p-4 pb-24 relative min-h-screen bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-display">Exercices</h1>
        <button className="text-gray-600 text-sm">Voir tout</button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <TextField
          fullWidth
          placeholder="Recherche"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
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
        
        {/* Search Results Dropdown */}
        {searchTerm && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map(exercise => (
              <div 
                key={exercise.id}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSelectExercise(exercise)}
              >
                {exercise.gifUrl && (
                  <img 
                    src={exercise.gifUrl} 
                    alt={exercise.name} 
                    className="w-10 h-10 mr-3 object-cover rounded"
                  />
                )}
                <div>
                  <div className="font-medium">{exercise.name}</div>
                  <div className="text-sm text-gray-600">{exercise.bodyPart}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searchTerm && searchResults.length === 0 && !loading && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-center">
            Aucun exercice trouvé
          </div>
        )}
      </div>

      {/* Exercise Categories Grid */}
      <div 
        style={{gridTemplateColumns:'repeat(6, 1fr)', gridTemplateRows:'repeat(7, 1fr)'}}
        className="grid gap-2">
        {exerciseCategories.map((category) => {
          // Special layout for wider items
          let className = `bg-${category.color} exercise-category rounded-xl flex items-center justify-center px-2 py-4 bg-no-repeat`;
          
          // Ajouter le style d'arrière-plan avec l'image importée
          const backgroundStyle = {
            backgroundImage: `url(${category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          };
          
          if (category.id === 'bras' || category.id === 'dos') {
            className += ' col-span-2';
          }
          
          return (
            <div
              key={category.id}
              className={className}
              style={{...backgroundStyle, gridArea:category.gridArea}}
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
