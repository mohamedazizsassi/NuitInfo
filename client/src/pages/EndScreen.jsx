/**
 * 🏆 EndScreen Page
 * Écran de fin avec résultats et badge
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from '../components/ScoreBoard';
import { useGameState } from '../hooks/useGameState';
import { saveScore } from '../services/api';

const EndScreen = () => {
  const navigate = useNavigate();
  const {
    role,
    scores,
    history,
    getBadge,
    resetGame,
    gameCompleted,
    isLoading
  } = useGameState();

  const badge = getBadge();

  // Rediriger si le jeu n'est pas terminé
  useEffect(() => {
    if (!isLoading && !gameCompleted && !role) {
      navigate('/');
    }
  }, [gameCompleted, role, isLoading, navigate]);

  // Sauvegarder le score
  useEffect(() => {
    if (gameCompleted && role) {
      const savePlayerScore = async () => {
        try {
          await saveScore({
            role,
            ...scores
          });
          console.log('Score sauvegardé !');
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du score:', error);
        }
      };
      savePlayerScore();
    }
  }, [gameCompleted, role, scores]);

  const handleReplay = () => {
    resetGame();
    navigate('/');
  };

  const handleShare = () => {
    const text = `🛡️ J'ai obtenu le badge "${badge.title}" dans Le Parcours du Résistant Numérique ! 
    
📊 Mes scores :
🔷 Autonomie: ${scores.autonomy}
💰 Coût: ${scores.cost}
🌱 Durabilité: ${scores.durability}
⚡ Sobriété: ${scores.sobriety}
💜 Libre: ${scores.libre}

#NuitDeLInfo #NumériqueResponsable`;

    if (navigator.share) {
      navigator.share({
        title: 'Le Parcours du Résistant Numérique',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Résultat copié dans le presse-papier ! 📋');
    }
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="end-screen">
      <div className="congratulations">🎉</div>
      
      <h1>Parcours Terminé !</h1>
      <p className="subtitle">
        Tu as complété tous les épisodes. Voici ton résultat...
      </p>

      <div className="badge-container">
        <div className="badge-emoji">{badge.emoji}</div>
        <h2 className="badge-title">{badge.title}</h2>
        <p className="badge-description">{badge.description}</p>
      </div>

      <div className="final-scores">
        <h3>📊 Tes Scores Finaux</h3>
        <ScoreBoard scores={scores} />
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            Score Total : {totalScore} / 500
          </span>
        </div>
      </div>

      {/* Historique des choix */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '25px',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '30px'
      }}>
        <h3 style={{ 
          color: 'var(--accent)', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          📜 Historique de tes choix
        </h3>
        
        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto',
          paddingRight: '10px'
        }}>
          {history.map((item, index) => (
            <div key={index} style={{
              padding: '10px',
              marginBottom: '10px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--accent)'
            }}>
              <strong style={{ color: 'var(--accent)' }}>
                {index + 1}. {item.episodeTitle}
              </strong>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                marginTop: '5px'
              }}>
                → {item.choiceText}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-button primary"
          onClick={handleReplay}
        >
          🔄 Rejouer
        </button>
        
        <button 
          className="action-button secondary"
          onClick={handleShare}
        >
          📤 Partager
        </button>
        
        <button 
          className="action-button secondary"
          onClick={() => navigate('/')}
        >
          🏠 Accueil
        </button>
      </div>

      {/* Message motivationnel */}
      <p style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '500px',
        textAlign: 'center',
        color: 'var(--text-secondary)'
      }}>
        💡 <strong>Le savais-tu ?</strong> Chaque petit geste numérique compte. 
        En adoptant des pratiques responsables, tu contribues à un monde 
        numérique plus libre, plus durable et plus souverain !
      </p>
    </div>
  );
};

export default EndScreen;
