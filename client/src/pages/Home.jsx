/**
 * 🏠 Home Page
 * Page d'accueil avec sélection du rôle
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';
import VillageHeader from '../components/VillageHeader';
import { useGameState } from '../hooks/useGameState';

const Home = () => {
  const navigate = useNavigate();
  const { selectRole, isLoading, error, role: savedRole } = useGameState();
  const [selectedRole, setSelectedRole] = useState(savedRole);

  const handleStartGame = () => {
    if (selectedRole) {
      selectRole(selectedRole);
      navigate('/game');
    }
  };

  const handleContinueGame = () => {
    navigate('/game');
  };

  return (
    <>
      <VillageHeader />
      <div className="home-page">
        <div className="home-emoji">🛡️</div>

        <h1 className="home-title">Le Parcours du Résistant Numérique</h1>

        <p className="home-subtitle">
          🎮 Un jeu narratif éducatif où chaque choix façonne ta souveraineté numérique !
          <br />
          Prends les bonnes décisions pour devenir un véritable Druide Libre !
        </p>

        {error && (
          <div className="error-message" style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #ef4444',
            padding: '15px 25px',
            borderRadius: '10px',
            marginBottom: '20px',
            color: '#fca5a5'
          }}>
            ⚠️ {error}
          </div>
        )}

        {isLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Chargement des épisodes...</p>
          </div>
        ) : (
          <>
            <RoleSelector
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
            />

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                className="start-button"
                onClick={handleStartGame}
                disabled={!selectedRole}
              >
                🚀 Nouvelle Partie
              </button>

              {savedRole && (
                <button
                  className="start-button"
                  onClick={handleContinueGame}
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  }}
                >
                  ▶️ Continuer
                </button>
              )}
            </div>

            <div style={{
              marginTop: '40px',
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🔷</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-autonomy)' }}>Autonomie</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>💰</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-cost)' }}>Coût</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🌱</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-durability)' }}>Durabilité</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>⚡</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-sobriety)' }}>Sobriété</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>💜</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-libre)' }}>Libre</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🌸</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-inclusion)' }}>Inclusion</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
