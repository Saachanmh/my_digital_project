/**
 * Service d'authentification pour l'application
 * Gère l'inscription, la connexion, et la gestion des utilisateurs
 * Utilise IndexedDB pour stocker les données utilisateur et implémente le hachage des mots de passe
 */

// Nom de la base de données et version
const AUTH_DB_NAME = 'authApp';
const AUTH_DB_VERSION = 1;

// Noms des object stores
const AUTH_STORES = {
  USERS: 'users',
  OAUTH_TOKENS: 'oauthTokens'
};

/**
 * Fonction pour hacher un mot de passe avec SHA-256
 * @param {string} password - Mot de passe à hacher
 * @returns {Promise<string>} - Mot de passe haché
 */
const hashPassword = async (password) => {
  // Convertir la chaîne en un tableau d'octets
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Hacher les données avec SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convertir le tableau d'octets en chaîne hexadécimale
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

/**
 * Vérifie si un mot de passe correspond au hachage stocké
 * @param {string} password - Mot de passe à vérifier
 * @param {string} hashedPassword - Hachage stocké
 * @returns {Promise<boolean>} - True si le mot de passe correspond
 */
const verifyPassword = async (password, hashedPassword) => {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
};

/**
 * Initialise la base de données d'authentification
 * @returns {Promise} Promise qui se résout quand la base de données est prête
 */
const initAuthDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AUTH_DB_NAME, AUTH_DB_VERSION);

    // Création ou mise à jour de la structure de la base de données
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Création des object stores s'ils n'existent pas
      if (!db.objectStoreNames.contains(AUTH_STORES.USERS)) {
        const usersStore = db.createObjectStore(AUTH_STORES.USERS, { keyPath: 'id', autoIncrement: true });
        usersStore.createIndex('firstName', 'firstName', { unique: true }); // Utiliser firstName comme identifiant unique
        usersStore.createIndex('email', 'email', { unique: true });
      }

      if (!db.objectStoreNames.contains(AUTH_STORES.OAUTH_TOKENS)) {
        const tokensStore = db.createObjectStore(AUTH_STORES.OAUTH_TOKENS, { keyPath: 'id', autoIncrement: true });
        tokensStore.createIndex('userId', 'userId', { unique: false });
        tokensStore.createIndex('provider', 'provider', { unique: false });
        tokensStore.createIndex('token', 'token', { unique: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('Erreur lors de l\'ouverture de la base de données d\'authentification:', event.target.error);
      reject(event.target.error);
    };
  });
};

/**
 * Exécute une opération sur la base de données d'authentification
 * @param {string} storeName - Nom de l'object store
 * @param {string} mode - Mode d'accès ('readonly' ou 'readwrite')
 * @param {Function} callback - Fonction à exécuter avec la transaction
 * @returns {Promise} Promise qui se résout avec le résultat de l'opération
 */
const authDbOperation = async (storeName, mode, callback) => {
  try {
    const db = await initAuthDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      transaction.oncomplete = () => {
        db.close();
      };

      transaction.onerror = (event) => {
        console.error('Erreur de transaction:', event.target.error);
        reject(event.target.error);
      };

      callback(store, resolve, reject);
    });
  } catch (error) {
    console.error('Erreur lors de l\'opération sur la base de données d\'authentification:', error);
    throw error;
  }
};

/**
 * Enregistre un nouvel utilisateur
 * @param {Object} userData - Données de l'utilisateur à enregistrer
 * @returns {Promise<number>} - ID de l'utilisateur créé
 */
const registerUser = async (userData) => {
  try {
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await hashPassword(userData.password);
    
    // Préparer les données utilisateur avec le mot de passe haché
    const userToSave = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    // Enregistrer l'utilisateur dans la base de données
    return await authDbOperation(AUTH_STORES.USERS, 'readwrite', (store, resolve, reject) => {
      const request = store.add(userToSave);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    throw error;
  }
};

/**
 * Authentifie un utilisateur
 * @param {string} firstName - Prénom de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<Object|null>} - Données utilisateur si authentifié, null sinon
 */
const loginUser = async (firstName, password) => {
  try {
    // Récupérer l'utilisateur par son prénom
    const user = await authDbOperation(AUTH_STORES.USERS, 'readonly', (store, resolve, reject) => {
      const index = store.index('firstName');
      const request = index.get(firstName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    // Si l'utilisateur n'existe pas, retourner null
    if (!user) {
      return null;
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (isPasswordValid) {
      // Ne pas renvoyer le mot de passe haché
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    throw error;
  }
};

/**
 * Récupère un utilisateur par son ID
 * @param {number} id - ID de l'utilisateur
 * @returns {Promise<Object|null>} - Données utilisateur sans le mot de passe
 */
const getUserById = async (id) => {
  try {
    const user = await authDbOperation(AUTH_STORES.USERS, 'readonly', (store, resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    if (user) {
      // Ne pas renvoyer le mot de passe haché
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    throw error;
  }
};

/**
 * Met à jour les informations d'un utilisateur
 * @param {Object} userData - Données utilisateur à mettre à jour (doit contenir un ID)
 * @returns {Promise<void>}
 */
const updateUser = async (userData) => {
  try {
    // Si le mot de passe est fourni, le hacher
    let dataToUpdate = { ...userData };
    
    if (userData.password) {
      dataToUpdate.password = await hashPassword(userData.password);
    }
    
    return await authDbOperation(AUTH_STORES.USERS, 'readwrite', (store, resolve, reject) => {
      const request = store.put(dataToUpdate);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};

/**
 * Authentifie un utilisateur via OAuth
 * @param {string} provider - Fournisseur OAuth (ex: 'google', 'facebook')
 * @param {string} token - Token d'authentification
 * @param {Object} userData - Données utilisateur de base
 * @returns {Promise<Object>} - Données utilisateur
 */
const oauthLogin = async (provider, token, userData) => {
  try {
    // Vérifier si le token existe déjà
    const existingToken = await authDbOperation(AUTH_STORES.OAUTH_TOKENS, 'readonly', (store, resolve, reject) => {
      const index = store.index('token');
      const request = index.get(token);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    if (existingToken) {
      // Token existant, récupérer l'utilisateur associé
      return await getUserById(existingToken.userId);
    }
    
    // Créer un nouvel utilisateur avec un mot de passe aléatoire
    const randomPassword = Math.random().toString(36).slice(-10);
    const userId = await registerUser({
      ...userData,
      password: randomPassword
    });
    
    // Enregistrer le token OAuth
    await authDbOperation(AUTH_STORES.OAUTH_TOKENS, 'readwrite', (store, resolve, reject) => {
      const tokenData = {
        userId,
        provider,
        token,
        createdAt: new Date().toISOString()
      };
      const request = store.add(tokenData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    return await getUserById(userId);
  } catch (error) {
    console.error('Erreur lors de l\'authentification OAuth:', error);
    throw error;
  }
};

export {
  // Fonctions d'authentification
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  oauthLogin,
  
  // Fonctions utilitaires
  hashPassword,
  verifyPassword
};