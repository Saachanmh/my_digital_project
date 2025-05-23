import React from 'react';
import './Tabbar_module.css';
import imageAccueil from '../../assets/home.png';
import imageCalendrier from '../../assets/calendar.png';
import imageEntrainement from '../../assets/barbell.png';
import imageUtilisateur from '../../assets/user.png';
import imageAutre from '../../assets/ellipsis.png';

const TabBar = () => {
    return (
        <div className="tabbar">
            <button className="tabbar-button">
                <img src={imageAccueil} alt="Accueil" />
                <span>Home</span>
            </button>
            <button className="tabbar-button">
                <img src={imageCalendrier} alt="Calendrier" />
                <span>Search</span>
            </button>
            <button className="tabbar-button">
                <img src={imageEntrainement} alt="Entrainement" />
                <span>Profile</span>
            </button>
            <button className="tabbar-button">
                <img src={imageUtilisateur} alt="Utilisateurs" />
                <span>Settings</span>
            </button>
            <button className="tabbar-button">
                <img src={imageAutre} alt="Plus" />
                <span>Settings</span>
            </button>
        </div>
    );
};

export default TabBar;
