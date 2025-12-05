/**
 * 🎮 GameContext
 * Contexte global pour partager l'état du jeu entre les composants
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getEpisodes } from '../services/api';
import { shuffleEpisodesAndChoices } from '../utils/shuffle';

// Scores initiaux
const INITIAL_SCORES = {
    autonomy: 50,
    cost: 50,
    durability: 50,
    sobriety: 50,
    libre: 50,
    inclusion: 50
};

// Clé pour le localStorage
const STORAGE_KEY = 'parcours_resistant_numerique';

// Création du contexte
const GameContext = createContext(null);

/**
 * Provider du contexte de jeu
 */
export const GameProvider = ({ children }) => {
    // États
    const [role, setRole] = useState(null);
    const [scores, setScores] = useState(INITIAL_SCORES);
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [history, setHistory] = useState([]);

    // Charger les épisodes au démarrage
    useEffect(() => {
        const loadEpisodes = async () => {
            try {
                setIsLoading(true);
                const data = await getEpisodes();
                // Mélanger les épisodes et leurs choix pour chaque nouvelle partie
                const shuffledData = shuffleEpisodesAndChoices(data);
                setEpisodes(shuffledData);
                setError(null);
            } catch (err) {
                setError('Impossible de charger les épisodes. Vérifiez que le serveur est démarré.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadEpisodes();
    }, []);

    // Charger la progression sauvegardée
    useEffect(() => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.role) setRole(parsed.role);
                if (parsed.scores) setScores(parsed.scores);
                if (parsed.currentEpisodeIndex !== undefined) {
                    setCurrentEpisodeIndex(parsed.currentEpisodeIndex);
                }
                if (parsed.history) setHistory(parsed.history);
                if (parsed.gameCompleted) setGameCompleted(parsed.gameCompleted);
            } catch (e) {
                console.error('Erreur lors du chargement de la sauvegarde:', e);
            }
        }
    }, []);

    // Sauvegarder la progression
    useEffect(() => {
        if (role) {
            const stateToSave = {
                role,
                scores,
                currentEpisodeIndex,
                history,
                gameCompleted
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        }
    }, [role, scores, currentEpisodeIndex, history, gameCompleted]);

    // Épisode actuel
    const currentEpisode = episodes[currentEpisodeIndex] || null;

    // Sélectionner un rôle
    const selectRole = useCallback(async (selectedRole) => {
        setRole(selectedRole);
        // Réinitialiser le jeu pour un nouveau rôle
        setScores(INITIAL_SCORES);
        setCurrentEpisodeIndex(0);
        setHistory([]);
        setGameCompleted(false);
        setFeedback(null);
        setSelectedChoice(null);

        // Recharger et mélanger les épisodes pour une nouvelle partie
        try {
            const data = await getEpisodes();
            const shuffledData = shuffleEpisodesAndChoices(data);
            setEpisodes(shuffledData);
        } catch (err) {
            console.error('Erreur lors du rechargement des épisodes:', err);
        }
    }, []);

    // Gérer un choix
    const handleChoice = useCallback((choiceId) => {
        if (!currentEpisode) return;

        const choice = currentEpisode.choices.find(c => c.id === choiceId);
        if (!choice) return;

        setSelectedChoice(choiceId);

        // Calculer les nouveaux scores
        const newScores = { ...scores };
        Object.keys(choice.effects).forEach(key => {
            newScores[key] = Math.max(0, Math.min(100, newScores[key] + choice.effects[key]));
        });

        setScores(newScores);

        // Créer le feedback
        const isPositive = Object.values(choice.effects).reduce((a, b) => a + b, 0) > 0;
        setFeedback({
            text: choice.feedback,
            effects: choice.effects,
            isPositive
        });

        // Ajouter à l'historique
        setHistory(prev => [...prev, {
            episodeId: currentEpisode._id,
            episodeTitle: currentEpisode.title,
            choiceId,
            choiceText: choice.text,
            effects: choice.effects
        }]);
    }, [currentEpisode, scores]);

    // Passer à l'épisode suivant
    const nextEpisode = useCallback(() => {
        setFeedback(null);
        setSelectedChoice(null);

        if (currentEpisodeIndex < episodes.length - 1) {
            setCurrentEpisodeIndex(prev => prev + 1);
        } else {
            setGameCompleted(true);
        }
    }, [currentEpisodeIndex, episodes.length]);

    // Calculer le badge final
    const getBadge = useCallback(() => {
        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
        const averageScore = totalScore / 6; // 6 indicateurs maintenant

        if (averageScore >= 80) {
            return {
                title: '🏆 Druide Libre',
                emoji: '🧙‍♂️',
                description: 'Maître absolu du numérique responsable ! Tu as atteint l\'illumination digitale.'
            };
        } else if (averageScore >= 60) {
            return {
                title: '⚔️ Gaulois du Numérique',
                emoji: '💪',
                description: 'Tu résistes vaillamment à l\'empire des GAFAM ! Continue ainsi.'
            };
        } else if (averageScore >= 40) {
            return {
                title: '🛡️ Résistant Junior',
                emoji: '🌱',
                description: 'Tu as fait tes premiers pas dans la résistance numérique. La route est longue mais tu es sur la bonne voie !'
            };
        } else {
            return {
                title: '📱 Apprenti Connecté',
                emoji: '🐣',
                description: 'Tu découvres encore le monde du numérique responsable. Chaque choix compte !'
            };
        }
    }, [scores]);

    // Réinitialiser le jeu
    const resetGame = useCallback(async () => {
        setRole(null);
        setScores(INITIAL_SCORES);
        setCurrentEpisodeIndex(0);
        setFeedback(null);
        setSelectedChoice(null);
        setGameCompleted(false);
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);

        // Recharger et mélanger les épisodes pour une nouvelle partie
        try {
            const data = await getEpisodes();
            const shuffledData = shuffleEpisodesAndChoices(data);
            setEpisodes(shuffledData);
        } catch (err) {
            console.error('Erreur lors du rechargement des épisodes:', err);
        }
    }, []);

    const value = {
        // États
        role,
        scores,
        episodes,
        currentEpisode,
        currentEpisodeIndex,
        feedback,
        selectedChoice,
        isLoading,
        error,
        gameCompleted,
        history,

        // Actions
        selectRole,
        handleChoice,
        nextEpisode,
        getBadge,
        resetGame,

        // Infos
        totalEpisodes: episodes.length,
        progress: episodes.length > 0
            ? Math.round((currentEpisodeIndex / episodes.length) * 100)
            : 0
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

/**
 * Hook pour utiliser le contexte de jeu
 */
export const useGameState = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameState doit être utilisé dans un GameProvider');
    }
    return context;
};

export default GameContext;
