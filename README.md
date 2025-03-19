# Groove Academy

Site web pour l'école de musique Groove Academy, permettant la gestion des cours, réservations et paiements en ligne.

## Technologies utilisées

- **Frontend** : Next.js 14 avec TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Paiements** : Stripe
- **Authentication** : Supabase Auth
- **Déploiement** : Railway

## Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase
- Compte Stripe
- Compte Railway

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/groove-academy.git
cd groove-academy
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env.local` à la racine du projet avec les variables suivantes :
```env
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre-clé-publique-stripe
STRIPE_SECRET_KEY=votre-clé-secrète-stripe
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

## Structure du projet

```
src/
├── app/              # Pages et routes Next.js
├── components/       # Composants React réutilisables
├── lib/             # Utilitaires et configurations
├── types/           # Types TypeScript
└── styles/          # Styles globaux
```

## Fonctionnalités

- Présentation des cours et tarifs
- Réservation de cours d'essai
- Paiement en ligne sécurisé
- Recommandation de cours par IA
- Réservation de salles de répétition
- Gestion des inscriptions au concert de fin d'année
- Formulaire de contact
- Carte interactive

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
