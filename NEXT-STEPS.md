# 🚀 OHS Construction - Prochaines Étapes pour Activer le CI/CD

## ✅ Ce qui a été fait

- ✅ Section services avec images ajoutée au site
- ✅ Documentation complète créée (README.md + CI-CD.md)
- ✅ Workflow GitHub Actions créé (.github/workflows/deploy.yml)
- ✅ .gitignore configuré
- ✅ Tout committé et poussé vers GitHub

**Repository:** https://github.com/samhdd/OHS-Construction

---

## 📋 Prochaines Étapes pour Activer le Déploiement Automatique

### Étape 1: Générer une Clé SSH de Déploiement

Sur votre machine locale, exécutez:

```bash
ssh-keygen -t ed25519 -C "github-actions-ohs-construction" -f ~/.ssh/github_deploy_ohs
```

**Important:** Ne mettez PAS de passphrase (appuyez sur Entrée deux fois)

Cela créera:
- `~/.ssh/github_deploy_ohs` (clé privée - à garder secrète)
- `~/.ssh/github_deploy_ohs.pub` (clé publique - à installer sur le serveur)

---

### Étape 2: Installer la Clé Publique sur le Serveur cPanel

#### Option A: Via SSH (recommandé)

1. **Afficher la clé publique:**
   ```bash
   cat ~/.ssh/github_deploy_ohs.pub
   ```

2. **Se connecter au serveur cPanel:**
   ```bash
   ssh VOTRE_USERNAME_CPANEL@VOTRE_DOMAINE.com
   ```

3. **Ajouter la clé publique:**
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   echo "COLLEZ_ICI_VOTRE_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   exit
   ```

#### Option B: Via l'Interface cPanel

1. Connectez-vous à cPanel
2. Allez dans **SSH Access** → **Manage SSH Keys**
3. Cliquez sur **Import Key**
4. Collez votre clé publique
5. Autorisez la clé

---

### Étape 3: Tester la Connexion SSH

```bash
ssh -i ~/.ssh/github_deploy_ohs VOTRE_USERNAME@VOTRE_DOMAINE.com
```

Si ça fonctionne sans demander de mot de passe, c'est parfait! ✅

---

### Étape 4: Configurer les Secrets GitHub

1. **Allez sur GitHub:**
   https://github.com/samhdd/OHS-Construction/settings/secrets/actions

2. **Cliquez sur "New repository secret"**

3. **Ajoutez les 5 secrets suivants:**

#### Secret 1: SSH_PRIVATE_KEY
```bash
# Sur votre machine locale, affichez la clé privée:
cat ~/.ssh/github_deploy_ohs
```
- **Name:** `SSH_PRIVATE_KEY`
- **Value:** Tout le contenu (y compris les lignes BEGIN et END)

#### Secret 2: SSH_USER
- **Name:** `SSH_USER`
- **Value:** Votre nom d'utilisateur cPanel (exemple: `ohsconst`)

#### Secret 3: SSH_HOST
- **Name:** `SSH_HOST`
- **Value:** Votre domaine ou IP (exemple: `ohs-construction.com`)

#### Secret 4: SSH_PORT
- **Name:** `SSH_PORT`
- **Value:** Port SSH (généralement `22` ou `2222`)

Pour vérifier le port SSH:
```bash
ssh -v VOTRE_USERNAME@VOTRE_DOMAINE.com 2>&1 | grep "Connecting to"
```

#### Secret 5: DEPLOY_PATH
- **Name:** `DEPLOY_PATH`
- **Value:** Chemin complet vers public_html (exemple: `/home/ohsconst/public_html`)

Pour vérifier le chemin:
```bash
ssh VOTRE_USERNAME@VOTRE_DOMAINE.com "pwd && ls -la"
```

---

### Étape 5: Tester le Déploiement

#### Option A: Déploiement Automatique (Push)

1. **Faites un petit changement:**
   ```bash
   cd "/home/sam/Downloads/site web"
   echo "<!-- Test CI/CD -->" >> index.html
   ```

2. **Commitez et poussez:**
   ```bash
   git add index.html
   git commit -m "test: verify CI/CD pipeline"
   git push origin main
   ```

3. **Vérifiez sur GitHub:**
   - Allez sur: https://github.com/samhdd/OHS-Construction/actions
   - Vous devriez voir le workflow "Deploy OHS Construction to cPanel" en cours
   - Attendez le ✅ vert

#### Option B: Déploiement Manuel

1. Allez sur: https://github.com/samhdd/OHS-Construction/actions
2. Cliquez sur "Deploy OHS Construction to cPanel"
3. Cliquez sur "Run workflow"
4. Sélectionnez "main"
5. Cliquez sur "Run workflow"

---

## 🔍 Vérification du Déploiement

Une fois le workflow terminé avec succès:

1. **Vérifiez votre site web:**
   ```
   https://VOTRE_DOMAINE.com
   ```

2. **Vérifiez les fichiers sur le serveur:**
   ```bash
   ssh VOTRE_USERNAME@VOTRE_DOMAINE.com "ls -la ~/public_html"
   ```

Vous devriez voir:
- ✅ index.html
- ✅ apropos.html
- ✅ services.html
- ✅ projets.html
- ✅ contact.html
- ✅ assets/ (dossier)
- ❌ PAS de fichiers .txt
- ❌ PAS de dossiers "projet *"

---

## 🐛 En Cas de Problème

### Erreur: "Permission denied (publickey)"

**Solution:**
```bash
# Vérifiez que la clé publique est bien sur le serveur
ssh VOTRE_USERNAME@VOTRE_DOMAINE.com "cat ~/.ssh/authorized_keys"

# Vérifiez les permissions
ssh VOTRE_USERNAME@VOTRE_DOMAINE.com "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

### Erreur: "Host key verification failed"

**Solution:**
```bash
# Ajoutez le serveur aux known_hosts
ssh-keyscan -H VOTRE_DOMAINE.com >> ~/.ssh/known_hosts
```

### Le workflow ne se déclenche pas

**Vérifiez:**
1. Que vous pushez sur la branche `main`
2. Que le workflow est activé dans Actions
3. Que tous les secrets sont correctement configurés

---

## 📚 Documentation Complète

- **Guide du projet:** [README.md](./README.md)
- **Guide CI/CD détaillé:** [CI-CD.md](./CI-CD.md)

---

## ✅ Checklist Finale

Avant de considérer le CI/CD comme opérationnel:

- [ ] Clé SSH générée
- [ ] Clé publique installée sur le serveur cPanel
- [ ] Connexion SSH testée et fonctionnelle
- [ ] 5 secrets GitHub configurés (SSH_PRIVATE_KEY, SSH_USER, SSH_HOST, SSH_PORT, DEPLOY_PATH)
- [ ] Premier déploiement testé (manuel ou automatique)
- [ ] Site web vérifié en production
- [ ] Fichiers corrects déployés (pas de .txt, pas de projet *)

---

**Une fois tout configuré, chaque `git push origin main` déploiera automatiquement votre site! 🚀**
