# OHS CONSTRUCTION - Site Web Officiel

Site web corporatif moderne pour **OHS CONSTRUCTION**, entreprise algérienne spécialisée dans les travaux publics, hydrauliques, bâtiments et infrastructures ferroviaires.

---

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Structure du Projet](#structure-du-projet)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation & Développement](#installation--développement)
- [Pages du Site](#pages-du-site)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

---

## 🎯 Aperçu

Site web professionnel présentant les services, projets et expertises d'OHS CONSTRUCTION. Le site met en valeur plus de 15 ans d'expérience dans le secteur BTPH en Algérie.

**URL de production:** `https://ohs-construction.com` *(à configurer)*

---

## ✨ Fonctionnalités

- ✅ **Design moderne et responsive** - Compatible mobile, tablette et desktop
- ✅ **Hero section animé** - Carrousel d'images avec transitions fluides
- ✅ **Section services avec images** - 4 services principaux avec effets hover
- ✅ **Galerie de projets** - Portfolio complet des réalisations
- ✅ **Formulaire de contact** - Intégration email fonctionnelle
- ✅ **Optimisé SEO** - Meta tags, structure sémantique HTML5
- ✅ **Performance optimisée** - Chargement rapide, images optimisées
- ✅ **Multilingue ready** - Structure préparée (actuellement en français)

---

## 📁 Structure du Projet

```text
site web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── assets/
│   ├── css/
│   │   └── style.css           # Styles principaux
│   ├── js/
│   │   └── main.js             # Scripts JavaScript
│   └── images/
│       ├── logo.jpg
│       ├── penetrante_tizi/    # Images projet routes
│       ├── ferroviaire_thenia/ # Images projet ferroviaire
│       ├── entretien_dellys/   # Images projet hydraulique
│       ├── hotel_africana/     # Images projet bâtiment
│       └── ...                 # Autres projets
├── index.html                  # Page d'accueil
├── apropos.html                # À propos
├── services.html               # Services détaillés
├── projets.html                # Portfolio projets
├── contact.html                # Contact
├── README.md                   # Ce fichier
└── CI-CD.md                    # Documentation déploiement
```

---

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styling moderne avec variables CSS
- **Vanilla JavaScript** - Interactivité (carrousel, navigation mobile)

### Fonts & Icons
- **Google Fonts** - Inter (titres), Roboto (texte)
- **Font Awesome 6.4** - Icônes

### Outils de Développement
- **Git** - Contrôle de version
- **GitHub Actions** - CI/CD automatisé
- **Python HTTP Server** - Serveur de développement local

### Hébergement
- **cPanel** - Hébergement production
- **SSH/rsync** - Déploiement automatisé

---

## 🚀 Installation & Développement

### Prérequis
- Git installé
- Navigateur web moderne
- Éditeur de code (VS Code recommandé)

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/ohs-construction.git
   cd ohs-construction
   ```

2. **Lancer le serveur de développement**
   
   Option 1 - Python (recommandé):
   ```bash
   python3 -m http.server 8080
   ```
   
   Option 2 - PHP:
   ```bash
   php -S localhost:8080
   ```
   
   Option 3 - Node.js (avec http-server):
   ```bash
   npx http-server -p 8080
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:8080
   ```

### Développement

#### Modifier les styles
Éditez `assets/css/style.css`. Les variables CSS sont définies dans `:root`:
```css
:root {
    --primary-color: #002B5B;    /* Bleu marine */
    --secondary-color: #E85D04;  /* Orange construction */
    --accent-color: #FCA311;     /* Jaune/Or */
}
```

#### Ajouter des images
Placez les images dans `assets/images/` et référencez-les:
```html
<img src="assets/images/votre-image.jpg" alt="Description">
```

#### Tester la responsivité
Utilisez les DevTools du navigateur (F12) pour tester:
- Mobile: 375px, 414px
- Tablette: 768px, 1024px
- Desktop: 1280px, 1920px

---

## 📄 Pages du Site

| Page | Fichier | Description |
|------|---------|-------------|
| **Accueil** | `index.html` | Hero, services, stats, présentation |
| **À Propos** | `apropos.html` | Histoire, valeurs, équipe |
| **Services** | `services.html` | Détails des 4 services principaux |
| **Projets** | `projets.html` | Portfolio des réalisations |
| **Contact** | `contact.html` | Formulaire, coordonnées, carte |

### Services Présentés

1. **Travaux Publics & Routes** - Routes, autoroutes, terrassements
2. **Infrastructures Ferroviaires** - Gares, voies, électrification
3. **Hydraulique & Portuaire** - AEP, assainissement, ports
4. **Bâtiment & Aménagement** - Construction, VRD, aménagements

---

## 🌐 Déploiement

### Déploiement Automatique (Production)

Le site utilise **GitHub Actions** pour un déploiement automatique vers cPanel.

📖 **Voir la documentation complète:** [`CI-CD.md`](./CI-CD.md)

**Workflow:**
```
git push origin main → GitHub Actions → cPanel (SSH/rsync)
```

### Déploiement Manuel (FTP)

Si vous préférez le déploiement manuel:

1. Connectez-vous à votre cPanel via FTP
2. Uploadez tous les fichiers vers `/public_html/`
3. Vérifiez les permissions (644 pour fichiers, 755 pour dossiers)

---

## 🎨 Personnalisation

### Changer les Couleurs

Modifiez les variables CSS dans `assets/css/style.css`:
```css
:root {
    --primary-color: #VOTRE_COULEUR;
    --secondary-color: #VOTRE_COULEUR;
}
```

### Modifier le Logo

Remplacez `assets/images/logo.jpg` par votre logo (format recommandé: PNG transparent, 200x80px)

### Ajouter un Projet

1. Créez un dossier dans `assets/images/nom_projet/`
2. Ajoutez vos images
3. Éditez `projets.html` pour ajouter le projet

---

## 🤝 Contribution

### Workflow Git

1. Créer une branche feature:
   ```bash
   git checkout -b feature/nom-feature
   ```

2. Faire vos modifications et commiter:
   ```bash
   git add .
   git commit -m "Description des changements"
   ```

3. Pousser la branche:
   ```bash
   git push origin feature/nom-feature
   ```

4. Créer une Pull Request sur GitHub

### Standards de Code

- **HTML:** Indentation 4 espaces, balises en minuscules
- **CSS:** Organisation par sections, commentaires clairs
- **JavaScript:** ES6+, commentaires JSDoc
- **Commits:** Messages en français, descriptifs

---

## 📞 Contact & Support

**OHS CONSTRUCTION**
- 📍 Tizi Ouzou, Algérie
- 📧 contact@ohs-construction.com
- 🌐 [ohs-construction.com](https://ohs-construction.com)

**Développement Web**
- 🐛 Issues: [GitHub Issues](https://github.com/votre-username/ohs-construction/issues)
- 📖 Documentation: Ce README + `CI-CD.md`

---

## 📝 License

© 2025 OHS CONSTRUCTION. Tous droits réservés.

Ce site web est la propriété d'OHS CONSTRUCTION. Le code source est disponible sous licence MIT pour référence et apprentissage.

---

## 🔄 Changelog

### Version 1.0.0 (Décembre 2025)
- ✅ Lancement initial du site
- ✅ 5 pages complètes (Accueil, À Propos, Services, Projets, Contact)
- ✅ Section services avec images et effets hover
- ✅ Hero section avec carrousel animé
- ✅ Design responsive complet
- ✅ CI/CD avec GitHub Actions
- ✅ Intégration cPanel

---

**Construit avec ❤️ pour OHS CONSTRUCTION**
