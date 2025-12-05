/**
 * 🎮 Game Page
 * Page principale du jeu avec les épisodes
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EpisodeCard from '../components/EpisodeCard';
import ScoreBoard from '../components/ScoreBoard';
import FeedbackBox from '../components/FeedbackBox';
import { useGameState } from '../hooks/useGameState';

const Game = () => {
  const navigate = useNavigate();
  const {
    role,
    scores,
    currentEpisode,
    currentEpisodeIndex,
    totalEpisodes,
    feedback,
    selectedChoice,
    isLoading,
    error,
    gameCompleted,
    handleChoice,
    nextEpisode
  } = useGameState();

  // Rediriger si pas de rôle sélectionné
  useEffect(() => {
    if (!isLoading && !role) {
      navigate('/');
    }
  }, [role, isLoading, navigate]);

  // Rediriger vers la fin si le jeu est terminé
  useEffect(() => {
    if (gameCompleted) {
      navigate('/end');
    }
  }, [gameCompleted, navigate]);

  const handleNextEpisode = () => {
    nextEpisode();
  };

  if (isLoading) {
    return (
      <div className="game-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Chargement de l'épisode...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-page">
        <div className="error-container" style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <h2 style={{ color: 'var(--color-cost)', marginBottom: '20px' }}>
            ⚠️ Erreur
          </h2>
          <p style={{ marginBottom: '20px' }}>{error}</p>
          <button 
            className="action-button primary"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const roleLabels = {
    eleve: '🎒 Élève',
    enseignant: '👨‍🏫 Enseignant',
    technicien: '🔧 Technicien'
  };

  const isLastEpisode = currentEpisodeIndex >= totalEpisodes - 1;

  return (
    <div className="game-page">
      <header className="game-header">
        <h1>🛡️ Résistant Numérique</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ 
            background: 'var(--bg-card)', 
            padding: '8px 15px', 
            borderRadius: '20px',
            fontSize: '0.9rem'
          }}>
            {roleLabels[role] || role}
          </span>
          <div className="episode-counter">
            📖 Épisode {currentEpisodeIndex + 1} / {totalEpisodes}
          </div>
        </div>
      </header>

      {/* Barre de progression */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        height: '8px',
        background: 'var(--bg-card)',
        borderRadius: '10px',
        marginBottom: '30px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentEpisodeIndex + (feedback ? 1 : 0)) / totalEpisodes) * 100}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--color-libre))',
          borderRadius: '10px',
          transition: 'width 0.5s ease'
        }} />
      </div>

      <div className="game-content">
        <div className="game-main">
          <EpisodeCard
            episode={currentEpisode}
            onChoice={handleChoice}
            selectedChoice={selectedChoice}
            disabled={!!feedback}
          />

          <FeedbackBox
            feedback={feedback}
            onNext={handleNextEpisode}
            isLastEpisode={isLastEpisode}
          />
        </div>

        <aside className="game-sidebar">
          <ScoreBoard scores={scores} />
          
          <div style={{
            marginTop: '20px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'var(--text-secondary)',
              marginBottom: '10px'
            }}>
              💡 Conseil
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Chaque choix impacte tes indicateurs. Vise l'équilibre pour devenir un véritable Druide Libre !
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Game;
