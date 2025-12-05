# 🛡️ Le Parcours du Résistant Numérique - Documentation Projet v2.0

## 📋 Contexte du Sujet

### Défi : Nuit de l'Info 2025 - Démarche NIRD
**NIRD** = **Numérique Inclusif, Responsable et Durable**

**Problématique :** 
À l'heure où la fin du support de Windows 10 met en évidence la dépendance structurelle des établissements scolaires aux Big Tech (matériel obsolète, licences coûteuses, données hors UE, écosystèmes fermés), l'École doit devenir un "village résistant" comme Astérix face à l'empire romain numérique.

**Mission :** Créer une application Web ludique et pédagogique qui aide élèves, enseignants, familles et collectivités à comprendre comment un établissement peut réduire ses dépendances numériques et adopter progressivement la démarche NIRD.

**Objectifs NIRD :**
- Sensibiliser à la sobriété numérique
- Encourager le réemploi et reconditionnement
- Promouvoir l'usage de Linux et logiciels libres
- Lutter contre l'obsolescence programmée
- Favoriser l'autonomie technologique des établissements
- Renforcer l'inclusion numérique pour tous

**3 Piliers :** Inclusion, Responsabilité, Durabilité

---

## 🎮 Solution Développée

### Concept
Un **jeu narratif interactif à choix multiples** où chaque décision impacte 5 indicateurs NIRD. Le joueur incarne un rôle (Élève, Enseignant ou Technicien) et traverse des scénarios concrets d'établissement scolaire pour apprendre à faire des choix numériques responsables.

### Architecture Technique

**Stack MERN complète :**
```
Frontend : React + Vite + React Router
Backend  : Node.js + Express
Database : MongoDB + Mongoose
Styles   : CSS custom (thème BD coloré)
```

**Structure des dossiers :**
```
Principale/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── ChoiceButton.jsx      # Bouton de choix
│   │   │   ├── EpisodeCard.jsx       # Carte d'épisode
│   │   │   ├── FeedbackBox.jsx       # Feedback post-choix
│   │   │   ├── RoleSelector.jsx      # Sélecteur de rôle
│   │   │   ├── ScoreBoard.jsx        # Tableau des scores
│   │   │   └── VillageHeader.jsx     # 🆕 Navigation & ambiance village
│   │   ├── context/
│   │   │   └── GameContext.jsx       # Context API global (6 indicateurs)
│   │   ├── hooks/
│   │   │   └── useGameState.js       # Hook personnalisé
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Page d'accueil
│   │   │   ├── Game.jsx              # Page de jeu
│   │   │   ├── EndScreen.jsx         # Écran de fin
│   │   │   └── Community.jsx         # 🆕 Mur des Résistants
│   │   ├── services/
│   │   │   └── api.js                # Service API (+ routes communauté)
│   │   ├── utils/
│   │   │   └── humorMessages.js      # 🆕 Messages humoristiques & avatars
│   │   └── styles/
│   │       ├── App.css               # Styles composants
│   │       └── index.css             # Styles globaux
│   ├── index.html
│   ├── vite.config.js         # Config Vite (proxy port 3001)
│   └── package.json
│
├── server/                    # Backend Express
│   ├── models/
│   │   ├── Episode.js         # Modèle MongoDB Episode (6 indicateurs)
│   │   ├── Score.js           # Modèle MongoDB Score (6 indicateurs)
│   │   └── Contribution.js    # 🆕 Modèle contributions communauté
│   ├── routes/
│   │   ├── episodeRoutes.js   # Routes API épisodes
│   │   ├── scoreRoutes.js     # Routes API scores
│   │   └── communityRoutes.js # 🆕 Routes API communauté
│   ├── config/
│   │   └── db.js              # Connexion MongoDB
│   ├── seed.js                # Script de seed DB (10 épisodes)
│   ├── newEpisodes.js         # 🆕 5 nouveaux épisodes NIRD
│   └── server.js              # Serveur principal
│
├── .env                       # Variables d'environnement
│   PORT=3001
│   MONGODB_URI=mongodb://localhost:27017/parcours-resistant-numerique
├── README.md                  # 🆕 Guide complet d'installation
├── info.md                    # Ce fichier (documentation complète)
└── package.json
```

---

## 🎯 Fonctionnalités Implémentées

### 1. **Système de Rôles**
3 rôles jouables représentant les acteurs NIRD :
- 🎒 **Élève** : Découvre le numérique responsable
- 👨‍🏫 **Enseignant** : Guide et utilise des outils pédagogiques
- 🔧 **Technicien Réseau** : Gère l'infrastructure

