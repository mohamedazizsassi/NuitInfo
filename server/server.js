const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import des routes
const episodeRoutes = require('./routes/episodeRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const communityRoutes = require('./routes/communityRoutes');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de logging (dev)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`);
  next();
});

// Routes API
app.use('/api/episodes', episodeRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/community', communityRoutes);

// Route de bienvenue
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Bienvenue sur l\'API du Parcours du Résistant Numérique !',
    version: '2.0.0',
    endpoints: {
      episodes: '/api/episodes',
      scores: '/api/scores',
      community: '/api/community',
      leaderboard: '/api/scores/leaderboard',
      seed: 'POST /api/episodes/seed'
    }
  });
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée 🔍' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err);
  res.status(500).json({ message: 'Erreur serveur interne', error: err.message });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Serveur démarré sur le port ${PORT}
  📍 http://localhost:${PORT}
  🎮 API: http://localhost:${PORT}/api/episodes
  📊 Scores: http://localhost:${PORT}/api/scores
  
  💡 Pour initialiser la base de données:
     POST http://localhost:${PORT}/api/episodes/seed
  `);
});
