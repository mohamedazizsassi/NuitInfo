/**
 * 🎲 Fonctions de randomisation
 */

/**
 * Mélange un tableau de manière aléatoire (algorithme Fisher-Yates)
 * @param {Array} array - Le tableau à mélanger
 * @returns {Array} - Une nouvelle copie du tableau mélangé
 */
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Mélange les épisodes et leurs choix
 * @param {Array} episodes - Les épisodes à mélanger
 * @returns {Array} - Les épisodes mélangés avec leurs choix mélangés
 */
export const shuffleEpisodesAndChoices = (episodes) => {
    // Mélanger l'ordre des épisodes
    const shuffledEpisodes = shuffleArray(episodes);

    // Mélanger les choix dans chaque épisode
    return shuffledEpisodes.map(episode => ({
        ...episode,
        choices: shuffleArray(episode.choices)
    }));
};