### 2. **Les 6 Indicateurs NIRD** 🆕
Chaque choix affecte ces métriques (valeur 0-100) :
- 🔷 **Autonomie** : Indépendance vis-à-vis des Big Tech
- 💰 **Coût** : Impact financier (licences, abonnements)
- 🌱 **Durabilité** : Réemploi, reconditionnement, obsolescence
- ⚡ **Sobriété** : Consommation énergétique et ressources
- 💜 **Libre** : Usage de logiciels libres et open source
- 🌸 **Inclusion** : Accessibilité, équité, fracture numérique 🆕

### 3. **Mécanique de Jeu**
**Format :** Visual Novel / Jeu narratif à choix
- Présentation d'une **scène** (situation concrète en établissement)
- **3 choix** possibles avec conséquences différentes
- **Feedback** dynamique expliquant l'impact du choix
- **Progression** linéaire à travers les épisodes
- **Sauvegarde** automatique (localStorage)

**Exemple d'épisode :**
```javascript
{
  title: "Le Cloud BigTechus",
  scene: "Le collège paye 40€/mois pour stocker les devoirs sur BigTechus Cloud...",
  choices: [
    {
      id: "A",
      text: "Basculer sur un service libre académique",
      effects: {
        autonomy: +20,
        cost: -15,
        durability: +10,
        sobriety: +5,
        libre: +20
      },
      feedback: "Excellent ! Tu renforces la souveraineté numérique."
    },
    // ... 2 autres choix
  ]
}
```

### 4. **Système de Badges**
Évaluation finale basée sur la moyenne des 6 indicateurs : 🆕
- 🧙‍♂️ **Druide Libre** (≥80%) : Maître du numérique responsable
- 💪 **Gaulois du Numérique** (≥60%) : Résistant actif
- 🌱 **Résistant Junior** (≥40%) : Premiers pas
- 🐣 **Apprenti Connecté** (<40%) : En découverte

### 5. **Interface & UX**
- **Design BD-like** : Style coloré, émojis, typographie ludique
- **Jauges visuelles** : Barres horizontales dégradées pour chaque indicateur
- **Animations** : Transitions fluides, effets hover
- **Responsive** : Adapté mobile/desktop
- **Feedback visuel** : Couleurs (vert=positif, rouge=négatif)

---

## 🆕 NOUVEAUTÉS VERSION 2.0

### 1. **6ème Indicateur : Inclusion** 🌸
- **Pourquoi ?** L'inclusion est le premier pilier NIRD ! Mesure l'accessibilité et l'équité numérique
- **Impact :** Intégré dans :
  - Tous les modèles (Episode, Score)
  - Le calcul du badge final (moyenne sur 6 au lieu de 5)
  - Le composant ScoreBoard (jauge rose)
  - Tous les choix des 10 épisodes
- **Couleur :** Rose (`#f472b6`) symbolisant l'ouverture et la diversité

### 2. **Dimension Communautaire** 🌍
#### Le Mur des Résistants
- Espace de partage entre joueurs
- Contributions classées par catégorie NIRD :
  - ♻️ Réemploi
  - 💜 Logiciels Libres
  - ⚡ Sobriété
  - 🔷 Autonomie
  - 🌸 Inclusion
  - 🌱 Durabilité

#### Fonctionnalités
- ✍️ Poster une contribution (pseudo + message + catégorie)
- ❤️ Liker les contributions
- 🏆 Classement des Top Résistants
- 📊 Statistiques communautaires
- 🔍 Filtrage par catégorie

#### Modèle de données
```javascript
Contribution {
  username: String,
  message: String (max 500 car),
  category: String,
  date: Date,
  likes: Number
}
```

### 3. **Ambiance "Village Résistant"** 🏰
#### Thème Astérix vs BigTechus
- **Bannière village** en haut de chaque page
- **Slogan** : "Contre l'Empire BigTechus, nous résistons !"
- **Navigation** immersive (Accueil 🏠 / Communauté 🌍)

#### Avatars Humoristiques par Rôle
```javascript
Élève       → 🎒 "Apprenti Résistant"
Enseignant  → 👨‍🏫 "Maître Gaulois du Savoir"
Technicien  → 🔧 "Druide Linuxix"
```

