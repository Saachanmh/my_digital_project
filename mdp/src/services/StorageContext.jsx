import React, { createContext, useContext } from 'react';
import useStorage from './useStorage';

// Création du contexte
const StorageContext = createContext(null);

/**
 * Fournisseur du contexte de stockage
 * Permet d'accéder aux fonctions de stockage depuis n'importe quel composant
 */
export const StorageProvider = ({ children }) => {
  const storage = useStorage();

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte de stockage
 * @returns {Object} Les fonctions et états du service de stockage
 */
export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (context === null) {
    throw new Error('useStorageContext doit être utilisé à l\'intérieur d\'un StorageProvider');
  }
  return context;
};