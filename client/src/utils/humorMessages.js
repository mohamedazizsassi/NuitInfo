/**
 * 😄 Messages Humoristiques
 * Ambiance "village résistant" avec humour et références
 */

/**
 * Avatars humoristiques selon le rôle
 */
export const roleAvatars = {
    eleve: {
        title: 'Apprenti Résistant',
        emoji: '🎒',
        description: 'Tu découvres les secrets du numérique libre !',
        battleCry: 'Par Linuxix ! Je vais apprendre à résister !'
    },
    enseignant: {
        title: 'Maître Gaulois du Savoir',
        emoji: '👨‍🏫',
        description: 'Tu guides le village vers la sagesse numérique',
        battleCry: 'Mes élèves apprendront la voie du Libre !'
    },
    technicien: {
        title: 'Druide Linuxix',
        emoji: '🔧',
        description: 'Gardien des serveurs et maître des terminaux',
        battleCry: 'sudo rm -rf /empire/bigtechus 🐧'
    }
};

/**
 * Messages de feedback positifs
 */
export const positiveMessages = [
    '🎉 Excellent choix ! BigTechus Maximus tremble de peur !',
    '💪 Ton village numérique gagne en autonomie !',
    '🛡️ Bien joué ! Tu renforces la résistance !',
    '✨ Les machines reprennent vie ! Linuxix est fier de toi 🐧',
    '🌟 Bravo ! Le logiciel libre triomphe !',
    '🔥 BigTechus recule ! Continue comme ça !',
    '💜 Tu es un vrai résistant numérique !',
    '🎯 Parfait ! La sobriété numérique progresse !',
    '🌱 Ton village devient plus durable !',
    '🏆 Champion ! Tu maîtrises l\'art du numérique responsable !',
    '⚡ Économies d\'énergie : +100 ! La planète te remercie !',
    '🐧 Tux le manchot te fait un high-five !',
    '🎊 BigTechus Corp. perd un client ! Victoire !',
    '🌸 L\'inclusion progresse, tout le monde peut participer !',
    '🔓 Tu libères ton école de l\'emprise propriétaire !'
];

/**
 * Messages de feedback négatifs
 */
export const negativeMessages = [
    '😱 Aïe ! BigTechus Maximus rit de ton choix...',
    '⚠️ Attention ! Tu renforces la dépendance au cloud propriétaire !',
    '💸 Ton budget fond comme neige au soleil...',
    '🔒 Tu t\'enfermes dans un écosystème fermé !',
    '📉 Ton autonomie diminue dangereusement...',
    '🗑️ Plus de déchets électroniques à l\'horizon...',
    '⛓️ Les chaînes de la dépendance se resserrent...',
    '🌪️ BigTechus gagne du terrain ! Résiste !',
    '😔 Le Druide Linuxix est déçu... mais il croit en toi !',
    '⚡ Surconsommation énergétique détectée !',
    '💰 Ton école paiera cher cette erreur...',
    '🚨 Alerte ! Données hébergées hors UE !',
    '🔐 Vendor lock-in activé ! Difficile de revenir en arrière...',
    '🌍 Impact écologique : pas terrible...',
    '😢 L\'inclusion en prend un coup...'
];

/**
 * Messages de feedback neutres
 */
export const neutralMessages = [
    '🤔 Choix intéressant... mais on peut faire mieux !',
    '⚖️ Compromis acceptable, mais reste vigilant !',
    '💭 Moyen terme : solution temporaire, réfléchis au long terme',
    '🎯 Pas mal, mais tu peux viser plus haut !',
    '🌓 Équilibre fragile... surveille les effets !',
    '📊 Résultat mitigé, analyse les conséquences',
    '🔄 Solution de transition... pense au futur !',
    '⏳ Temporairement acceptable, mais prépare la suite'
];

/**
 * Messages de bienvenue selon le rôle
 */
