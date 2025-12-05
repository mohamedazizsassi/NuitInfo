const mongoose = require('mongoose');

/**
 * Schéma pour un choix dans un épisode
 * Chaque choix a un texte, des effets sur les indicateurs NIRD, et un feedback
 */
const ChoiceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    effects: {
        autonomy: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
        durability: { type: Number, default: 0 },
        sobriety: { type: Number, default: 0 },
        libre: { type: Number, default: 0 },
        inclusion: { type: Number, default: 0 }
    },
    feedback: {
        type: String,
        required: true
    }
});

/**
 * Schéma pour un épisode du jeu
 * Chaque épisode représente une situation numérique typique
 */
const EpisodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    scene: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    },
    role: {
        type: String,
        enum: ['all', 'eleve', 'enseignant', 'technicien'],
        default: 'all'
    },
    choices: [ChoiceSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Episode', EpisodeSchema);
