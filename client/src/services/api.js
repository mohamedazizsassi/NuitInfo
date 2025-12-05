/**
 * 🌐 Service API
 * Gère toutes les communications avec le backend
 */

import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Récupère tous les épisodes
 * @returns {Promise<Array>} Liste des épisodes
 */
export const getEpisodes = async () => {
  try {
    const response = await api.get('/episodes');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des épisodes:', error);
    throw error;
  }
};

/**
 * Récupère un épisode par son ID
 * @param {string} id - ID de l'épisode
 * @returns {Promise<Object>} L'épisode demandé
 */
export const getEpisodeById = async (id) => {
  try {
    const response = await api.get(`/episodes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'épisode ${id}:`, error);
    throw error;
  }
};

/**
 * Sauvegarde un score final
 * @param {Object} scoreData - Données du score
 * @returns {Promise<Object>} Le score enregistré
 */
export const saveScore = async (scoreData) => {
  try {
    const response = await api.post('/scores', scoreData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score:', error);
    throw error;
  }
};

/**
 * Récupère le classement des joueurs
 * @param {number} limit - Nombre maximum de résultats
 * @returns {Promise<Array>} Le classement
 */
export const getLeaderboard = async (limit = 10) => {
  try {
    const response = await api.get(`/scores/leaderboard?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du classement:', error);
    throw error;
  }
};

/**
 * Exécute le seed de la base de données (développement uniquement)
 * @returns {Promise<Object>} Résultat du seed
 */
export const seedDatabase = async () => {
  try {
    const response = await api.post('/episodes/seed');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du seed:', error);
    throw error;
  }
};

/**
 * 🌍 FONCTIONS COMMUNAUTÉ
 */

/**
 * Récupère les contributions de la communauté
 * @param {string} category - Catégorie optionnelle pour filtrer
 * @returns {Promise<Array>} Liste des contributions
 */
export const getCommunityContributions = async (category = '') => {
  try {
    const url = category ? `/community?category=${category}` : '/community';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des contributions:', error);
    throw error;
  }
};

/**
 * Crée une nouvelle contribution
 * @param {Object} contributionData - Données de la contribution
 * @returns {Promise<Object>} La contribution créée
 */
export const createContribution = async (contributionData) => {
  try {
    const response = await api.post('/community', contributionData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la contribution:', error);
    throw error;
  }
};

/**
 * Récupère le classement des top contributeurs
 * @returns {Promise<Array>} Liste des top contributeurs
 */
export const getTopContributors = async () => {
  try {
    const response = await api.get('/community/top');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des top contributeurs:', error);
    throw error;
  }
};

/**
 * Ajoute un like à une contribution
 * @param {string} id - ID de la contribution
 * @returns {Promise<Object>} La contribution mise à jour
 */
export const likeContribution = async (id) => {
  try {
    const response = await api.put(`/community/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du like:', error);
    throw error;
  }
};

/**
 * Récupère les statistiques de la communauté
 * @returns {Promise<Object>} Statistiques
 */
export const getCommunityStats = async () => {
  try {
    const response = await api.get('/community/stats');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    throw error;
  }
};

export default api;
