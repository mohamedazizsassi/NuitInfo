/**
 * 🌟 NOUVEAUX ÉPISODES NIRD - Inspirés du PDF officiel Nuit de l'Info 2025
 * Ces 5 épisodes correspondent exactement aux enjeux du défi NIRD
 */

const newEpisodes = [
    {
        title: "🪟 Fin de support Windows 10 : panique dans le village !",
        scene: "Octobre 2025 : Windows 10 n'est plus supporté ! Le parc informatique de ton collège (80 PC) refuse les mises à jour Windows 11. Le conseil d'administration se réunit en urgence. L'entreprise BigTechus propose de tout remplacer pour 60 000€. Que faire ? ⚠️",
        order: 6,
        role: 'all',
        choices: [
            {
                id: "A",
                text: "💸 Acheter 80 nouveaux PC compatibles Windows 11",
                effects: {
                    autonomy: -20,
                    cost: 40,
                    durability: -35,
                    sobriety: -30,
                    libre: -15,
                    inclusion: -10
                },
                feedback: "😱 Aïe ! 60 000€ partis en fumée ! Et dans 5 ans, rebelote ? BigTechus Maximus se frotte les mains ! L'obsolescence programmée a encore frappé..."
            },
            {
                id: "B",
                text: "🐧 Installer Linux (Ubuntu, Debian, Primtux) sur les machines existantes",
                effects: {
                    autonomy: 35,
                    cost: -35,
                    durability: 40,
                    sobriety: 30,
                    libre: 40,
                    inclusion: 20
                },
                feedback: "🏆 EXCELLENT ! Tu viens de sauver 60 000€ ET de prolonger la vie des machines de 5 à 10 ans ! Le Druide Linuxix te fait un standing ovation 🐧✨ Économie circulaire : ACTIVÉE !"
            },
            {
                id: "C",
                text: "♻️ Faire appel à une association de reconditionnement (Emmaus Connect, etc.)",
                effects: {
                    autonomy: 30,
                    cost: -25,
                    durability: 35,
                    sobriety: 25,
                    libre: 30,
                    inclusion: 30
                },
                feedback: "💪 Bravo ! Tu combines réemploi, inclusion sociale ET transition numérique ! Triple victoire pour le village ! Les associations de réemploi créent de l'emploi local et luttent contre la fracture numérique ! 🌍"
            }
        ]
    },

    {
        title: "☁️ Stockage hors UE : BigTechus te surveille...",
        scene: "Surprise ! Les données de tes élèves (notes, absences, santé) sont stockées sur les serveurs BigTechus... situés aux États-Unis ! Un parent d'élève juriste te rappelle que c'est contraire au RGPD. Le rectorat demande une solution urgente. 🚨",
        order: 7,
        role: 'all',
        choices: [
            {
                id: "A",
                text: "🤷 Continuer avec BigTechus, ils promettent de 'respecter les données'",
                effects: {
                    autonomy: -30,
                    cost: 20,
                    durability: -10,
                    sobriety: -15,
                    libre: -25,
                    inclusion: -5
                },
                feedback: "⚠️ Danger ! Le CLOUD Act américain autorise l'accès aux données sans te prévenir ! BigTechus peut tout lire : notes, noms, adresses... RGPD : VIOLATION ! 🔓"
            },
            {
                id: "B",
                text: "🎓 Migrer vers une solution académique hébergée en France (apps.education.fr)",
                effects: {
                    autonomy: 30,
                    cost: -20,
                    durability: 15,
                    sobriety: 10,
                    libre: 25,
                    inclusion: 15
                },
                feedback: "✅ Parfait ! Les données restent en UE, conformes RGPD ! Nextcloud académique, BBB, Peertube... tout est gratuit et souverain ! 🇫🇷🛡️"
            },
            {
                id: "C",
                text: "🏠 Auto-héberger les services dans la salle serveur du collège",
                effects: {
                    autonomy: 40,
                    cost: -30,
                    durability: 20,
                    sobriety: 15,
                    libre: 35,
                    inclusion: 10
                },
                feedback: "🔥 CHAMPION ! Autonomie maximale ! Tes données ne quittent JAMAIS l'établissement ! YunoHost ou Cozy Cloud rendent l'auto-hébergement accessible. Tu es un vrai Druide du réseau ! 💻✨"
            }
        ]
    },

    {
        title: "🗑️ Obsolescence programmée : 80 PC en fin de vie ?",
        scene: "Un commercial BigTechus visite ton établissement : 'Vos machines ont 7 ans, elles sont OBSOLÈTES ! Je vous propose un renouvellement complet.' Mais les PC tournent encore très bien... juste un peu lents sur Windows. Que décider ? 🤔",
        order: 8,
        role: 'technicien',
        choices: [
            {
                id: "A",
                text: "💳 Accepter l'offre BigTechus : tout remplacer",
                effects: {
                    autonomy: -25,
                    cost: 35,
                    durability: -40,
                    sobriety: -35,
                    libre: -20,
                    inclusion: -15
                },
                feedback: "😢 Tu viens de jeter 80 machines fonctionnelles ! 2 tonnes de déchets électroniques direction l'Afrique... BigTechus Maximus te remercie pour ton argent ! L'obsolescence programmée : 1 - Toi : 0"
            },
            {
                id: "B",
                text: "🔧 Upgrader : ajouter RAM + SSD + installer Linux léger (Xubuntu, LXDE)",
                effects: {
                    autonomy: 35,
                    cost: -30,
                    durability: 40,
                    sobriety: 35,
                    libre: 40,
                    inclusion: 25
                },
                feedback: "🎉 GÉNIE ! 50€/machine (SSD 120Go + 4Go RAM) = 4000€ au lieu de 60 000€ ! Les PC repartent comme neufs pour 5 ans minimum ! Linux redonne vie aux vieilles machines ! 🐧♻️"
            },
            {
                id: "C",
                text: "🛠️ Créer un atelier de réparation/réemploi avec les élèves",
                effects: {
                    autonomy: 40,
                    cost: -35,
                    durability: 45,
                    sobriety: 40,
                    libre: 35,
                    inclusion: 40
                },
                feedback: "🏆 LÉGENDE ! Tu combines pédagogie, économie ET écologie ! Les élèves apprennent à réparer, comprennent l'obsolescence programmée, et créent de la valeur ! Le village te nomme DRUIDE SUPRÊME ! 🧙‍♂️✨"
            }
        ]
    },

    {
        title: "🔨 Réemploi : l'atelier du forgeron numérique ouvre ses portes",
        scene: "Une entreprise locale ferme et donne 50 PC à ton collège. Problème : ils sont sous Windows 7 non supporté et 'trop vieux'. Le principal hésite à refuser ce 'cadeau empoisonné'. Mais toi, tu vois une opportunité... 💡",
        order: 9,
        role: 'all',
        choices: [
            {
                id: "A",
                text: "❌ Refuser le don, 'c'est trop vieux, ça ne servira à rien'",
                effects: {
                    autonomy: -10,
                    cost: 10,
                    durability: -30,
                    sobriety: -20,
                    libre: -15,
                    inclusion: -25
                },
                feedback: "😔 Dommage... Ces machines auraient pu servir ! Direction le recyclage alors qu'elles fonctionnent encore. Occasion manquée pour l'inclusion numérique..."
            },
            {
                id: "B",
                text: "🎓 Créer un club informatique 'Makers' pour les remettre en état",
                effects: {
                    autonomy: 35,
                    cost: -20,
                    durability: 40,
                    sobriety: 30,
                    libre: 40,
                    inclusion: 45
                },
                feedback: "🌟 GÉNIAL ! Les élèves apprennent Linux, Python, réparation hardware ! Certains PC vont équiper des familles en précarité numérique ! Tu crées une communauté de makers-résistants ! 🛠️💚"
            },
            {
                id: "C",
                text: "🤝 Contacter Emmaüs Connect / Ateliers Sans Frontières pour une formation-reconditionnement",
                effects: {
                    autonomy: 30,
                    cost: -25,
                    durability: 45,
                    sobriety: 35,
                    libre: 35,
                    inclusion: 50
                },
                feedback: "🏅 TRIPLE IMPACT ! Tu combines formation professionnelle, insertion sociale ET lutte contre le gaspillage ! 50 machines → 50 familles équipées ! Le village devient un MODÈLE d'économie circulaire ! 🌍✨"
            }
        ]
    },

    {
        title: "🏛️ La Forge des communs numériques : mutualiser ou s'isoler ?",
        scene: "Tu découvres la 'Forge des communs numériques' : une plateforme de mutualisation d'outils libres entre établissements (code, ressources, formations). Mais ton chef d'établissement préfère 'développer nos propres outils'. Que lui répondre ? 🤝",
        order: 10,
        role: 'enseignant',
        choices: [
            {
                id: "A",
                text: "🏢 Développer en interne, 'on sera propriétaire et autonome'",
                effects: {
                    autonomy: 10,
                    cost: 30,
                    durability: -15,
                    sobriety: -10,
                    libre: -20,
                    inclusion: -15
                },
                feedback: "⚠️ Piège ! Développer seul coûte cher, prend du temps, et crée un outil non maintenu dès que le dev part ! Réinventer la roue n'est pas de l'autonomie, c'est de l'isolement... 🔄"
            },
            {
                id: "B",
                text: "🛒 Acheter une solution propriétaire BigTechus Education",
                effects: {
                    autonomy: -30,
                    cost: 40,
                    durability: -20,
                    sobriety: -15,
                    libre: -35,
                    inclusion: -10
                },
                feedback: "😱 NON ! Vendor lock-in maximal ! Dans 3 ans, ils augmentent les prix de 300% et tu ne peux plus partir... BigTechus Maximus jubile ! 🔗💸"
            },
            {
                id: "C",
                text: "🤝 Rejoindre la Forge des communs : mutualiser et contribuer",
                effects: {
                    autonomy: 40,
                    cost: -35,
                    durability: 40,
                    sobriety: 30,
                    libre: 45,
                    inclusion: 40
                },
                feedback: "🏆 PARFAIT ! La vraie autonomie, c'est la COOPÉRATION ! Tu bénéficies du travail de centaines d'établissements ET tu contribues ! Logiciels libres maintenus, documentés, améliorés collectivement ! C'est ÇA l'esprit du village résistant ! 🛡️🌍✨"
            }
        ]
    }
];

module.exports = newEpisodes;
