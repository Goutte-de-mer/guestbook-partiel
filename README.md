# Guestbook

Un livre d'or moderne permettant aux visiteurs de laisser des messages.

## Installation et lancement

### Configuration de la base de données

1. Copiez le fichier d'exemple de configuration :

```bash
cp .env.example .env
```

2. Modifiez le fichier `.env` et ajoutez votre URL de base de données :

```env
CONNECTION_STRING=votre_vraie_url_de_database_ici
```

### Lancement du projet

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Fonctionnalités

- Affichage des messages du livre d'or
- Ajout de nouveaux messages
