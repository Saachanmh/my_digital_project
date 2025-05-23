import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import imageAccueil from '../../assets/home.png';
import imageEntrainement from '../../assets/barbell.png';
import imageUtilisateur from '../../assets/user.png';
import imageAutre from '../../assets/ellipsis.png';

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to check if a route is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="flex justify-around bg-gray-100 p-3 fixed bottom-0 w-full shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
            <button 
                className="flex flex-col items-center focus:outline-none"
                onClick={() => navigate('/')}
            >
                <img 
                    src={imageAccueil} 
                    alt="Accueil" 
                    className={`w-7 h-7 mb-1 ${isActive('/') ? 'filter brightness-75 sepia-100 hue-rotate-190 saturate-500' : ''}`}
                />
                <span className={`text-xs ${isActive('/') ? 'text-blue-500 font-bold' : 'text-gray-700'}`}>
                    Home
                </span>
            </button>
            <button 
                className="flex flex-col items-center focus:outline-none"
                onClick={() => navigate('/exercice')}
            >
                <img 
                    src={imageEntrainement} 
                    alt="Entrainement" 
                    className={`w-7 h-7 mb-1 ${isActive('/exercice') ? 'filter brightness-75 sepia-100 hue-rotate-190 saturate-500' : ''}`}
                />
                <span className={`text-xs ${isActive('/exercice') ? 'text-blue-500 font-bold' : 'text-gray-700'}`}>
                    Entrainements
                </span>
            </button>
            <button 
                className="flex flex-col items-center focus:outline-none"
                onClick={() => navigate('/stat')}
            >
                <img 
                    src={imageUtilisateur} 
                    alt="Utilisateurs" 
                    className={`w-7 h-7 mb-1 ${isActive('/stat') ? 'filter brightness-75 sepia-100 hue-rotate-190 saturate-500' : ''}`}
                />
                <span className={`text-xs ${isActive('/stat') ? 'text-blue-500 font-bold' : 'text-gray-700'}`}>
                    Utilisateurs
                </span>
            </button>
            <button 
                className="flex flex-col items-center focus:outline-none"
                onClick={() => navigate('/login')}
            >
                <img 
                    src={imageAutre} 
                    alt="Plus" 
                    className={`w-7 h-7 mb-1 ${isActive('/login') ? 'filter brightness-75 sepia-100 hue-rotate-190 saturate-500' : ''}`}
                />
                <span className={`text-xs ${isActive('/login') ? 'text-blue-500 font-bold' : 'text-gray-700'}`}>
                    Connexion
                </span>
            </button>
        </div>
    );
};

export default TabBar;
