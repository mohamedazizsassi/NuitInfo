# 🛡️ Le Parcours du Résistant Numérique

> **Nuit de l'Info 2025 - Défi NIRD** 
> *Numérique Inclusif, Responsable et Durable*

Un jeu narratif interactif pour sensibiliser à la résistance numérique dans les établissements scolaires.

---

## 🎮 Concept

Un **visual novel gamifié** où vos choix façonnent l'avenir numérique de votre établissement. Incarnez un rôle (Élève, Enseignant ou Technicien) et prenez des décisions qui impactent **6 indicateurs NIRD** :

- 🔷 **Autonomie** - Indépendance vis-à-vis des Big Tech
- 💰 **Coût** - Impact budgétaire
- 🌱 **Durabilité** - Réemploi et lutte contre l'obsolescence
- ⚡ **Sobriété** - Consommation énergétique
- 💜 **Libre** - Usage de logiciels open source
- 🌸 **Inclusion** - Accessibilité pour tous

---

## ✨ Nouvelles Fonctionnalités (v2.0)

### 🆕 6ème Indicateur : Inclusion
- Mesure l'accessibilité et l'équité numérique
- Intégré dans tous les épisodes et calculs de score

### 🌍 Dimension Communautaire
- **Mur des Résistants** : partagez vos idées et victoires NIRD
- Système de contributions par catégorie
- Classement des top contributeurs
- Système de likes

### 🏰 Ambiance "Village Résistant"
- Thème inspiré d'Astérix vs l'Empire BigTechus
- Messages humoristiques et encouragements
- Avatars par rôle (Druide Linuxix, Maître Gaulois, Apprenti Résistant)
- Navigation immersive avec bannière village

### 📚 10 Épisodes Complets
- **5 épisodes originaux** (Cloud, Tablettes, Imprimante, Visio, WiFi)
- **5 nouveaux épisodes** inspirés du PDF officiel NIRD :
  - 🪟 Fin de support Windows 10
  - ☁️ Stockage hors UE (RGPD)
  - 🗑️ Obsolescence programmée
  - 🔨 Atelier réemploi
  - 🏛️ Forge des communs numériques

### 🎲 Rejouabilité Maximale
- **Épisodes randomisés** : ordre différent à chaque partie
- **Choix randomisés** : positions des réponses mélangées
- Expérience unique à chaque session

---

## 🏗️ Architecture Technique

### Stack MERN
```
Frontend  : React 18.2 + Vite 5.4 + React Router 6.20
Backend   : Node.js + Express 4.18 + MongoDB
State     : Context API (GameContext)
Styles    : CSS Custom Properties + Animations
```

### Structure du Projet
```
Principale/
├── client/               # Application React
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   │   ├── ChoiceButton.jsx
│   │   │   ├── EpisodeCard.jsx
│   │   │   ├── FeedbackBox.jsx
│   │   │   ├── RoleSelector.jsx
│   │   │   ├── ScoreBoard.jsx
│   │   │   └── VillageHeader.jsx  
│   │   ├── context/
│   │   │   └── GameContext.jsx   # État global
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Game.jsx
│   │   │   ├── EndScreen.jsx
│   │   │   └── Community.jsx     
│   │   ├── services/
│   │   │   └── api.js            # API client
│   │   └── utils/
│   │       └── humorMessages.js  
│   └── vite.config.js
│
├── server/               # API Express
│   ├── models/
│   │   ├── Episode.js
│   │   ├── Score.js
│   │   └── Contribution.js       
│   ├── routes/
│   │   ├── episodeRoutes.js
│   │   ├── scoreRoutes.js
│   │   └── communityRoutes.js    
│   ├── config/
│   │   └── db.js
│   ├── seed.js                   # Seed avec 10 épisodes
│   ├── newEpisodes.js            
│   └── server.js
│
├── .env                  # Configuration
├── .gitignore           # Fichiers ignorés
├── info.md              # Documentation projet
└── README.md            # Ce fichier
```

---

## 🚀 Installation & Démarrage

### Prérequis
- **Node.js** v18+ 
- **MongoDB** installé et démarré
- **npm** ou **yarn**

### Étape 1 : Cloner et installer
```bash
# Cloner le projet
git clone <votre-repo>
cd Principale

# Installer toutes les dépendances (client + server)
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### Étape 2 : Configuration
```bash
# Créer le fichier .env à la racine
PORT=3001
MONGODB_URI=mongodb://localhost:27017/parcours-resistant-numerique
```

### Étape 3 : Initialiser la base de données
```bash
# Lancer MongoDB (dans un terminal séparé)
mongod

# Seeder la base avec les 10 épisodes
cd server
node seed.js
```

### Étape 4 : Lancer l'application
```bash
# Terminal 1 : Backend (port 3001)
cd server
node server.js