#### Système de Messages Humoristiques
Fichier `humorMessages.js` contenant :
- ✅ **Messages positifs** : "BigTechus Maximus tremble de peur !"
- ❌ **Messages négatifs** : "Les chaînes de la dépendance se resserrent..."
- 🤔 **Messages neutres** : "Compromis acceptable, mais reste vigilant !"
- 🎉 **Citations inspirantes** : "Ton ordinateur t'appartient, pas à BigTechus !"

### 4. **5 Nouveaux Épisodes Inspirés du PDF Officiel** 📚
Total : **10 épisodes** (5 originaux + 5 nouveaux)

#### Épisode 6 : 🪟 Fin de support Windows 10
- **Contexte** : 80 PC refusent Windows 11, BigTechus propose 60 000€ de matériel neuf
- **Choix** :
  - Acheter du neuf (☠️ obsolescence)
  - Installer Linux (🎉 économie + durabilité)
  - Reconditionnement associatif (💪 inclusion + emploi local)
- **Enjeux** : Obsolescence programmée, coût, réemploi

#### Épisode 7 : ☁️ Stockage hors UE (RGPD)
- **Contexte** : Données élèves aux USA, violation RGPD
- **Choix** :
  - Continuer BigTechus (⚠️ CLOUD Act, surveillance)
  - Solutions académiques françaises (✅ conformité RGPD)
  - Auto-hébergement local (🔥 autonomie maximale)
- **Enjeux** : Souveraineté numérique, protection données

#### Épisode 8 : 🗑️ Obsolescence programmée
- **Contexte** : Commercial pousse à remplacer 80 PC "obsolètes" de 7 ans
- **Choix** :
  - Tout remplacer (😢 2 tonnes de e-déchets)
  - Upgrade RAM+SSD+Linux (🎉 4000€ vs 60 000€)
  - Atelier réparation pédagogique (🏆 inclusion + formation)
- **Enjeux** : Lutte anti-gaspi, pédagogie, économie circulaire

#### Épisode 9 : 🔨 Atelier du forgeron numérique
- **Contexte** : Don de 50 PC Windows 7 "trop vieux"
- **Choix** :
  - Refuser (😔 occasion manquée)
  - Club Makers étudiant (🌟 apprentissage + solidarité)
  - Partenariat Emmaüs Connect (🏅 triple impact social)
- **Enjeux** : Réemploi, inclusion numérique, formation

#### Épisode 10 : 🏛️ Forge des communs numériques
- **Contexte** : Mutualiser ou développer seul ?
- **Choix** :
  - Développement interne (⚠️ coûteux, non maintenu)
  - Solution propriétaire (😱 vendor lock-in)
  - Rejoindre la Forge (🏆 coopération, pérennité)
- **Enjeux** : Coopération vs isolement, logiciels libres, mutualisation

---

## 🔌 API Backend (Mise à jour)

### Endpoints principaux :

**Épisodes :**
- `GET /api/episodes` - Liste tous les épisodes (10 épisodes)
- `GET /api/episodes/:id` - Un épisode spécifique
- `POST /api/episodes/seed` - Remplir la DB avec exemples

**Scores :**
- `GET /api/scores` - Tous les scores
- `POST /api/scores` - Sauvegarder un score (6 indicateurs)
- `GET /api/scores/leaderboard` - Classement

**Communauté :** 🆕
- `GET /api/community` - Liste des contributions
- `GET /api/community?category=libre` - Filtrer par catégorie
- `POST /api/community` - Créer une contribution
- `GET /api/community/top` - Top contributeurs
- `GET /api/community/stats` - Statistiques
- `PUT /api/community/:id/like` - Liker une contribution
- `DELETE /api/community/:id` - Supprimer (modération)

**Santé :**
- `GET /` - Info API (v2.0)
- `GET /health` - État du serveur

---

## 📊 Modèles de Données (Mis à jour v2.0)

### Episode (MongoDB)
```javascript
{
  title: String,           // Titre de l'épisode
  scene: String,           // Description de la situation
  order: Number,           // Ordre dans le parcours (1-10) 🆕
  role: String,            // 'all', 'eleve', 'enseignant', 'technicien'
  choices: [
    {
      id: String,          // 'A', 'B', 'C'
      text: String,        // Description du choix
      effects: {
        autonomy: Number,  // Impact (-100 à +100)
        cost: Number,
        durability: Number,
        sobriety: Number,
        libre: Number,
        inclusion: Number  // 🆕 6ème indicateur
      },
      feedback: String     // Message après choix (humoristique)
    }
  ]
}
```

