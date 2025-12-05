/**
 * 🌍 Page Communauté
 * Mur des Résistants - Espace communautaire NIRD
 */

import React, { useState, useEffect } from 'react';
import VillageHeader from '../components/VillageHeader';
import { getCommunityContributions, createContribution, getTopContributors, likeContribution } from '../services/api';

const categories = [
    { value: 'reemploi', label: 'Réemploi ♻️', color: '#22c55e' },
    { value: 'libre', label: 'Logiciels Libres 💜', color: '#8b5cf6' },
    { value: 'sobriete', label: 'Sobriété ⚡', color: '#eab308' },
    { value: 'autonomie', label: 'Autonomie 🔷', color: '#3b82f6' },
    { value: 'inclusion', label: 'Inclusion 🌸', color: '#f472b6' },
    { value: 'durabilite', label: 'Durabilité 🌱', color: '#10b981' }
];

const Community = () => {
    const [contributions, setContributions] = useState([]);
    const [topContributors, setTopContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Formulaire
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('libre');
    const [submitting, setSubmitting] = useState(false);

    // Filtre
    const [filterCategory, setFilterCategory] = useState('');

    // Charger les contributions
    useEffect(() => {
        loadContributions();
        loadTopContributors();
    }, [filterCategory]);

    const loadContributions = async () => {
        try {
            setLoading(true);
            const data = await getCommunityContributions(filterCategory);
            setContributions(data);
            setError(null);
        } catch (err) {
            setError('Impossible de charger les contributions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadTopContributors = async () => {
        try {
            const data = await getTopContributors();
            setTopContributors(data);
        } catch (err) {
            console.error('Erreur chargement top contributeurs:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !message.trim()) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        try {
            setSubmitting(true);
            await createContribution({ username, message, category });

            // Réinitialiser le formulaire
            setMessage('');

            // Recharger les contributions
            await loadContributions();
            await loadTopContributors();

            alert('🎉 Contribution ajoutée avec succès !');
        } catch (err) {
            alert('❌ Erreur lors de l\'ajout de la contribution');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async (id) => {
        try {
            await likeContribution(id);
            await loadContributions();
        } catch (err) {
            console.error('Erreur like:', err);
        }
    };

    const getCategoryColor = (cat) => {
        return categories.find(c => c.value === cat)?.color || '#6366f1';
    };

    const getCategoryLabel = (cat) => {
        return categories.find(c => c.value === cat)?.label || cat;
    };

    return (
        <>
            <VillageHeader />
            <div className="community-page">
                <div className="container">
                    <header className="community-header">
                        <h1 className="page-title">🌍 Le Mur des Résistants</h1>
                        <p className="page-subtitle">
                            Partagez vos idées, astuces et victoires pour un numérique plus responsable !
                        </p>
                    </header>

                    {/* Formulaire de contribution */}
                    <section className="contribution-form-section">
                        <h2>✍️ Partager une contribution</h2>
                        <form onSubmit={handleSubmit} className="contribution-form">
                            <div className="form-group">
                                <label htmlFor="username">Pseudo :</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Ton pseudo de résistant..."
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Catégorie :</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message :</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Partage ton expérience, une astuce, une victoire..."
                                    maxLength={500}
                                    rows={4}
                                    required
                                />
                                <span className="char-count">{message.length}/500</span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                            >
                                {submitting ? '📤 Envoi...' : '🚀 Publier ma contribution'}
                            </button>
                        </form>
                    </section>

                    {/* Filtre */}
                    <section className="filter-section">
                        <label>Filtrer par catégorie :</label>
                        <div className="category-filters">
                            <button
                                className={`filter-btn ${filterCategory === '' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('')}
                            >
                                Toutes 🌟
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    className={`filter-btn ${filterCategory === cat.value ? 'active' : ''}`}
                                    style={{ borderColor: filterCategory === cat.value ? cat.color : 'transparent' }}
                                    onClick={() => setFilterCategory(cat.value)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="community-content">
                        {/* Liste des contributions */}
                        <section className="contributions-section">
                            <h2>💬 Contributions ({contributions.length})</h2>

                            {loading && <p className="loading-text">Chargement des contributions...</p>}
                            {error && <p className="error-text">{error}</p>}

                            <div className="contributions-grid">
                                {contributions.map(contrib => (
                                    <div
                                        key={contrib._id}
                                        className="contribution-card"
                                        style={{ borderLeftColor: getCategoryColor(contrib.category) }}
                                    >
                                        <div className="contribution-header">
                                            <div>
                                                <strong className="contribution-username">{contrib.username}</strong>
                                                <span
                                                    className="contribution-category"
                                                    style={{ backgroundColor: getCategoryColor(contrib.category) }}
                                                >
                                                    {getCategoryLabel(contrib.category)}
                                                </span>
                                            </div>
                                            <span className="contribution-date">
                                                {new Date(contrib.date).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>

                                        <p className="contribution-message">{contrib.message}</p>

                                        <div className="contribution-footer">
                                            <button
                                                className="like-btn"
                                                onClick={() => handleLike(contrib._id)}
                                            >
                                                ❤️ {contrib.likes || 0}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {!loading && contributions.length === 0 && (
                                    <p className="empty-message">
                                        Aucune contribution pour le moment. Sois le premier à partager ! 🎉
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Top contributeurs */}
                        <aside className="top-contributors-section">
                            <h2>🏆 Top Résistants</h2>
                            <div className="top-contributors-list">
                                {topContributors.slice(0, 5).map((contributor, index) => (
                                    <div key={contributor._id} className="top-contributor">
                                        <span className="rank">#{index + 1}</span>
                                        <span className="contributor-name">{contributor._id}</span>
                                        <span className="contributor-count">
                                            {contributor.totalContributions} 📝
                                        </span>
                                    </div>
                                ))}

                                {topContributors.length === 0 && (
                                    <p className="empty-message">Pas encore de classement</p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}; export default Community;
