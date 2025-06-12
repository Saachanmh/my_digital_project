import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DailyWorkout from '../components/DailyWorkout/DailyWorkout';

function NewRoutinePage() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [routineDetails, setRoutineDetails] = useState('');
  const [showSessionDrawer, setShowSessionDrawer] = useState(false);

  // jours de la semaine
  const [selectedDays, setSelectedDays] = useState({
    L: false,
    M: false,
    M2: false,
    J: false,
    V: false,
    S: false,
    D: false
  });

  // session mock
  const [sessions, setSessions] = useState([
    { id: 1, name: 'Séance Push', muscles: 'Pecs - Épaules - Triceps' },
    { id: 2, name: 'Séance Pull', muscles: 'Dos - Biceps - Avant-bras' },
    { id: 3, name: 'Séance jambes', muscles: 'Quadriceps - Ischio-jambiers - Mollets' }
  ]);

  // sessions selectionnés 
  const [selectedSessions, setSelectedSessions] = useState([]);

  const handleDayToggle = (day) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day]
    });
  };

  const toggleSessionDrawer = () => {
    setShowSessionDrawer(!showSessionDrawer);
  };

  const handleSessionSelect = (session) => {
    // Create a new session with selected days
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day);

    if (selectedDaysArray.length === 0) {
      alert('Veuillez sélectionner au moins un jour');
      return;
    }

    const newSession = {
      ...session,
      days: selectedDaysArray
    };

    setSelectedSessions([...selectedSessions, newSession]);
    setSelectedDays({
      L: false,
      M: false,
      M2: false,
      J: false,
      V: false,
      S: false,
      D: false
    });
    setShowSessionDrawer(false);
  };

  const handleAddRoutine = () => {
    if (!routineName) {
      alert('Veuillez donner un nom à votre routine');
      return;
    }

    if (selectedSessions.length === 0) {
      alert('Veuillez ajouter au moins une séance');
      return;
    }

    // Here you would save the routine data
    console.log({
      name: routineName,
      details: routineDetails,
      sessions: selectedSessions
    });

    // Navigate back to training page or wherever appropriate
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">Nouvelle Routine</h1>
        
        {/* Routine Details Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Votre nom de séance"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
          />
          <textarea
            placeholder="Détails"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={routineDetails}
            onChange={(e) => setRoutineDetails(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Séances</h2>
        
        {/* Selected Sessions List */}
        <div className="mb-6">
          {selectedSessions.map((session, index) => (
                <DailyWorkout/>
          ))}
        </div>

        {/* Add Session Button */}
        <button
          onClick={toggleSessionDrawer}
          className="w-full p-4 bg-gray-200 rounded-lg text-center mb-6"
        >
          Ajouter une séance
        </button>

        {/* Save Routine automatique */}
        
      </div>

      {/* Session Selection Drawer */}
      {showSessionDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-5">
            <h2 className="text-xl font-bold mb-4">Sélectionner les jours</h2>
            
            <div className="flex justify-between mb-6">
              {Object.entries({
                L: 'L',
                M: 'M',
                M2: 'M',
                J: 'J',
                V: 'V',
                S: 'S',
                D: 'D'
              }).map(([key, label]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="mb-2">{label}</span>
                  <div 
                    className={`w-6 h-6 border ${selectedDays[key] ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} rounded flex items-center justify-center cursor-pointer`}
                    onClick={() => handleDayToggle(key)}
                  >
                    {selectedDays[key] && <span className="text-white">✓</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              {sessions.map(session => (
                <div 
                  key={session.id} 
                  className="bg-gray-100 p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSessionSelect(session)}
                >
                  <h3 className="font-semibold">{session.name}</h3>
                  <p className="text-sm text-gray-600">{session.muscles}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button 
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={() => setShowSessionDrawer(false)}
              >
                Annuler
              </button>
              <button 
                className="bg-gray-200 px-4 py-2 rounded-lg flex items-center"
                onClick={() => navigate('/create-exercise')}
              >
                <span className="mr-2">+</span>
                Créer une séance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewRoutinePage;