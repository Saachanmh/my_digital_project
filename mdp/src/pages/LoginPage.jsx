import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginComponent from '../components/Auth/LoginPage';

const LoginPage = () => {
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
        <h1 className="text-2xl font-bold text-[var(--color-purple)]">Connexion</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        <LoginComponent />
        <div className="text-center mt-4">
          <Link to="/signup" className="text-[var(--color-purple)] hover:text-[var(--color-purple-700)] underline">
            Pas de compte ?
              Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
