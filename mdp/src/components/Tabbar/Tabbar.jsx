import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import imageAccueil from '../../assets/home.png';
import imageEntrainement from '../../assets/dumbbell.png';
import imageUtilisateur from '../../assets/stats.png';
import imageAutre from '../../assets/connection.png';

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to check if a route is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="fixed bottom-4 w-full left-1/2 transform px-[26px] -translate-x-1/2 flex items-center justify-center z-50">
            <div className="flex w-full items-center justify-between bg-white rounded-full shadow-lg px-2 py-2">
                <button 
                    className={`flex flex-col items-center justify-center mx-3 focus:outline-none`}
                    onClick={() => navigate('/')}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive('/') ? 'bg-[var(--color-yellow)]' : 'bg-gray-200'} mb-0`}>
                        <img 
                            src={imageAccueil} 
                            alt="Accueil" 
                            className="w-6 h-6"
                        />
                    </div>
                </button>
                
                <button 
                    className={`flex flex-col items-center justify-center mx-3 focus:outline-none`}
                    onClick={() => navigate('/exercise')}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive('/exercice') ? 'bg-[var(--color-yellow)]' : 'bg-gray-200'} mb-0`}>
                        <img 
                            src={imageEntrainement} 
                            alt="Entrainement" 
                            className="w-6 h-6"
                        />
                    </div>
                </button>
                
                <button 
                    className={`flex flex-col items-center justify-center mx-3 focus:outline-none`}
                    onClick={() => navigate('/stat')}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive('/stat') ? 'bg-[var(--color-yellow)]' : 'bg-gray-200'} mb-0`}>
                        <img 
                            src={imageUtilisateur} 
                            alt="Utilisateurs" 
                            className="w-6 h-6"
                        />
                    </div>
                </button>
                
                <button 
                    className={`flex flex-col items-center justify-center mx-3 focus:outline-none`}
                    onClick={() => navigate('/login')}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive('/login') ? 'bg-[var(--color-yellow)]' : 'bg-gray-200'} mb-0`}>
                        <img 
                            src={imageAutre} 
                            alt="Plus" 
                            className="w-6 h-6"
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default TabBar;
