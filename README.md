# Giron de la Broye 2027 – Payerne

Site Next.js avec le CMS [Payload](https://payloadcms.com) intégré, hébergé sur l'hébergement Node.js d'Infomaniak (`next start`).

- Le site public est servi sur `/`.
- L'administration (articles de l'accueil, images, comptes) est sur `/admin`.
- Les données sont dans une base SQLite (un seul fichier) et les images envoyées dans un dossier, tous deux **hors de Git**.

## Démarrer en local

```bash
npm install
cp .env.example .env   # puis remplir PAYLOAD_SECRET (openssl rand -hex 32)
npm run dev            # http://localhost:3000, administration sur http://localhost:3000/admin
```

Au premier passage sur `/admin`, Payload propose de créer le premier compte.
La base locale est créée automatiquement dans `data/`.

## Commandes

```bash
npm run dev                     # serveur de développement
npm run build                   # compile le site pour la production
npm start                       # lance le site compilé (utilise la variable PORT)
npm run generate                # régénère l'import map de l'admin et cms/payload-types.ts
npm run migrate:create -- nom   # crée une migration après une modification des collections
```

## Modifier les collections du CMS

Les collections (types de contenu) sont décrites dans `cms/collections/`.
Après une modification (nouveau champ, nouvelle collection…) :

1. `npm run generate` pour mettre à jour les types TypeScript.
2. `npm run migrate:create -- description-courte` pour créer la migration dans `cms/migrations/`.
3. Committer le tout. En production, les migrations sont appliquées automatiquement au démarrage du site.

En local, Payload synchronise directement la base avec les collections : la migration ne sert qu'à la production.

## Mise en ligne (Infomaniak)

### Première installation

1. **Créer le site Node.js** : dans le Manager, ouvrir l'hébergement web, cliquer sur *Ajouter*, choisir *Node.js* (version LTS), le domaine, puis la méthode d'installation **personnalisée**.
   Conseil : faire un premier essai sur un sous-domaine (ex. `test.payerne2027.ch`) avant de basculer le domaine principal.
2. **Récupérer le code en SSH** dans le dossier du site (il doit être vide) :
   ```bash
   ssh-keygen -t ed25519 -C "infomaniak"   # puis ajouter ~/.ssh/id_ed25519.pub comme « Deploy key » du dépôt GitHub
   cd <dossier-du-site>
   git clone git@github.com:lgilliand/payerne-2027.git .
   ```
3. **Créer le dossier des données, hors du dossier du site**, pour qu'il survive aux déploiements :
   ```bash
   mkdir -p ~/payerne-data/media
   echo $HOME   # noter le chemin absolu pour l'étape suivante
   ```
4. **Créer le fichier `.env`** dans le dossier du site (il n'est pas dans Git) :
   ```bash
   PAYLOAD_SECRET=<résultat de : openssl rand -hex 32>
   DATABASE_URL=file:<HOME>/payerne-data/payload.db
   MEDIA_DIR=<HOME>/payerne-data/media
   ```
5. **Configurer le site** dans le Manager (*Gérer les paramètres avancés* > onglet *Node.js*) :

   | Réglage                  | Valeur                                                |
   | ------------------------ | ----------------------------------------------------- |
   | Dossier d'exécution      | `./`                                                  |
   | Commande de construction | `git pull && npm ci --include=dev && npm run build`   |
   | Commande de lancement    | `npm start`                                           |
   | Port d'écoute            | celui proposé par le Manager (lu via la variable `PORT`) |

6. **Lancer la construction puis démarrer le site** depuis le Manager. La console d'exécution affiche les erreurs éventuelles.
7. Ouvrir `https://<domaine>/admin` et **créer le premier compte administrateur** sans attendre, avant qu'une autre personne ne le fasse.

### Déployer une nouvelle version du code

1. `git push` sur `main`.
2. Dans le Manager, relancer la construction puis redémarrer le site (la commande de construction fait le `git pull`).

Les articles et les images ne sont pas concernés : ils sont modifiés en direct depuis `/admin`.

### Sauvegardes

Tout le contenu du CMS tient dans `~/payerne-data/` (base `payload.db` et dossier `media/`).
Vérifier que les sauvegardes automatiques de l'hébergement couvrent ce dossier, et en télécharger une copie de temps en temps par SFTP.

## Structure

```
app/
  (frontend)/          le site public : une page = un dossier (page.tsx)
    layout.tsx         police, barre de navigation et footer communs à toutes les pages
    globals.css        variables (couleurs, largeurs…) et styles de base
  (payload)/           administration (/admin) et API de Payload, fichiers générés
cms/
  collections/         types de contenu du CMS (articles, médias, utilisateurs)
  migrations/          évolutions de la base, appliquées automatiquement en production
  payload-types.ts     types TypeScript générés (npm run generate)
components/
  Block.tsx            composant de base : image, titre, texte, bouton (tous optionnels)
  ArticleBlock.tsx     affiche un article du CMS avec un Block
  Button.tsx           bouton-lien (page interne, ancre, lien externe, mailto/tel)
  Header.tsx           barre de navigation fixe + burger menu sur mobile
  Footer.tsx
lib/
  articles.ts          lecture des articles publiés pour l'accueil
  navigation.ts        liste des pages du menu (header et footer)
payload.config.ts      configuration de Payload (base, éditeur, langue…)
public/                fichiers servis tels quels (images fixes du site)
```

## Utiliser un bloc

```tsx
<Block
  title="Devenir bénévole"
  text="Envie de participer à l'aventure ?"
  image={{ src: "/images/benevoles.jpg", alt: "Des bénévoles au travail" }}
  imagePosition="right"
  action={{ label: "S'inscrire", href: "/benevoles" }}
/>
```

`text` accepte aussi du JSX pour plusieurs paragraphes, des listes ou des liens.
Les images vont dans `public/images/` ; pensez à les compresser (format WebP, ~1200 px de large) avant de les ajouter.
