const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode');
const { seedEpisodes } = require('../seed');

/**
 * @route   GET /api/episodes
 * @desc    Récupère tous les épisodes triés par ordre
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { role } = req.query;

        // Filtre par rôle si spécifié
        let filter = {};
        if (role && role !== 'all') {
            filter = { $or: [{ role: 'all' }, { role: role }] };
        }

        const episodes = await Episode.find(filter).sort({ order: 1 });
        res.json(episodes);
    } catch (error) {
        console.error('Erreur GET /episodes:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/episodes/:id
 * @desc    Récupère un épisode par son ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);

        if (!episode) {
            return res.status(404).json({ message: 'Épisode non trouvé' });
        }

        res.json(episode);
    } catch (error) {
        console.error('Erreur GET /episodes/:id:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   GET /api/episodes/:id/choice/:choiceId
 * @desc    Récupère les effets d'un choix spécifique
 * @access  Public
 */
router.get('/:id/choice/:choiceId', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);

        if (!episode) {
            return res.status(404).json({ message: 'Épisode non trouvé' });
        }

        const choice = episode.choices.find(c => c.id === req.params.choiceId);

        if (!choice) {
            return res.status(404).json({ message: 'Choix non trouvé' });
        }

        res.json({
            effects: choice.effects,
            feedback: choice.feedback
        });
    } catch (error) {
        console.error('Erreur GET /episodes/:id/choice/:choiceId:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

/**
 * @route   POST /api/episodes
 * @desc    Crée un nouvel épisode
 * @access  Public (à sécuriser en production)
 */
router.post('/', async (req, res) => {
    try {
        const episode = new Episode(req.body);
        await episode.save();
        res.status(201).json(episode);
    } catch (error) {
        console.error('Erreur POST /episodes:', error);
        res.status(400).json({ message: 'Erreur de création', error: error.message });
    }
});

/**
 * @route   POST /api/episodes/seed
 * @desc    Remplit la base avec tous les épisodes (10 épisodes complets)
 * @access  Public (à sécuriser en production)
 */
router.post('/seed', async (req, res) => {
    try {
        // Supprime les épisodes existants
        await Episode.deleteMany({});

        // Utilise les épisodes du fichier seed.js (10 épisodes au total)
        const episodes = await Episode.insertMany(seedEpisodes);

        res.json({
            message: `✅ ${episodes.length} épisodes créés avec succès ! 🎮`,
            count: episodes.length,
            episodes: episodes.map(ep => ({ id: ep._id, title: ep.title, order: ep.order }))
        });
    } catch (error) {
        console.error('Erreur POST /episodes/seed:', error);
        res.status(500).json({ message: 'Erreur de seed', error: error.message });
    }
});

module.exports = router;
scene: "Le collège paye 40€/mois pour stocker les devoirs des élèves sur BigTechus Cloud. Le proviseur te demande ton avis lors d'une réunion... 🤔",
    order: 1,
        role: 'all',
            choices: [
                {
                    id: "A",
                    text: "💡 Basculer sur un service libre académique (Nextcloud Éducation)",
                    effects: { autonomy: 20, cost: -15, durability: 10, sobriety: 5, libre: 20 },
                    feedback: "Excellent ! Tu renforces la souveraineté numérique de l'établissement. Les données restent en France ! 🇫🇷"
                },
                {
                    id: "B",
                    text: "🤷 Continuer avec BigTechus Cloud, c'est pratique...",
                    effects: { autonomy: -10, cost: 10, durability: -5, sobriety: -3, libre: -10 },
                    feedback: "Oups... la dépendance aux GAFAM augmente. Et si BigTechus augmente ses prix ? 📈"
                },
                {
                    id: "C",
                    text: "🔧 Installer un NAS local dans la salle serveur",
                    effects: { autonomy: 30, cost: -10, durability: 5, sobriety: 5, libre: 15 },
                    feedback: "Super ! Tu rends l'établissement beaucoup plus autonome. Bravo pour cette initiative ! 💪"
                }
            ]
            },
{
    title: "Les tablettes magiques",
        scene: "L'académie propose de financer 30 tablettes fermées avec des applications verrouillées. L'alternative : des tablettes Android libres avec F-Droid...",
            order: 2,
                role: 'all',
                    choices: [
                        {
                            id: "A",
                            text: "📱 Accepter les tablettes verrouillées, c'est gratuit !",
                            effects: { autonomy: -20, cost: 5, durability: -10, sobriety: -5, libre: -25 },
                            feedback: "Gratuit aujourd'hui, mais dans 2 ans quand le support s'arrête ? 🪦 Direction la poubelle..."
                        },
                        {
                            id: "B",
                            text: "🐧 Demander des tablettes libres avec LineageOS",
                            effects: { autonomy: 25, cost: -5, durability: 15, sobriety: 10, libre: 30 },
                            feedback: "Champion du libre ! Ces tablettes pourront être mises à jour pendant des années ! 🎉"
                        },
                        {
                            id: "C",
                            text: "💻 Proposer des Raspberry Pi à la place",
                            effects: { autonomy: 35, cost: -20, durability: 20, sobriety: 15, libre: 35 },
                            feedback: "Génie ! Moins cher, réparable, éducatif et 100% libre. Tu es un vrai résistant ! 🦸"
                        }
                    ]
},
{
    title: "L'imprimante en fin de vie",
        scene: "L'imprimante de la salle des profs affiche 'cartouche vide'. Le technicien dit qu'une cartouche coûte 80€, une neuve imprimante 120€... 🖨️",
            order: 3,
                role: 'all',
                    choices: [
                        {
                            id: "A",
                            text: "🛒 Acheter une nouvelle imprimante, plus moderne !",
                            effects: { autonomy: -5, cost: 15, durability: -30, sobriety: -20, libre: -5 },
                            feedback: "L'obsolescence programmée te remercie ! Une imprimante de plus au recyclage... 😢"
                        },
                        {
                            id: "B",
                            text: "🔄 Chercher des cartouches compatibles/rechargeables",
                            effects: { autonomy: 15, cost: -25, durability: 20, sobriety: 15, libre: 10 },
                            feedback: "Malin ! Les cartouches compatibles fonctionnent très bien et coûtent 3x moins cher ! 💰"
                        },
                        {
                            id: "C",
                            text: "♻️ Contacter une association de réemploi informatique",
                            effects: { autonomy: 20, cost: -30, durability: 35, sobriety: 25, libre: 15 },
                            feedback: "Bravo ! Le réemploi, c'est écologique ET économique. Tu fais vivre l'économie circulaire ! 🌍"
                        }
                    ]
},
{
    title: "La visioconférence de crise",
        scene: "Confinement surprise ! Il faut organiser les cours à distance pour demain matin. Le chef d'établissement propose Zoom payant... 🎥",
            order: 4,
                role: 'enseignant',
                    choices: [
                        {
                            id: "A",
                            text: "📹 Zoom Pro, au moins ça marche !",
                            effects: { autonomy: -15, cost: 20, durability: 0, sobriety: -10, libre: -20 },
                            feedback: "Ça marche... mais les données des élèves partent aux USA. RGPD dit bonjour ! 🇺🇸"
                        },
                        {
                            id: "B",
                            text: "🎓 Proposer BigBlueButton (solution académique)",
                            effects: { autonomy: 25, cost: -15, durability: 10, sobriety: 10, libre: 30 },
                            feedback: "Parfait ! BBB est gratuit, hébergé en France et respecte le RGPD ! 🛡️"
                        },
                        {
                            id: "C",
                            text: "📞 Jitsi Meet, c'est libre et sans inscription",
                            effects: { autonomy: 30, cost: -20, durability: 15, sobriety: 15, libre: 35 },
                            feedback: "Excellent choix ! Jitsi est léger, libre et fonctionne même sur vieux PC ! 🏆"
                        }
                    ]
},
{
    title: "Le réseau Wi-Fi saturé",
        scene: "50 élèves se connectent en même temps et le réseau plante. Le technicien propose d'acheter des bornes Wi-Fi 6 à 500€ pièce... 📶",
            order: 5,
                role: 'technicien',
                    choices: [
                        {
                            id: "A",
                            text: "💸 Investir dans du matériel Wi-Fi 6 professionnel",
                            effects: { autonomy: 5, cost: 30, durability: 10, sobriety: -5, libre: -5 },
                            feedback: "Cher mais efficace... Cependant, as-tu pensé à optimiser l'existant d'abord ? 🤔"
                        },
                        {
                            id: "B",
                            text: "🔧 Recycler des routeurs avec OpenWrt",
                            effects: { autonomy: 30, cost: -25, durability: 20, sobriety: 15, libre: 35 },
                            feedback: "Génial ! OpenWrt transforme de vieux routeurs en équipements professionnels ! 🔄"
                        },
                        {
                            id: "C",
                            text: "📋 Mettre en place une charte d'usage et des quotas",
                            effects: { autonomy: 15, cost: -10, durability: 15, sobriety: 30, libre: 10 },
                            feedback: "Sobre et intelligent ! Parfois la solution n'est pas technique mais humaine ! 🧠"
                        }
                    ]
}
        ];

const episodes = await Episode.insertMany(seedEpisodes);
res.json({
    message: `${episodes.length} épisodes créés avec succès ! 🎮`,
    episodes
});
    } catch (error) {
    console.error('Erreur POST /episodes/seed:', error);
    res.status(500).json({ message: 'Erreur de seed', error: error.message });
}
});

module.exports = router;
