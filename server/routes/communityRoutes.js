const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');

/**
 * 🌍 Routes Communauté
 * API pour gérer le Mur des Résistants
 */

/**
 * GET /api/community
 * Récupère toutes les contributions
 * Filtrable par catégorie via query ?category=libre
 */
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const contributions = await Contribution.find(filter)
            .sort({ date: -1 })
            .limit(100);

        res.json(contributions);
    } catch (error) {
        console.error('❌ Erreur récupération contributions:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * GET /api/community/top
 * Récupère le classement des top résistants
 */
router.get('/top', async (req, res) => {
    try {
        const topContributors = await Contribution.aggregate([
            {
                $group: {
                    _id: '$username',
                    totalContributions: { $sum: 1 },
                    totalLikes: { $sum: '$likes' }
                }
            },
            {
                $sort: { totalContributions: -1, totalLikes: -1 }
            },
            {
                $limit: 10
            }
        ]);

        res.json(topContributors);
    } catch (error) {
        console.error('❌ Erreur classement:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * GET /api/community/stats
 * Statistiques de la communauté
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await Contribution.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Contribution.countDocuments();

        res.json({
            total,
            byCategory: stats
        });
    } catch (error) {
        console.error('❌ Erreur statistiques:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * POST /api/community
 * Crée une nouvelle contribution
 */
router.post('/', async (req, res) => {
    try {
        const { username, message, category } = req.body;

        // Validation
        if (!username || !message || !category) {
            return res.status(400).json({
                message: 'Tous les champs sont requis (username, message, category)'
            });
        }

        if (message.length > 500) {
            return res.status(400).json({
                message: 'Le message ne peut pas dépasser 500 caractères'
            });
        }

        const contribution = new Contribution({
            username,
            message,
            category
        });

        await contribution.save();

        res.status(201).json(contribution);
    } catch (error) {
        console.error('❌ Erreur création contribution:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * PUT /api/community/:id/like
 * Ajoute un like à une contribution
 */
router.put('/:id/like', async (req, res) => {
    try {
        const contribution = await Contribution.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!contribution) {
            return res.status(404).json({ message: 'Contribution non trouvée' });
        }

        res.json(contribution);
    } catch (error) {
        console.error('❌ Erreur like:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * DELETE /api/community/:id
 * Supprime une contribution (pour modération)
 */
router.delete('/:id', async (req, res) => {
    try {
        const contribution = await Contribution.findByIdAndDelete(req.params.id);

        if (!contribution) {
            return res.status(404).json({ message: 'Contribution non trouvée' });
        }

        res.json({ message: 'Contribution supprimée', contribution });
    } catch (error) {
        console.error('❌ Erreur suppression:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;