# Terminal 2 : Frontend (port 3000)
cd client
npm run dev
```

### Accès
- 🎮 **Frontend** : http://localhost:3000
- 🔌 **API** : http://localhost:3001
- 🌍 **Communauté** : http://localhost:3000/community

---

## 📡 API Endpoints

### Épisodes
- `GET /api/episodes` - Liste tous les épisodes
- `GET /api/episodes/:id` - Un épisode
- `POST /api/episodes/seed` - Réinitialiser la DB

### Scores
- `GET /api/scores` - Tous les scores
- `POST /api/scores` - Sauvegarder un score
- `GET /api/scores/leaderboard` - Classement

### Communauté 🆕
- `GET /api/community` - Liste des contributions
- `GET /api/community?category=libre` - Filtrer par catégorie
- `POST /api/community` - Créer une contribution
- `GET /api/community/top` - Top contributeurs
- `GET /api/community/stats` - Statistiques
- `PUT /api/community/:id/like` - Liker une contribution

---

## 🎯 Fonctionnalités Gameplay

### 3 Rôles Jouables
- 🎒 **Élève** - Apprenti Résistant
- 👨‍🏫 **Enseignant** - Maître Gaulois du Savoir
- 🔧 **Technicien** - Druide Linuxix

### Système de Choix
Chaque épisode propose **3 choix** avec :
- Impacts sur les 6 indicateurs NIRD
- Feedbacks humoristiques personnalisés
- Accumulation des scores au fil du parcours
- **Ordre aléatoire** des épisodes et réponses à chaque nouvelle partie

### 4 Badges Finaux
- 🏆 **Druide Libre** (≥80%) - Maître absolu
- ⚔️ **Gaulois du Numérique** (≥60%) - Résistant valeureux
- 🛡️ **Résistant Junior** (≥40%) - Premiers pas
- 📱 **Apprenti Connecté** (<40%) - En découverte

### Sauvegarde Automatique
- État du jeu persisté dans `localStorage`
- Reprise possible à tout moment
- Bouton "Nouvelle Partie" pour recommencer

---

## 🎨 Design & UX

### Palette de Couleurs
```css
--color-autonomy: #3b82f6;   /* Bleu */
--color-cost: #ef4444;        /* Rouge */
--color-durability: #22c55e;  /* Vert */
--color-sobriety: #eab308;    /* Jaune */
--color-libre: #8b5cf6;       /* Violet */
--color-inclusion: #f472b6;   /* Rose */
```

### Thème
- **Style BD** avec typographies Bangers et Comic Neue
- **Animations** fluides (pulse, bounce, glow, shimmer)
- **Responsive** mobile et desktop
- **Dark mode** par défaut

### UI Améliorée v2.0
- Boutons premium avec gradients et effets lumineux
- Animations 3D au survol (translateY, scale)
- Formulaire communautaire agrandi et interactif
- Effets de brillance sur les boutons principaux
- Bordures néon et glow effects
- Champs de saisie avec transitions fluides

---

## 🌐 Déploiement Gratuit

### Hébergement 100% Gratuit Recommandé

**Stack d'hébergement :**
- 🗄️ **Database** : MongoDB Atlas (512MB gratuit)
- 🔧 **Backend** : Render (750h/mois gratuit)
- 🎨 **Frontend** : Vercel (illimité gratuit)

### Configuration Rapide

**1. MongoDB Atlas**
```bash
# Créer un cluster gratuit sur mongodb.com/cloud/atlas
# Récupérer l'URI de connexion
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resistant-numerique
```

**2. Backend sur Render**
```bash
# render.com → New Web Service
# Root Directory: server
# Build: npm install
# Start: node server.js
# Variables d'environnement:
MONGODB_URI=<votre_uri_atlas>
PORT=3001
NODE_ENV=production
```

**3. Frontend sur Vercel**
```bash
# vercel.com → Import Project
# Root Directory: client
# Build: npm run build
# Variables d'environnement:
VITE_API_URL=https://votre-api.onrender.com/api
```

### Alternatives Gratuites
- **Backend** : Railway ($5/mois crédit), Fly.io, Cyclic
- **Frontend** : Netlify, Cloudflare Pages
- **Database** : MongoDB Atlas reste optimal

**Coût Total** : 0€ 🎉

---

## 🧪 Tests & Développement

```bash
# Lancer en mode dev avec hot reload
npm run dev

# Linter (si configuré)
npm run lint

# Build production
npm run build
```

---

## 📚 Documentation Complète

Voir `info.md` pour :
- Explication détaillée du concept NIRD
- Architecture technique approfondie
- Détails des modèles de données
- Guide de contribution
- Roadmap des améliorations futures

---

## 🎓 Objectifs Pédagogiques

✅ **Sensibiliser** aux enjeux du numérique responsable  
✅ **Illustrer** concrètement les impacts des choix technologiques  
✅ **Encourager** l'adoption de solutions libres et durables  
✅ **Démontrer** que sobriété rime avec économies  
✅ **Promouvoir** l'inclusion numérique  

---

## 🤝 Contribution

Ce projet est développé dans le cadre de la **Nuit de l'Info 2025**.

Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle feature'`)
4. Push (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

## 📜 Licence

Projet éducatif - Nuit de l'Info 2025  
Licence MIT 

---

## 🙏 Remerciements

- **Nuit de l'Info** pour le défi NIRD
- **Forge des communs numériques** pour l'inspiration
- Tous les acteurs du logiciel libre et de l'éducation numérique responsable

---

**🛡️ Rejoins la résistance numérique ! Par Linuxix ! 🐧**
