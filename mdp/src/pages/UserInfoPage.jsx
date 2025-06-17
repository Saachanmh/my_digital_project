import React from 'react';
import UserInfoComponent from '../components/Auth/UserInfoPage';
import { useNavigate } from 'react-router-dom';

const UserInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-auto">
      <div className="flex items-center p-4 border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-2 text-[var(--color-purple)] hover:text-[var(--color-purple-700)]"
        >
          ← Retour
        </button>
        <h1 className="text-2xl font-bold text-[var(--color-purple)]">Informations utilisateur</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        <UserInfoComponent />
      </div>
    </div>
  );
};

export default UserInfoPage;