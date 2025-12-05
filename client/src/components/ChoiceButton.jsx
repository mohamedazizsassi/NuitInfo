/**
 * 🔘 ChoiceButton Component
 * Un bouton stylisé représentant un choix
 */

import React from 'react';

const ChoiceButton = ({ choice, onClick, selected, disabled }) => {
  return (
    <button
      className={`choice-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="choice-id">{choice.id}</span>
      <span className="choice-text">{choice.text}</span>
    </button>
  );
};

export default ChoiceButton;
