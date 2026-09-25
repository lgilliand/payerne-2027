# Giron de la Broye 2027 – Payerne

Site statique construit avec Next.js (export statique), hébergé sur Infomaniak.

## Commandes

```bash
npm install      # installer les dépendances
npm run dev      # serveur de développement sur http://localhost:3000
npm run build    # génère le site statique dans le dossier out/
npm start        # prévisualise le dossier out/ en local
```

## Mise en ligne (Infomaniak)

1. `npm run build`
2. Envoyer **le contenu** du dossier `out/` (y compris le fichier caché `.htaccess`) à la racine du site via FTP/SFTP ou le gestionnaire de fichiers.

## Structure

```
app/                 une page = un dossier (page.tsx)
  layout.tsx         police, barre de navigation et footer communs à toutes les pages
  globals.css        variables (couleurs, largeurs…) et styles de base
components/
  Block.tsx          composant de base : image, titre, texte, bouton (tous optionnels)
  Button.tsx         bouton-lien (page interne, ancre, lien externe, mailto/tel)
  Header.tsx         barre de navigation fixe + burger menu sur mobile
  Footer.tsx
lib/navigation.ts    liste des pages du menu (header et footer)
public/              fichiers servis tels quels (images, .htaccess)
```

## Utiliser un bloc

```tsx
<Block
  title="Devenir bénévole"
  text="Envie de participer à l'aventure ?"
  image={{ src: "/images/benevoles.jpg", alt: "Des bénévoles au travail" }}
  imagePosition="right"
  action={{ label: "S'inscrire", href: "/benevoles/" }}
/>
```

`text` accepte aussi du JSX pour plusieurs paragraphes, des listes ou des liens.
Les images vont dans `public/images/` ; pensez à les compresser (format WebP, ~1200 px de large) avant de les ajouter.
