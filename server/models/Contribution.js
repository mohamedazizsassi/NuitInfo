const mongoose = require('mongoose');

/**
 * 🌍 Modèle Contribution
 * Représente une contribution sur le Mur des Résistants
 * Permet de créer une dimension communautaire NIRD
 */
const ContributionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    category: {
        type: String,
        enum: ['reemploi', 'libre', 'sobriete', 'autonomie', 'inclusion', 'durabilite'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index pour optimiser les recherches par catégorie et date
ContributionSchema.index({ category: 1, date: -1 });
ContributionSchema.index({ username: 1 });

module.exports = mongoose.model('Contribution', ContributionSchema);
