# Carte SIATeG — application web installable

Carte de visite numérique pour le forum : partage ton contact par QR code (vCard),
scanne les cartes papier (OCR embarqué), garde ton carnet de contacts. Tout fonctionne
dans le navigateur, sur le téléphone, sans serveur et gratuitement.

## Contenu du dossier
- `index.html` — l'application
- `manifest.webmanifest` — permet l'installation sur l'écran d'accueil
- `sw.js` — service worker (lancement hors-ligne)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` — icônes

## Important
L'installation et le mode hors-ligne exigent que le site soit **servi en HTTPS**.
Ouvrir `index.html` directement (double-clic, adresse `file://`) fonctionne pour un aperçu
rapide, mais **ne permet PAS** l'installation ni le hors-ligne. Il faut l'héberger.

## Héberger gratuitement (le plus simple : Netlify Drop, ~2 min)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose **tout ce dossier** dans la zone indiquée.
3. Netlify te donne une URL en HTTPS (ex. `https://ton-nom.netlify.app`).
4. Ouvre cette URL sur ton téléphone → le bouton « Installer » apparaît.

### Autres options gratuites
- **Cloudflare Pages** : https://pages.cloudflare.com (dépôt du dossier ou via GitHub)
- **GitHub Pages** : crée un dépôt, pousse ces fichiers, active Pages dans les réglages.
  (Les chemins sont relatifs, donc ça marche même dans un sous-dossier `/nom-du-depot/`.)
- **Vercel** : https://vercel.com

## Installer sur le téléphone
- **Android (Chrome)** : le bouton « Installer » apparaît en haut ; un clic suffit.
- **iPhone (Safari)** : touche « Installer », puis suis les 3 étapes affichées
  (bouton Partager → « Sur l'écran d'accueil » → Ajouter).

## Réutiliser pour un autre forum
Ouvre `index.html`, tout en haut du script cherche le bloc `EVENT` :
```js
const EVENT = {
  name: "Rencontré à SIATeG 2026 — Niamey",
  tag: "SIATeG 2026"
};
```
Change ces deux valeurs (elles apparaissent dans la note des contacts et les exports).
Tu peux aussi ajuster la ligne de coordonnées dans l'en-tête du `index.html`.

## Notes techniques
- Données (profil + contacts) stockées localement sur l'appareil.
- OCR : moteur Tesseract chargé au premier scan (quelques Mo), puis mis en cache.
- Le partage de contact par QR marche pour tout le monde : celui qui scanne n'a
  besoin d'aucune app, juste de l'appareil photo de son téléphone.
