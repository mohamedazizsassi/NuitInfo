/**
 * Script de seed pour initialiser la base de données
 * Utilisable via: npm run seed
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Episode = require('./models/Episode');
const Score = require('./models/Score');
const newEpisodes = require('./newEpisodes');

// Données de seed - Épisodes originaux mis à jour avec indicateur inclusion
const seedEpisodes = [
    {
        title: "Le Cloud BigTechus",
        scene: "Le collège paye 40€/mois pour stocker les devoirs des élèves sur BigTechus Cloud. Le proviseur te demande ton avis lors d'une réunion... 🤔",
        order: 1,
        role: 'all',
        choices: [
            {
                id: "A",
                text: "💡 Basculer sur un service libre académique (Nextcloud Éducation)",
                effects: { autonomy: 20, cost: -15, durability: 10, sobriety: 5, libre: 20, inclusion: 15 },
                feedback: "Excellent ! Tu renforces la souveraineté numérique de l'établissement. Les données restent en France ! 🇫🇷"
            },
            {
                id: "B",
                text: "🤷 Continuer avec BigTechus Cloud, c'est pratique...",
                effects: { autonomy: -10, cost: 10, durability: -5, sobriety: -3, libre: -10, inclusion: -5 },
                feedback: "Oups... la dépendance aux GAFAM augmente. Et si BigTechus augmente ses prix ? 📈"
            },
            {
                id: "C",
                text: "🔧 Installer un NAS local dans la salle serveur",
                effects: { autonomy: 30, cost: -10, durability: 5, sobriety: 5, libre: 15, inclusion: 10 },
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
                effects: { autonomy: -20, cost: 5, durability: -10, sobriety: -5, libre: -25, inclusion: -15 },
                feedback: "Gratuit aujourd'hui, mais dans 2 ans quand le support s'arrête ? 🪦 Direction la poubelle..."
            },
            {
                id: "B",
                text: "🐧 Demander des tablettes libres avec LineageOS",
                effects: { autonomy: 25, cost: -5, durability: 15, sobriety: 10, libre: 30, inclusion: 20 },
                feedback: "Champion du libre ! Ces tablettes pourront être mises à jour pendant des années ! 🎉"
            },
            {
                id: "C",
                text: "💻 Proposer des Raspberry Pi à la place",
                effects: { autonomy: 35, cost: -20, durability: 20, sobriety: 15, libre: 35, inclusion: 25 },
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
                effects: { autonomy: -5, cost: 15, durability: -30, sobriety: -20, libre: -5, inclusion: -10 },
                feedback: "L'obsolescence programmée te remercie ! Une imprimante de plus au recyclage... 😢"
            },
            {
                id: "B",
                text: "🔄 Chercher des cartouches compatibles/rechargeables",
                effects: { autonomy: 15, cost: -25, durability: 20, sobriety: 15, libre: 10, inclusion: 10 },
                feedback: "Malin ! Les cartouches compatibles fonctionnent très bien et coûtent 3x moins cher ! 💰"
            },
            {
                id: "C",
                text: "♻️ Contacter une association de réemploi informatique",
                effects: { autonomy: 20, cost: -30, durability: 35, sobriety: 25, libre: 15, inclusion: 30 },
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
                effects: { autonomy: -15, cost: 20, durability: 0, sobriety: -10, libre: -20, inclusion: -5 },
                feedback: "Ça marche... mais les données des élèves partent aux USA. RGPD dit bonjour ! 🇺🇸"
            },
            {
                id: "B",
                text: "🎓 Proposer BigBlueButton (solution académique)",
                effects: { autonomy: 25, cost: -15, durability: 10, sobriety: 10, libre: 30, inclusion: 20 },
                feedback: "Parfait ! BBB est gratuit, hébergé en France et respecte le RGPD ! 🛡️"
            },
            {
                id: "C",
                text: "📞 Jitsi Meet, c'est libre et sans inscription",
                effects: { autonomy: 30, cost: -20, durability: 15, sobriety: 15, libre: 35, inclusion: 25 },
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
                effects: { autonomy: 5, cost: 30, durability: 10, sobriety: -5, libre: -5, inclusion: 5 },
                feedback: "Cher mais efficace... Cependant, as-tu pensé à optimiser l'existant d'abord ? 🤔"
            },
            {
                id: "B",
                text: "🔧 Recycler des routeurs avec OpenWrt",
                effects: { autonomy: 30, cost: -25, durability: 20, sobriety: 15, libre: 35, inclusion: 15 },
                feedback: "Génial ! OpenWrt transforme de vieux routeurs en équipements professionnels ! 🔄"
            },
            {
                id: "C",
                text: "📋 Mettre en place une charte d'usage et des quotas",
                effects: { autonomy: 15, cost: -10, durability: 15, sobriety: 30, libre: 10, inclusion: 20 },
                feedback: "Sobre et intelligent ! Parfois la solution n'est pas technique mais humaine ! 🧠"
            }
        ]
    },
    // Ajouter les 5 nouveaux épisodes
    ...newEpisodes
];

// Fonction principale de seed
async function seedDatabase() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connecté à MongoDB');

        // Suppression des anciennes données
        await Episode.deleteMany({});
        await Score.deleteMany({});
        console.log('🗑️ Anciennes données supprimées');

        // Insertion des épisodes
        const episodes = await Episode.insertMany(seedEpisodes);
        console.log(`📝 ${episodes.length} épisodes créés`);

        // Quelques scores de démonstration
        const demoScores = [
            { playerName: 'GauloisLibre42', role: 'eleve', autonomy: 120, cost: 30, durability: 100, sobriety: 90, libre: 130, episodesCompleted: 5 },
            { playerName: 'ProfDuFutur', role: 'enseignant', autonomy: 90, cost: 50, durability: 80, sobriety: 70, libre: 100, episodesCompleted: 5 },
            { playerName: 'TechRebel', role: 'technicien', autonomy: 150, cost: 20, durability: 120, sobriety: 110, libre: 140, episodesCompleted: 5 }
        ];

        for (const scoreData of demoScores) {
            const score = new Score(scoreData);
            await score.save();
        }
        console.log(`🏆 ${demoScores.length} scores de démonstration créés`);

        console.log('\n🎮 Base de données initialisée avec succès !');
        console.log('   Prêt à jouer au Parcours du Résistant Numérique !\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
}

// Exécution
seedDatabase();
