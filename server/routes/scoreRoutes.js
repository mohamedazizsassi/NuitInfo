const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

/**
 * @route   GET /api/scores
 * @desc    Récupère tous les scores
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const scores = await Score.find().sort({ totalScore: -1 }).limit(100);
        res.json(scores);
    } catch (error) {
        console.error('Erreur GET /scores:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/scores/leaderboard
 * @desc    Récupère le classement des meilleurs joueurs
 * @access  Public
 */
router.get('/leaderboard', async (req, res) => {
    try {
        const { limit = 10, role } = req.query;

        let filter = {};
        if (role) {
            filter.role = role;
        }

        const leaderboard = await Score.find(filter)
            .sort({ totalScore: -1 })
            .limit(parseInt(limit))
            .select('playerName role totalScore badge createdAt');

        res.json(leaderboard);
    } catch (error) {
        console.error('Erreur GET /scores/leaderboard:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/scores/stats
 * @desc    Récupère les statistiques globales
 * @access  Public
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await Score.aggregate([
            {
                $group: {
                    _id: null,
                    totalPlayers: { $sum: 1 },
                    avgScore: { $avg: '$totalScore' },
                    avgAutonomy: { $avg: '$autonomy' },
                    avgCost: { $avg: '$cost' },
                    avgDurability: { $avg: '$durability' },
                    avgSobriety: { $avg: '$sobriety' },
                    avgLibre: { $avg: '$libre' }
                }
            }
        ]);

        const badgeStats = await Score.aggregate([
            {
                $group: {
                    _id: '$badge',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            general: stats[0] || {},
            badges: badgeStats
        });
    } catch (error) {
        console.error('Erreur GET /scores/stats:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/scores/:id
 * @desc    Récupère un score par son ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);

        if (!score) {
            return res.status(404).json({ message: 'Score non trouvé' });
        }

        res.json(score);
    } catch (error) {
        console.error('Erreur GET /scores/:id:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   POST /api/scores
 * @desc    Enregistre un nouveau score
 * @access  Public
 */
router.post('/', async (req, res) => {
    try {
        const { playerName, role, autonomy, cost, durability, sobriety, libre, episodesCompleted } = req.body;

        const score = new Score({
            playerName: playerName || 'Anonyme',
            role,
            autonomy,
            cost,
            durability,
            sobriety,
            libre,
            episodesCompleted
        });

        await score.save();

        res.status(201).json({
            message: 'Score enregistré avec succès ! 🎉',
            score
        });
    } catch (error) {
        console.error('Erreur POST /scores:', error);
        res.status(400).json({ message: 'Erreur d\'enregistrement', error: error.message });
    }
});

module.exports = router;