### Score (MongoDB)
```javascript
{
  playerName: String,      // Nom du joueur (optionnel)
  role: String,            // Rôle joué
  autonomy: Number,        // Score final (0-100)
  cost: Number,
  durability: Number,
  sobriety: Number,
  libre: Number,
  inclusion: Number,       // 🆕 6ème score
  totalScore: Number,      // Somme des 6 indicateurs 🆕
  badge: String,           // Badge obtenu
  episodesCompleted: Number,
  createdAt: Date
}
```

### Contribution (MongoDB) 🆕
```javascript
{
  username: String,        // Pseudo du contributeur (max 50 car)
  message: String,         // Contenu (max 500 car)
  category: String,        // 'reemploi', 'libre', 'sobriete', 'autonomie', 'inclusion', 'durabilite'
  date: Date,              // Date de publication
  likes: Number,           // Nombre de likes
  createdAt: Date,         // Timestamp création
  updatedAt: Date          // Timestamp mise à jour
}
```

---

## 🎨 Identité Visuelle (Mise à jour v2.0)

**Palette de couleurs :**
- `--color-autonomy: #3b82f6` (Bleu)
- `--color-cost: #ef4444` (Rouge)
- `--color-durability: #22c55e` (Vert)
- `--color-sobriety: #eab308` (Jaune)
- `--color-libre: #8b5cf6` (Violet)
- `--color-inclusion: #f472b6` (Rose) 🆕

**Typographie :**
- Titres : "Bangers" (Google Fonts) - style BD
- Texte : "Comic Neue" - lisible et ludique

**Thème :** Résistance numérique avec références Astérix (village gaulois vs empire)

**Ambiance Village :** 🆕
- Bannière supérieure bleu foncé avec boucliers 🛡️
- Slogan : "Contre l'Empire BigTechus, nous résistons !"
- Navigation fixe (sticky) avec indicateur de page active

---

## 🚀 Installation & Démarrage

```bash
# 1. Installer dépendances
npm run install-all

# 2. Démarrer MongoDB
# Assurez-vous que MongoDB tourne sur localhost:27017

# 3. Seeder la base (première fois)
npm run seed

# 4. Démarrer backend (port 3001)
npm run dev

# 5. Démarrer frontend (port 3000)
cd client && npm run dev
```

**URLs :**
- Frontend : http://localhost:3000
- Backend : http://localhost:3001
- API : http://localhost:3001/api/episodes

---

## 🎓 Dimension Pédagogique (Étendue v2.0)

### Scénarios couverts (10 épisodes) :
**Originaux :**
1. **Cloud vs Auto-hébergement** : Dépendance aux GAFAM
2. **OS propriétaire vs Linux** : Obsolescence programmée
3. **Réparation vs Remplacement** : Économie circulaire
4. **Visioconférence** : Souveraineté des données
5. **Infrastructure réseau** : Optimisation vs suréquipement

**Nouveaux (inspirés PDF NIRD) :** 🆕
6. **Fin support Windows 10** : Réemploi vs achat massif
7. **Stockage hors UE** : RGPD et souveraineté numérique
8. **Obsolescence programmée** : Upgrade vs remplacement
9. **Atelier réemploi** : Inclusion et économie sociale
10. **Forge des communs** : Coopération vs isolement

### Messages clés transmis :
- ✅ Les logiciels libres réduisent la dépendance
- ✅ Linux prolonge la durée de vie du matériel
- ✅ L'auto-hébergement renforce la souveraineté
- ✅ La sobriété numérique est écologique ET économique
- ✅ Chaque petit geste compte
- ✅ L'inclusion numérique est un droit fondamental 🆕
- ✅ La coopération (Forge des communs) > isolement 🆕
- ✅ Le réemploi crée de l'emploi local 🆕

---

## 📈 État actuel et limitations (Mise à jour v2.0)

### ✅ Réalisé :
- Architecture MERN complète fonctionnelle
- Context API pour état global partagé
- Système de jeu à choix avec feedback humoristique 🆕
- **6 indicateurs NIRD opérationnels** 🆕
- 3 rôles jouables avec avatars humoristiques 🆕
- Système de badges (calcul sur 6 indicateurs) 🆕
- Sauvegarde localStorage
- Interface responsive et animée
- API REST complète
- **10 épisodes riches et variés** 🆕
- **Dimension communautaire (Mur des Résistants)** 🆕
- **Ambiance "village résistant" avec VillageHeader** 🆕
- **Messages humoristiques contextuels** 🆕
- **Système de contributions + likes + top contributeurs** 🆕

