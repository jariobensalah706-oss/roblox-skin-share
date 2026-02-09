# Site de Téléchargement d'Extension

Ceci est un site web simple pour partager votre extension Chrome avec vos amis, peu importe le réseau local.

## 📋 Prérequis

- Votre fichier d'extension Chrome (`.crx` ou `.zip`)
- Un compte sur une plateforme de déploiement gratuit (Vercel, Netlify, ou Firebase)

## 🚀 Comment utiliser?

### Étape 1: Préparer votre extension

1. Exportez votre extension Chrome en tant que fichier `.crx` ou `.zip`
2. Placez ce fichier dans le dossier du projet (même dossier que `index.html`)
3. **Important**: Si le fichier s'appelle autrement, modifiez la ligne dans `index.html`:
   ```javascript
   const extensionFile = 'votre-fichier.crx'; // remplacez par votre nom de fichier
   ```

### Étape 2: Tester localement (optionnel)

Installez un serveur web simple:

**Avec Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Avec Node.js:**
```bash
npx http-server
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

### Étape 3: Déployer en ligne

#### Option A: Vercel (Recommandé - Plus facile)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Dans le dossier du projet, exécutez:
   ```bash
   vercel
   ```
4. Suivez les instructions
5. Votre site sera accessible via une URL unique!

#### Option B: Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez votre dossier de projet dans Netlify
3. Votre site sera en ligne en quelques secondes!

#### Option C: GitHub Pages (Gratuit)

1. Créez un repository GitHub public
2. Poussez ces fichiers
3. Allez dans Settings → Pages
4. Sélectionnez "Deploy from a branch"
5. Votre site sera accessible via: `https://votre-username.github.io/votre-repo`

## 📦 Structure du projet

```
project/
├── index.html          # Page principale
├── extension.crx       # Votre fichier d'extension (à ajouter)
└── README.md          # Ce fichier
```

## 🔗 Partager avec vos amis

Une fois déployé, vous aurez une URL comme:
- Vercel: `https://votre-site.vercel.app`
- Netlify: `https://votre-site.netlify.app`
- GitHub Pages: `https://username.github.io/repo`

Partagez simplement cette URL à vos amis!

## 🛠️ Troubleshooting

**Le bouton de téléchargement ne fonctionne pas:**
- Vérifiez que le fichier d'extension est dans le même dossier que `index.html`
- Vérifiez que le nom du fichier dans le code JavaScript correspond exactement au nom du fichier réel

**"Fichier d'extension non trouvé":**
- Assurez-vous que le fichier `.crx` ou `.zip` est dans le dossier racine
- Vérifiez l'extension du fichier (doit être `.crx` pour Chrome)

**L'extension refusée lors de l'installation:**
- Assurez-vous d'être en "Mode de développement" (chrome://extensions/)
- Vérifiez que le fichier n'est pas corrompu

## 📌 Notes importantes

- Chrome accepte uniquement les fichiers `.crx` signés ou les fichiers `.zip` en mode développement
- Si vous distribuez via `.zip`, donnez aussi les instructions du "Mode dev" à vos amis
- Le site est entièrement statique - pas de base de données ni de serveur backend nécessaire

## 💡 Améliorations possibles

- Ajouter une description de votre extension
- Ajouter des captures d'écran
- Ajouter des informations sur les permissions/fonctionnalités
- Ajouter une page "À propos"

Bon partage! 🎉