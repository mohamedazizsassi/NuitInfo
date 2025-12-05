/**
 * 📖 EpisodeCard Component
 * Affiche la scène narrative et les choix disponibles
 */

import React from 'react';
import ChoiceButton from './ChoiceButton';

const EpisodeCard = ({ episode, onChoice, selectedChoice, disabled }) => {
  if (!episode) {
    return (
      <div className="episode-card">
        <p>Aucun épisode disponible...</p>
      </div>
    );
  }

  return (
    <div className="episode-card animate-fade-in">
      <h2 className="episode-title">{episode.title}</h2>
      
      <div className="episode-scene">
        {episode.scene}
      </div>

      <div className="choices-container">
        {episode.choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            onClick={() => onChoice(choice.id)}
            selected={selectedChoice === choice.id}
            disabled={disabled || selectedChoice !== null}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeCard;
