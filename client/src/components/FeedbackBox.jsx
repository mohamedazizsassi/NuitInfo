/**
 * 💬 FeedbackBox Component
 * Affiche le feedback dynamique après un choix
 */

import React from 'react';

const effectLabels = {
  autonomy: 'Autonomie',
  cost: 'Coût',
  durability: 'Durabilité',
  sobriety: 'Sobriété',
  libre: 'Libre',
  inclusion: 'Inclusion'
};

const FeedbackBox = ({ feedback, onNext, isLastEpisode }) => {
  if (!feedback) return null;

  return (
    <div className={`feedback-box ${feedback.isPositive ? 'positive' : 'negative'} animate-fade-in`}>
      <h4>
        {feedback.isPositive ? '✅ Bien joué !' : '⚠️ Hmm...'}
      </h4>

      <p className="feedback-text">{feedback.text}</p>

      <div className="effects-summary">
        {Object.entries(feedback.effects).map(([key, value]) => {
          if (value === 0) return null;
          const isPositive = value > 0;
          return (
            <span
              key={key}
              className={`effect-badge ${isPositive ? 'positive' : 'negative'}`}
            >
              {effectLabels[key]}: {isPositive ? '+' : ''}{value}
            </span>
          );
        })}
      </div>

      <button className="next-button" onClick={onNext}>
        {isLastEpisode ? '🏆 Voir mes résultats' : '➡️ Épisode suivant'}
      </button>
    </div>
  );
};

export default FeedbackBox;
