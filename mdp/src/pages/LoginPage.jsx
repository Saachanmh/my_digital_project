import React from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from '../components/Auth/LoginPage';

const LoginPage = () => {
  return (
    <div>
      <LoginComponent />
      <div className="text-center mt-4">
        <Link to="/signup" className="text-blue-500 underline">
          Pas de compte ? Inscris-toi
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
