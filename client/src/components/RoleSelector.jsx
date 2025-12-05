/**
 * 🎭 RoleSelector Component
 * Permet de choisir son rôle : Élève, Enseignant, ou Technicien
 */

import React from 'react';

const roles = [
  {
    id: 'eleve',
    name: 'Élève',
    emoji: '🎒',
    description: 'Tu découvres le numérique au collège'
  },
  {
    id: 'enseignant',
    name: 'Enseignant',
    emoji: '👨‍🏫',
    description: 'Tu guides les élèves et utilises des outils pédagogiques'
  },
  {
    id: 'technicien',
    name: 'Technicien Réseau',
    emoji: '🔧',
    description: 'Tu gères l\'infrastructure numérique de l\'établissement'
  }
];

const RoleSelector = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="role-selector">
      <h2>👤 Choisis ton rôle</h2>
      <div className="role-cards">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
            onClick={() => onSelectRole(role.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onSelectRole(role.id)}
            aria-pressed={selectedRole === role.id}
          >
            <div className="role-emoji">{role.emoji}</div>
            <div className="role-name">{role.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
