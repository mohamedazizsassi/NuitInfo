const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode');
const { seedEpisodes } = require('../seed');

/**
 * @route   GET /api/episodes
 * @desc    Récupère tous les épisodes triés par ordre
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { role } = req.query;

        // Vérifie si la DB est vide, si oui auto-seed
        const count = await Episode.countDocuments();
        if (count === 0) {
            console.log('📦 Base vide détectée, auto-seed des épisodes...');
            await Episode.insertMany(seedEpisodes);
            console.log('✅ 10 épisodes insérés automatiquement');
        }

        // Filtre par rôle si spécifié
        let filter = {};
        if (role && role !== 'all') {
            filter = { $or: [{ role: 'all' }, { role: role }] };
        }

        const episodes = await Episode.find(filter).sort({ order: 1 });
        res.json(episodes);
    } catch (error) {
        console.error('Erreur GET /episodes:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/episodes/:id
 * @desc    Récupère un épisode par son ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);

        if (!episode) {
            return res.status(404).json({ message: 'Épisode non trouvé' });
        }

        res.json(episode);
    } catch (error) {
        console.error('Erreur GET /episodes/:id:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/episodes/:id/choice/:choiceId
 * @desc    Récupère les effets d'un choix spécifique
 * @access  Public
 */
router.get('/:id/choice/:choiceId', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);

        if (!episode) {
            return res.status(404).json({ message: 'Épisode non trouvé' });
        }

        const choice = episode.choices.find(c => c.id === req.params.choiceId);

        if (!choice) {
            return res.status(404).json({ message: 'Choix non trouvé' });
        }

        res.json({
            effects: choice.effects,
            feedback: choice.feedback
        });
    } catch (error) {
        console.error('Erreur GET /episodes/:id/choice/:choiceId:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   POST /api/episodes
 * @desc    Crée un nouvel épisode
 * @access  Public (à sécuriser en production)
 */
router.post('/', async (req, res) => {
    try {
        const episode = new Episode(req.body);
        await episode.save();
        res.status(201).json(episode);
    } catch (error) {
        console.error('Erreur POST /episodes:', error);
        res.status(400).json({ message: 'Erreur de création', error: error.message });
    }
});

/**
 * @route   POST /api/episodes/seed
 * @desc    Remplit la base avec tous les épisodes (10 épisodes complets)
 * @access  Public (à sécuriser en production)
 */
router.post('/seed', async (req, res) => {
    try {
        // Supprime les épisodes existants
        await Episode.deleteMany({});

        // Utilise les épisodes du fichier seed.js (10 épisodes au total)
        const episodes = await Episode.insertMany(seedEpisodes);

        res.json({
            message: `✅ ${episodes.length} épisodes créés avec succès ! 🎮`,
            count: episodes.length,
            episodes: episodes.map(ep => ({ id: ep._id, title: ep.title, order: ep.order }))
        });
    } catch (error) {
        console.error('Erreur POST /episodes/seed:', error);
        res.status(500).json({ message: 'Erreur de seed', error: error.message });
    }
});

module.exports = router;
