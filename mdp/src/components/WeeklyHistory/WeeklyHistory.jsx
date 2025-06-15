import React, { useState, useEffect } from 'react';
import { useStorageContext } from '../../services/StorageContext';

const WeeklyHistory = () => {
  const { getAllSessions } = useStorageContext();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        setLoading(true);
        // Récupérer toutes les sessions
        const sessions = await getAllSessions();
        
        // Filtrer les sessions de la semaine en cours
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Dimanche comme premier jour de la semaine
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Samedi comme dernier jour de la semaine
        endOfWeek.setHours(23, 59, 59, 999);
        
        // Filtrer les sessions qui ont été créées ou complétées cette semaine
        const sessionsThisWeek = sessions.filter(session => {
          const createdAt = new Date(session.createdAt);
          const completedDate = session.completedDate ? new Date(session.completedDate) : null;
          
          return (createdAt >= startOfWeek && createdAt <= endOfWeek) || 
                 (completedDate && completedDate >= startOfWeek && completedDate <= endOfWeek);
        });
        
        // Regrouper les sessions par jour
        const sessionsByDay = {};
        const dayNames = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
        
        sessionsThisWeek.forEach(session => {
          const date = new Date(session.createdAt);
          const day = date.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
          const dayOfMonth = date.getDate();
          
          if (!sessionsByDay[day]) {
            sessionsByDay[day] = {
              day: dayNames[day],
              date: dayOfMonth,
              completed: session.completed,
              count: 1
            };
          } else {
            sessionsByDay[day].count += 1;
            if (session.completed) {
              sessionsByDay[day].completed = true;
            }
          }
        });
        
        // Convertir l'objet en tableau pour l'affichage
        const historyArray = Object.values(sessionsByDay);
        
        // Trier par date (jour de la semaine)
        historyArray.sort((a, b) => {
          const dayA = dayNames.indexOf(a.day);
          const dayB = dayNames.indexOf(b.day);
          return dayA - dayB;
        });
        
        setWorkoutHistory(historyArray);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des entraînements:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkoutHistory();
  }, [getAllSessions]);

  return (
    <div className='p-4'>
      <div className="px-2 mb-5 bg-yellow text-dark rounded-2xl">
        <h3 className="text-lg py-4 font-display font-bold">Historique de la semaine</h3>
        {loading ? (
          <div className="flex justify-center pb-4">
            <p>Chargement...</p>
          </div>
        ) : workoutHistory.length > 0 ? (
          <div className="flex overflow-x-auto gap-3 pb-2">
            {workoutHistory.map((workout, index) => (
              <div 
                key={index} 
                className={`min-w-[80px] h-[80px] ${workout.completed ? 'bg-green-100' : 'bg-white'} rounded-xl flex flex-col items-center justify-center p-2`}
              >
                <div className="text-md font-bold text-gray-600">{workout.day}</div>
                <div className="text-lg font-medium mt-1">{workout.date}</div>
                {workout.count > 1 && (
                  <div className="text-xs text-gray-500 mt-1">{workout.count} séances</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center pb-4">
            <p>Aucun entraînement cette semaine</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyHistory;