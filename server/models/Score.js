const mongoose = require('mongoose');

/**
 * Schéma pour sauvegarder les scores des joueurs
 * Permet de créer un classement et suivre les performances
 */
const ScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    default: 'Anonyme',
    trim: true
  },
  role: {
    type: String,
    enum: ['eleve', 'enseignant', 'technicien'],
    required: true
  },
  autonomy: {
    type: Number,
    default: 50
  },
  cost: {
    type: Number,
    default: 50
  },
  durability: {
    type: Number,
    default: 50
  },
  sobriety: {
    type: Number,
    default: 50
  },
  libre: {
    type: Number,
    default: 50
  },
  inclusion: {
    type: Number,
    default: 50
  },
  totalScore: {
    type: Number,
    default: 0
  },
  badge: {
    type: String,
    enum: ['Résistant Junior', 'Gaulois du Numérique', 'Druide Libre'],
    default: 'Résistant Junior'
  },
  episodesCompleted: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

/**
 * Calcule le score total et attribue un badge avant la sauvegarde
 */
ScoreSchema.pre('save', function (next) {
  // Calcul du score total
  this.totalScore = this.autonomy + this.durability + this.sobriety + this.libre - Math.abs(this.cost);

  // Attribution du badge en fonction du score
  if (this.totalScore >= 300) {
    this.badge = 'Druide Libre';
  } else if (this.totalScore >= 150) {
    this.badge = 'Gaulois du Numérique';
  } else {
    this.badge = 'Résistant Junior';
  }

  next();
});

module.exports = mongoose.model('Score', ScoreSchema);