### ✅ AMÉLIORATIONS MAJEURES v2.0 :
1. ✅ **6ème indicateur Inclusion** intégré partout
2. ✅ **Système communautaire complet** (contributions, likes, classement)
3. ✅ **Ambiance village** (VillageHeader, messages humoristiques, avatars)
4. ✅ **5 nouveaux épisodes** alignés sur le PDF officiel NIRD
5. ✅ **Navigation enrichie** (routes communauté, sticky header)

### ⚠️ Pistes d'amélioration futures :
1. **Leaderboard public** : affichage visible sur l'accueil
2. **Ressources NIRD** : page dédiée avec liens externes (Forge des communs, guides)
3. **Partage social amélioré** : intégration Twitter/LinkedIn avec #NIRD
4. **Mode multijoueur** : défis entre établissements
5. **Analytics** : tableau de bord pour suivre les tendances communautaires
6. **Modération** : outils admin pour gérer les contributions
7. **Notifications** : alertes sur nouvelles contributions dans vos catégories favorites
8. **Export PDF** : génération rapport de score détaillé

---

## 🎯 Objectifs pédagogiques atteints

Le projet répond au brief en :
1. **Sensibilisant** de manière ludique aux enjeux NIRD
2. **Proposant** une expérience interactive et engageante
3. **Illustrant** concrètement les 5 piliers via des choix
4. **S'adressant** aux 3 publics (élèves, enseignants, techniciens)
5. **Utilisant** l'humour (badges, thème Astérix)
6. **Motivant** l'action par le feedback positif

**Esprit "résistance numérique"** : ✅ Le jeu positionne le joueur comme acteur du changement face à l'empire numérique, dans l'esprit du village d'Astérix résistant à Rome.

---

## 📝 Notes Techniques

### Configuration actuelle :
- **Backend port** : 3001
- **Frontend port** : 3000
- **MongoDB** : localhost:27017
- **Proxy Vite** : `/api` → `http://localhost:3001`

### Dépendances principales :
**Frontend :**
- react: ^18.2.0
- react-router-dom: ^6.20.1
- axios: ^1.6.2
- vite: ^5.0.8

**Backend :**
- express: ^4.18.2
- mongoose: ^8.0.3
- cors: ^2.8.5
- dotenv: ^16.3.1
- nodemon: ^3.0.2 (dev)

---

## 🎯 Conformité au Sujet NIRD (Analyse complète v2.0)

### ✅ Exigences Respectées :

#### 1. **Numérique Inclusif** 🌸
- ✅ Indicateur Inclusion dédié dans tous les choix
- ✅ Épisodes sur la fracture numérique (atelier réemploi)
- ✅ Thématique accessibilité intégrée
- ✅ Dimension communautaire ouverte à tous

#### 2. **Numérique Responsable** 🛡️
- ✅ RGPD et souveraineté des données (épisode stockage UE)
- ✅ Autonomie technologique (indicateur + épisodes)
- ✅ Logiciels libres promus dans chaque scénario
- ✅ Coopération via Forge des communs (épisode 10)

#### 3. **Numérique Durable** ♻️
- ✅ Lutte contre obsolescence (3 épisodes dédiés)
- ✅ Réemploi et reconditionnement (épisodes 3, 8, 9)
- ✅ Sobriété énergétique (indicateur + choix)
- ✅ Économie circulaire valorisée

#### 4. **Dimension Ludique** 🎮
- ✅ Gamification avec choix et conséquences
- ✅ Système de badges motivant
- ✅ Humour et références culturelles (Astérix)
- ✅ Feedback positifs encourageants

#### 5. **Dimension Communautaire** 🌍
- ✅ Mur des Résistants pour partager
- ✅ Top contributeurs (émulation)
- ✅ Likes et interactions
- ✅ Catégorisation par enjeux NIRD

#### 6. **Ancrage dans la Réalité** 🏫
- ✅ 10 scénarios concrets d'établissement
- ✅ Chiffres réalistes (60 000€, 80 PC, etc.)
- ✅ Acteurs réels (Emmaüs, Forge des communs)
- ✅ Problématiques actuelles (fin Windows 10)

---

Cette documentation permet à un autre LLM ou développeur de comprendre :
- **LE SUJET** : Défi NIRD pour établissements scolaires
- **LA SOLUTION v2.0** : Jeu narratif MERN avec 6 indicateurs + communauté
- **L'IMPLÉMENTATION** : Architecture technique complète et moderne
- **LA CONFORMITÉ** : Alignement total avec les exigences NIRD 2025
- **L'ÉVOLUTIVITÉ** : Pistes d'amélioration futures
