/**
 * Service de stockage local pour les données d'entraînement
 * Utilise IndexedDB pour stocker les routines, séances et exercices
 */

// Nom de la base de données et version
const DB_NAME = 'workoutApp';
const DB_VERSION = 1;

// Noms des object stores
const STORES = {
  ROUTINES: 'routines',
  SESSIONS: 'sessions',
  EXERCISES: 'exercises'
};

/**
 * Initialise la base de données IndexedDB
 * @returns {Promise} Promise qui se résout quand la base de données est prête
 */
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Création ou mise à jour de la structure de la base de données
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Création des object stores s'ils n'existent pas
      if (!db.objectStoreNames.contains(STORES.ROUTINES)) {
        const routinesStore = db.createObjectStore(STORES.ROUTINES, { keyPath: 'id', autoIncrement: true });
        routinesStore.createIndex('name', 'name', { unique: false });
        routinesStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
        const sessionsStore = db.createObjectStore(STORES.SESSIONS, { keyPath: 'id', autoIncrement: true });
        sessionsStore.createIndex('name', 'name', { unique: false });
        sessionsStore.createIndex('routineId', 'routineId', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.EXERCISES)) {
        const exercisesStore = db.createObjectStore(STORES.EXERCISES, { keyPath: 'id', autoIncrement: true });
        exercisesStore.createIndex('name', 'name', { unique: false });
        exercisesStore.createIndex('sessionId', 'sessionId', { unique: false });
        exercisesStore.createIndex('apiId', 'apiId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('Erreur lors de l\'ouverture de la base de données:', event.target.error);
      reject(event.target.error);
    };
  });
};

/**
 * Exécute une opération sur la base de données
 * @param {string} storeName - Nom de l'object store
 * @param {string} mode - Mode d'accès ('readonly' ou 'readwrite')
 * @param {Function} callback - Fonction à exécuter avec la transaction
 * @returns {Promise} Promise qui se résout avec le résultat de l'opération
 */
const dbOperation = async (storeName, mode, callback) => {
  try {
    const db = await initDatabase();
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
    console.error('Erreur lors de l\'opération sur la base de données:', error);
    throw error;
  }
};

// API pour les routines

/**
 * Ajoute une nouvelle routine
 * @param {Object} routine - Objet routine à ajouter
 * @returns {Promise<number>} ID de la routine ajoutée
 */
const addRoutine = (routine) => {
  const routineData = {
    ...routine,
    createdAt: new Date().toISOString()
  };

  return dbOperation(STORES.ROUTINES, 'readwrite', (store, resolve, reject) => {
    const request = store.add(routineData);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère toutes les routines
 * @returns {Promise<Array>} Liste des routines
 */
const getAllRoutines = () => {
  return dbOperation(STORES.ROUTINES, 'readonly', (store, resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère une routine par son ID
 * @param {number} id - ID de la routine
 * @returns {Promise<Object>} Routine trouvée
 */
const getRoutineById = (id) => {
  return dbOperation(STORES.ROUTINES, 'readonly', (store, resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Met à jour une routine existante
 * @param {Object} routine - Routine à mettre à jour (doit contenir un ID)
 * @returns {Promise<undefined>}
 */
const updateRoutine = (routine) => {
  return dbOperation(STORES.ROUTINES, 'readwrite', (store, resolve, reject) => {
    const request = store.put(routine);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Supprime une routine par son ID
 * @param {number} id - ID de la routine à supprimer
 * @returns {Promise<undefined>}
 */
const deleteRoutine = (id) => {
  return dbOperation(STORES.ROUTINES, 'readwrite', (store, resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// API pour les séances

/**
 * Ajoute une nouvelle séance
 * @param {Object} session - Objet séance à ajouter
 * @returns {Promise<number>} ID de la séance ajoutée
 */
const addSession = (session) => {
  return dbOperation(STORES.SESSIONS, 'readwrite', (store, resolve, reject) => {
    const request = store.add(session);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère toutes les séances
 * @returns {Promise<Array>} Liste des séances
 */
const getAllSessions = () => {
  return dbOperation(STORES.SESSIONS, 'readonly', (store, resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère une séance par son ID
 * @param {number} id - ID de la séance
 * @returns {Promise<Object>} Séance trouvée
 */
const getSessionById = (id) => {
  return dbOperation(STORES.SESSIONS, 'readonly', (store, resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère toutes les séances d'une routine
 * @param {number} routineId - ID de la routine
 * @returns {Promise<Array>} Liste des séances de la routine
 */
const getSessionsByRoutineId = (routineId) => {
  return dbOperation(STORES.SESSIONS, 'readonly', (store, resolve, reject) => {
    const index = store.index('routineId');
    const request = index.getAll(routineId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Met à jour une séance existante
 * @param {Object} session - Séance à mettre à jour (doit contenir un ID)
 * @returns {Promise<undefined>}
 */
const updateSession = (session) => {
  return dbOperation(STORES.SESSIONS, 'readwrite', (store, resolve, reject) => {
    const request = store.put(session);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Supprime une séance par son ID
 * @param {number} id - ID de la séance à supprimer
 * @returns {Promise<undefined>}
 */
const deleteSession = (id) => {
  return dbOperation(STORES.SESSIONS, 'readwrite', (store, resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// API pour les exercices

/**
 * Ajoute un nouvel exercice
 * @param {Object} exercise - Objet exercice à ajouter
 * @returns {Promise<number>} ID de l'exercice ajouté
 */
const addExercise = (exercise) => {
  return dbOperation(STORES.EXERCISES, 'readwrite', (store, resolve, reject) => {
    const request = store.add(exercise);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère tous les exercices
 * @returns {Promise<Array>} Liste des exercices
 */
const getAllExercises = () => {
  return dbOperation(STORES.EXERCISES, 'readonly', (store, resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère un exercice par son ID
 * @param {number} id - ID de l'exercice
 * @returns {Promise<Object>} Exercice trouvé
 */
const getExerciseById = (id) => {
  return dbOperation(STORES.EXERCISES, 'readonly', (store, resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Récupère tous les exercices d'une séance
 * @param {number} sessionId - ID de la séance
 * @returns {Promise<Array>} Liste des exercices de la séance
 */
const getExercisesBySessionId = (sessionId) => {
  return dbOperation(STORES.EXERCISES, 'readonly', (store, resolve, reject) => {
    const index = store.index('sessionId');
    const request = index.getAll(sessionId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Met à jour un exercice existant
 * @param {Object} exercise - Exercice à mettre à jour (doit contenir un ID)
 * @returns {Promise<undefined>}
 */
const updateExercise = (exercise) => {
  return dbOperation(STORES.EXERCISES, 'readwrite', (store, resolve, reject) => {
    const request = store.put(exercise);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Supprime un exercice par son ID
 * @param {number} id - ID de l'exercice à supprimer
 * @returns {Promise<undefined>}
 */
const deleteExercise = (id) => {
  return dbOperation(STORES.EXERCISES, 'readwrite', (store, resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export {
  // Constantes
  STORES,
  
  // Fonctions d'initialisation
  initDatabase,
  
  // API Routines
  addRoutine,
  getAllRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
  
  // API Séances
  addSession,
  getAllSessions,
  getSessionById,
  getSessionsByRoutineId,
  updateSession,
  deleteSession,
  
  // API Exercices
  addExercise,
  getAllExercises,
  getExerciseById,
  getExercisesBySessionId,
  updateExercise,
  deleteExercise
};