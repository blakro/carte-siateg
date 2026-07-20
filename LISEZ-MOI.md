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

## Partage viral « carte + app »
Une fois l'app hébergée en HTTPS, le QR de ta carte devient par défaut un **lien
intelligent** : la personne qui le scanne avec son appareil photo ouvre l'app
avec ta carte dedans, et choisit en un tap **Enregistrer le contact** et/ou
**Créer ma carte à mon tour** — elle obtient alors son propre QR viral, et
l'app se propage de personne en personne. Aucune donnée ne transite par un
serveur : la carte est encodée dans le lien lui-même.

Un sélecteur sous le QR permet de basculer en mode **« Contact direct »**
(vCard pure) : utile si le réseau du forum est saturé, car ce mode fonctionne
sans aucune connexion chez la personne qui scanne (mais n'apporte pas l'app).

## Onglet Agenda
Un 4ᵉ onglet **Agenda** affiche le programme du forum sous forme de frise :
heure, type de session (panel, conférence…), présentiel/hybride, intervenants et
modérateur. Le statut se met à jour tout seul (**Terminé / En cours / À suivre**)
et chaque session peut être ajoutée au calendrier du téléphone en un tap
(fichier `.ics` standard — Google Agenda, Apple Calendrier, Outlook…). Un bouton
en bas exporte tout l'agenda d'un coup.

## Réutiliser pour un autre forum
Ouvre `index.html`, tout en haut du script cherche le bloc `EVENT` :
```js
const EVENT = {
  name: "Rencontré à SIATeG 2026 — Niamey",
  tag: "SIATeG 2026",
  place: "Centre de Conférence Mahatma Gandhi, Niamey"
};
```
Change ces valeurs (elles apparaissent dans la note des contacts et les exports).
Tu peux aussi ajuster la ligne de coordonnées dans l'en-tête du `index.html`.

Juste en dessous, le bloc `PROGRAM` contient le programme. Ajoute/modifie les
journées et les sessions :
```js
const PROGRAM = {
  days: [
    { date: "2026-07-23", label: "Jour 1 — 23 juillet", sessions: [
      { start:"09:10", end:"10:00", place:"Présentiel", kind:"Panel de haut niveau",
        title:"…", desc:"…facultatif…", who:["Intervenant 1","Intervenant 2"], mod:"Modérateur" },
      // brk:true pour les pauses / logistique (pas de bouton calendrier)
    ]}
    // ajoute un 2ᵉ objet { date:"2026-07-24", … } pour le Jour 2
  ]
};
```
Le champ `date` (format `AAAA-MM-JJ`) sert au statut « en cours » et aux fichiers `.ics`.

## Notes techniques
- Données (profil + contacts) stockées localement sur l'appareil.
- OCR : moteur Tesseract chargé au premier scan (quelques Mo), puis mis en cache.
- Le partage de contact par QR marche pour tout le monde : celui qui scanne n'a
  besoin d'aucune app, juste de l'appareil photo de son téléphone.
