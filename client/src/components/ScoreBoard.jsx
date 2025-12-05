/**
 * 📊 ScoreBoard Component
 * Affiche les indicateurs NIRD avec des jauges colorées
 */

import React from 'react';

const scoreConfig = [
  { key: 'autonomy', label: 'Autonomie', emoji: '🔷', className: 'autonomy' },
  { key: 'cost', label: 'Coût', emoji: '💰', className: 'cost' },
  { key: 'durability', label: 'Durabilité', emoji: '🌱', className: 'durability' },
  { key: 'sobriety', label: 'Sobriété', emoji: '⚡', className: 'sobriety' },
  { key: 'libre', label: 'Libre', emoji: '💜', className: 'libre' },
  { key: 'inclusion', label: 'Inclusion', emoji: '🌸', className: 'inclusion' }
];

const ScoreBoard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h3>📊 Indicateurs NIRD</h3>

      {scoreConfig.map(({ key, label, emoji, className }) => {
        const value = scores[key] || 0;

        return (
          <div key={key} className={`score-item ${className}`}>
            <div className="score-label">
              <span className="label-text">
                {emoji} {label}
              </span>
              <span className="score-value">{value}</span>
            </div>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBoard;
