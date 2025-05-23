import React, { useState } from 'react';
import LoginComponent from '../components/Auth/LoginPage';
import SignupComponent from '../components/Auth/SignupPage';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <div>
          <LoginComponent />
          <div className="text-center mt-4">
            <button 
              onClick={toggleForm}
              className="text-blue-500 underline"
            >
              Pas de compte ? Inscris-toi
            </button>
          </div>
        </div>
      ) : (
        <div>
          <SignupComponent />
          <div className="text-center mt-4">
            <button 
              onClick={toggleForm}
              className="text-blue-500 underline"
            >
              Déjà un compte ? Connecte-toi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;