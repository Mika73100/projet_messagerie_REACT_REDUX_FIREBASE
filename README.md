
# 💬 Projet Messagerie – React + Redux + Firebase

Ce projet est une application de messagerie en temps réel développée avec **React**, **Redux** et **Firebase**, permettant aux utilisateurs de se connecter, publier des messages, commenter, et interagir dans une interface moderne.

## ⚙️ Stack technique

- **React** – Frontend interactif
- **Redux** – Gestion centralisée de l’état
- **Firebase** – Authentification, base de données, etc.
- **SCSS** – Style modulaire et personnalisé

## ✨ Fonctionnalités principales

- Authentification avec Firebase
- Création, suppression et commentaire de posts
- Interface fluide et responsive
- Gestion des utilisateurs connectés
- Composants réactifs en temps réel

## 🔧 Installation

### Prérequis

- Node.js
- Compte Firebase
- Clé d’API Firebase configurée dans `.env.local` ou directement dans le projet

### Étapes

```bash
git clone https://github.com/ton-utilisateur/projet_messagerie_REACT_REDUX_FIREBASE.git
cd projet_messagerie_REACT_REDUX_FIREBASE
npm install
npm start
```

L’application sera disponible à `http://localhost:3000`

## 🧩 Structure du projet

```
src/
├── components/           # Composants UI (Post, Comment, Login, etc.)
├── reducers/             # Réducteurs Redux
├── actions/              # Actions Redux
├── App.jsx               # Point d’entrée de l’application
├── index.jsx             # Rendu principal
```

## 🛡️ Authentification

Le projet utilise Firebase pour :

- Authentification par email/mot de passe
- Gestion des utilisateurs
- Possibilité d’ajouter d’autres fournisseurs Firebase

## 🙌 Remerciements

Merci d’avoir jeté un œil à ce projet !  

<div align="center">
⭐ N’hésite pas à forker, améliorer ou t’en inspirer ! ⭐  
Bon code à toi 🚀

⭐ Un petit like sur le repo fait toujours plaisir ! ⭐  
</div>
