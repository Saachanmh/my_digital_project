import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: '',
    weight: '',
    height: '',
    goal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save user info
    console.log('User info saved:', formData);
    navigate('/'); // Navigate to home page after completion
  };

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Remplissez les</h1>
      <h1 className="text-2xl font-bold mb-6">informations ci-dessous :</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
        <div className="mb-2">
          <label className="block text-gray-700 mb-2">Sexe</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-4 bg-gray-200 rounded-lg"
            required
          >
            <option value="" disabled>Sélectionnez votre sexe</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div className="mb-2 relative">
          <label className="block text-gray-700 mb-2">Poids</label>
          <div className="relative">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Insérez votre poids"
              className="w-full p-4 bg-gray-200 rounded-lg pr-12"
              required
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              kg
            </span>
          </div>
        </div>

        <div className="mb-2 relative">
          <label className="block text-gray-700 mb-2">Taille</label>
          <div className="relative">
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Insérez votre taille"
              className="w-full p-4 bg-gray-200 rounded-lg pr-12"
              required
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              cm
            </span>
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 mb-2">Quel est votre objectif ?</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full p-4 bg-gray-200 rounded-lg"
            required
          >
            <option value="" disabled>Objectif</option>
            <option value="lose">Perdre du poids</option>
            <option value="maintain">Maintenir mon poids</option>
            <option value="gain">Prendre du poids</option>
            <option value="muscle">Développer ma masse musculaire</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full p-4 bg-gray-200 rounded-lg text-gray-700 font-medium mt-auto"
        >
          Suivant
        </button>
      </form>
    </div>
  );
};

export default UserInfoPage;