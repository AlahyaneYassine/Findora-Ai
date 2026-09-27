# Findora AI

Plateforme web de recherche de produits assistée par IA : l'utilisateur choisit une catégorie et un mot-clé, et une IA générative (Cohere) propose une sélection de produits comparables issus de plusieurs enseignes en ligne (hors Amazon), que l'utilisateur peut sauvegarder, comparer et « acheter » via un parcours de commande simulé.

## Fonctionnalités

- **Authentification** : inscription / connexion par email, connexion via Google OAuth, réinitialisation de mot de passe par email, gestion de profil (informations personnelles, avatar)
- **Recherche de produits par IA** : génération de résultats produits via l'API Cohere (modèle `command-r-plus`) à partir d'une catégorie (électronique, automobile, transport, bureau) et d'un mot-clé, avec filtrage des doublons et exclusion des sources Amazon
- **Historique des recherches** effectuées par chaque utilisateur
- **Sélections favorites** : sauvegarde de produits pour comparaison ultérieure
- **Parcours d'achat simulé** : formulaire de commande, suivi des achats, export PDF
- **Espace administrateur** : tableau de bord (statistiques utilisateurs/recherches/messages), gestion et blocage des comptes, messagerie de contact avec réponse par email
- **Pages informatives** : à propos, FAQ, politique de confidentialité, formulaire de contact

## Stack technique

**Frontend** (`client/`) : React 19, React Router, Material UI, React-Bootstrap, styled-components, Framer Motion, Chart.js, jsPDF

**Backend** (`server/`) : Node.js, Express 5, MongoDB / Mongoose

**IA** : Cohere AI (génération de résultats produits)

**Auth & sécurité** : JWT, bcrypt, Google OAuth 2.0, Helmet, express-rate-limit, express-mongo-sanitize

**Autres** : Nodemailer (emails transactionnels), Multer (upload d'avatars)

## Architecture

```
Findora-Ai/
├── client/                 # Application React (SPA)
│   └── src/
│       ├── admin/          # Interface d'administration (dashboard, gestion utilisateurs, messages)
│       ├── components/     # Composants réutilisables (cartes produit, liste, chargement...)
│       ├── contexts/       # Contexts React (produits, sélections)
│       ├── pages/          # Pages (checkout, achats, reset de mot de passe...)
│       ├── Searching/      # Page de recherche de produits
│       └── AuthContext.js  # Contexte d'authentification global
├── server/                 # API REST Node.js / Express
│   ├── controllers/        # Logique métier (recherche IA, profil, achats, admin)
│   ├── models/              # Schémas Mongoose (User, Search, Selection, Purchase, Contact, Profile)
│   ├── routes/               # Endpoints REST
│   ├── middleware/           # Authentification JWT, contrôle des droits admin
│   └── utils/                 # Utilitaires (parsing JSON défensif des réponses IA)
└── docs/                    # Build de production du frontend (hébergement GitHub Pages)
```

## Prérequis

- Node.js (≥ 18)
- Une instance MongoDB (locale ou Atlas)
- Une clé API [Cohere](https://dashboard.cohere.com/api-keys)
- Des identifiants OAuth Google (pour la connexion Google)
- Un compte Gmail avec un [mot de passe d'application](https://myaccount.google.com/apppasswords) (pour l'envoi d'emails)

## Installation et lancement

```bash
git clone https://github.com/AlahyaneYassine/Findora-Ai.git
cd Findora-Ai

# Backend
cd server
npm install
cp .env.example .env   # puis renseigner vos propres clés/identifiants
npm start               # démarre l'API sur http://localhost:5000

# Frontend (dans un second terminal)
cd ../client
npm install
npm start               # démarre l'app sur http://localhost:3000
```

## Limitations connues / pistes d'amélioration

- Pas de suite de tests automatisés à ce jour
- La génération de produits repose entièrement sur l'IA (Cohere) : les URLs et prix générés ne sont pas vérifiés en temps réel auprès de vraies boutiques
- Le parcours d'achat est simulé (aucun paiement réel n'est traité)
- La clé `SERPAPI_API_KEY` prévue dans la configuration n'est pas utilisée dans le code actuel

## Auteur

**Yassine Alahyane** — Étudiant ingénieur en 4ᵉ année, Cybersécurité et Infrastructures Réseaux (EMSI Casablanca)
