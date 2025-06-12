/**
 * Modèles de données pour l'application
 * Ces modèles définissent la structure des objets stockés dans IndexedDB
 */

/**
 * Crée un nouvel objet routine
 * @param {string} name - Nom de la routine
 * @param {string} description - Description de la routine
 * @param {string[]} days - Jours de la semaine pour cette routine
 * @returns {Object} Objet routine
 */
export const createRoutine = (name, description = '', days = []) => {
  return {
    id: Date.now().toString(), // Identifiant unique basé sur le timestamp
    name,
    description,
    days,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Crée un nouvel objet séance
 * @param {string} name - Nom de la séance
 * @param {string} routineId - Identifiant de la routine associée
 * @param {number} duration - Durée estimée en minutes
 * @param {number} calories - Calories estimées
 * @returns {Object} Objet séance
 */
export const createSession = (name, routineId, duration = 60, calories = 0) => {
  return {
    id: Date.now().toString(),
    name,
    routineId,
    duration,
    calories,
    completed: false,
    scheduledDate: null,
    completedDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Crée un nouvel objet exercice
 * @param {string} name - Nom de l'exercice
 * @param {string} sessionId - Identifiant de la séance associée
 * @param {string[]} muscles - Muscles ciblés
 * @param {Array} sets - Séries (poids, répétitions)
 * @param {string} notes - Notes supplémentaires
 * @param {string} imageUrl - URL de l'image (optionnel)
 * @returns {Object} Objet exercice
 */
export const createExercise = (name, sessionId, muscles = [], sets = [], notes = '', imageUrl = '') => {
  return {
    id: Date.now().toString(),
    name,
    sessionId,
    muscles,
    sets,
    notes,
    imageUrl,
    order: 0, // Ordre dans la séance
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Crée un nouvel objet série
 * @param {number} reps - Nombre de répétitions
 * @param {number} weight - Poids en kg
 * @param {boolean} completed - Si la série est complétée
 * @returns {Object} Objet série
 */
export const createSet = (reps = 12, weight = 0, completed = false) => {
  return {
    id: Date.now().toString(),
    reps,
    weight,
    completed
  };
};