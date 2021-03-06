# Créez un réseau social d’entreprise

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux !

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Frontend

### Installation

Dans le fichier `src/port.js` renseignez le port sur lequel vous aller utiliser l'application.

Par défaut il est sur `3307` si vous utiliser `MariaDB` sinon `3306` pour `MySQL`.

Lancer `npm install` dans le dossier frontend.

Puis `npm start` pour lancer l'application.

## Backend

### Installation

Créer un fichier `.env` à la racine de ce dossier et entrez vos identifiants.

Le `.env.example` vous permettra d'avoir plus de précision quand à la marche à suivre.

Lancer `npm install` dans le dossier backend.

Puis `npm start` pour lancer l'`API`.

## Objectif

- La présentation des fonctionnalités doit être simple

- La création d’un compte doit être simple et possible depuis un téléphone mobile

- Le profil doit contenir très peu d’informations pour que sa complétion soit rapide

- La suppression du compte doit être possible

- L’accès à un forum où les salariés publient des contenus multimédias doit être présent

- L’accès à un forum où les salariés publient des textes doit être présent

- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés

- Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre
  salariés

  ## Documentation

  La documentation de l'API est disponible à [cette adresse](https://documenter.getpostman.com/view/1788084/UVyswFd5).
