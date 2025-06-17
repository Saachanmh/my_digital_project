import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Authenticate user with the authService
      const user = await loginUser(formData.firstName, formData.password);
      
      if (user) {
        // Store user data in localStorage for session management
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Login successful:', user);
        navigate('/'); // Navigate to home page after login
      } else {
        // Generic error message for security (doesn't reveal if username or password is incorrect)
        setError('Identifiants incorrects. Veuillez vérifier votre prénom et mot de passe.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-2 font-display">Connexion</h1>
      <p className="text-gray-700 mb-1">Entrez vos informations</p>
      <p className="text-gray-700 mb-6">
        Pas de compte ? <Link to="/signup" className="text-blue-500 underline">Inscrivez-vous</Link>
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <div className="mb-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full p-4 bg-purple rounded-lg text-white"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="w-full p-4 bg-purple rounded-lg pr-12 text-white"
            required
            disabled={isLoading}
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            disabled={isLoading}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-right mb-6">
          <Link to="/forgot-password" className="text-gray-400 text-sm">
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          className={`w-full p-4 bg-dark font-display rounded-lg text-white font-medium mt-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Connexion'}
        </button>
        
        <div className="flex justify-center mt-4 text-sm text-gray-500 space-x-4">
          <Link to="/gcu" className="hover:text-blue-500">CGU</Link>
          <Link to="/conditions-of-sale" className="hover:text-blue-500">Conditions de vente</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
