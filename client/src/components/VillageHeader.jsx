/**
 * 🏰 VillageHeader Component
 * Bannière d'ambiance "village résistant"
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const VillageHeader = () => {
    const location = useLocation();

    return (
        <header className="village-header">
            <div className="village-banner">
                <div className="village-title">
                    <span className="shield-emoji">🛡️</span>
                    <h1>Le Village Numérique Résistant</h1>
                    <span className="shield-emoji">🛡️</span>
                </div>
                <p className="village-motto">"Contre l'Empire BigTechus, nous résistons !"</p>
            </div>

            <nav className="village-nav">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    🏠 Accueil
                </Link>
                <Link
                    to="/community"
                    className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}
                >
                    🌍 Communauté
                </Link>
            </nav>
        </header>
    );
};

export default VillageHeader;