export const welcomeMessages = {
    eleve: [
        'Bienvenue, jeune apprenti ! Prêt à découvrir les secrets du numérique libre ?',
        'Salut petit résistant ! On va t\'apprendre à dire NON à BigTechus !',
        'Hé, futur geek responsable ! Ton aventure commence maintenant ! 🚀'
    ],
    enseignant: [
        'Bienvenue, Maître du Savoir ! Ton école compte sur toi !',
        'Salutations, guide éclairé ! Montre la voie du numérique responsable !',
        'Bonjour, gardien de la connaissance ! Prépare-toi à éduquer ! 📚'
    ],
    technicien: [
        'Bienvenue, Druide Linuxix ! Les serveurs t\'attendent !',
        'Salut, maître des terminaux ! $ sudo apt install courage',
        'Hey, sorcier du réseau ! Tes compétences vont sauver le village ! 🔧'
    ]
};

/**
 * Messages de fin selon le badge
 */
export const badgeMessages = {
    'Druide Libre': [
        '🧙‍♂️ Tu es devenu un MAÎTRE ABSOLU ! BigTechus Maximus s\'enfuit devant toi !',
        '🏆 Légende vivante ! Tu as libéré ton école de l\'empire numérique !',
        '✨ Perfection ! Le village tout entier te célèbre comme un héros !'
    ],
    'Gaulois du Numérique': [
        '⚔️ Guerrier valeureux ! Tu as bien résisté à BigTechus !',
        '💪 Combattant acharné ! Ton village est fier de toi !',
        '🛡️ Tu es un pilier de la résistance numérique !'
    ],
    'Résistant Junior': [
        '🌱 Bon début, jeune résistant ! La voie du Libre s\'ouvre à toi !',
        '🎒 Tu apprends vite ! Continue et tu deviendras un vrai Gaulois !',
        '📚 Tes premiers pas sont prometteurs ! Persévère !'
    ],
    'Apprenti Connecté': [
        '🐣 Tout commence quelque part ! Tu découvres le monde NIRD !',
        '🌟 Ne te décourage pas ! Chaque résistant a débuté comme toi !',
        '💡 Tu as appris des choses importantes aujourd\'hui !'
    ]
};

/**
 * Citations inspirantes NIRD
 */
export const inspiringQuotes = [
    '"Le logiciel libre, c\'est la liberté de partager et modifier." - Richard Stallman',
    '"Ton ordinateur t\'appartient, pas à BigTechus !"',
    '"Un vieux PC + Linux = Machine qui renaît ♻️"',
    '"Données dans le cloud = Données chez quelqu\'un d\'autre"',
    '"Open Source = Contrôle, Sécurité, Autonomie"',
    '"Réparer plutôt que remplacer = Victoire sur l\'obsolescence"',
    '"Chaque ligne de code libre est un acte de résistance"',
    '"L\'école du futur est libre, inclusive et durable"'
];

/**
 * Retourne un message aléatoire d'un tableau
 */
export const getRandomMessage = (messagesArray) => {
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
};

/**
 * Génère un message de feedback selon le score global
 */
export const getFeedbackByScore = (totalChange) => {
    if (totalChange > 20) {
        return getRandomMessage(positiveMessages);
    } else if (totalChange < -20) {
        return getRandomMessage(negativeMessages);
    } else {
        return getRandomMessage(neutralMessages);
    }
};

/**
 * Émojis de réactions
 */
export const reactionEmojis = {
    excellent: ['🎉', '🏆', '✨', '💪', '🔥', '🌟'],
    good: ['👍', '😊', '💚', '✅', '🎯'],
    neutral: ['🤔', '⚖️', '💭', '📊'],
    bad: ['😬', '⚠️', '😔', '💸', '🚨'],
    terrible: ['😱', '😵', '💀', '❌', '🆘']
};

/**
 * Messages d'encouragement pendant le jeu
 */
export const encouragementMessages = [
    '💡 Pense à long terme : et dans 5 ans ?',
    '🌍 Chaque choix impacte la planète',
    '🔓 Le Libre, c\'est la souveraineté numérique',
    '💰 Économiser = investir dans la pédagogie',
    '♻️ Réutiliser > Jeter > Racheter',
    '🧠 Réfléchis : qui contrôle tes données ?',
    '🤝 Mutualiser les ressources = Force collective',
    '🌸 Pense à l\'accessibilité pour tous'
];

export default {
    roleAvatars,
    positiveMessages,
    negativeMessages,
    neutralMessages,
    welcomeMessages,
    badgeMessages,
    inspiringQuotes,
    getRandomMessage,
    getFeedbackByScore,
    reactionEmojis,
    encouragementMessages
};
