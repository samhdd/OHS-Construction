# CI/CD Pipeline: GitHub Actions → cPanel (SSH Deployment)

Documentation du pipeline **CI/CD automatisé** pour le déploiement du site web **OHS CONSTRUCTION** vers un serveur **cPanel** via **GitHub Actions et SSH**.

Ce document est opérationnel et concis. Pas de théorie, uniquement ce dont vous avez besoin pour configurer et exécuter le pipeline.

---

## 📋 Table des Matières

1. [Architecture](#1-architecture-diagram)
2. [Structure du Repository](#2-repository-structure)
3. [Prérequis](#3-prerequisites)
4. [Configuration SSH](#4-ssh-key-setup)
5. [Secrets GitHub](#5-github-secrets-configuration)
6. [Workflow GitHub Actions](#6-github-actions-workflow)
7. [Flux de Déploiement](#7-deployment-steps-operational-flow)
8. [Résultat](#8-result)
9. [Dépannage](#9-troubleshooting)
10. [Notes Importantes](#10-notes)

---

## 1. Architecture Diagram

```text
Développeur (Local)
  │
  │ git push (main)
  ▼
GitHub Repository
  │
  │ déclenche le workflow
  ▼
GitHub Actions Runner
  │
  ├─ Checkout du code
  ├─ Validation (optionnel)
  └─ Déploiement via SSH (rsync)
  ▼
Serveur cPanel
  └─ /home/USERNAME/public_html
      └─ Site web OHS CONSTRUCTION en production
```

---

## 2. Repository Structure

```text
ohs-construction/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de déploiement
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── *.html                      # Pages du site
├── README.md                   # Documentation principale
└── CI-CD.md                    # Ce fichier
```

**Important:** Tous les fichiers à la racine et dans `assets/` seront déployés.

---

## 3. Prerequisites

### ✅ Serveur cPanel

- [x] Accès SSH activé (via cPanel → SSH Access)
- [x] Nom d'utilisateur cPanel connu
- [x] Répertoire web racine:
  ```text
  /home/USERNAME/public_html
  ```
- [x] Port SSH (généralement 22 ou 2222)

**Vérifier l'accès SSH:**
```bash
ssh USERNAME@votre-domaine.com -p 22
```

### ✅ Machine Locale

- [x] Git installé
- [x] Client SSH (OpenSSH)
- [x] Accès au repository GitHub

### ✅ GitHub

- [x] Repository créé (public ou privé)
- [x] Accès aux paramètres du repository
- [x] Permissions pour ajouter des secrets

---

## 4. SSH Key Setup

### Étape 1: Générer une clé de déploiement

Sur votre machine locale:

```bash
ssh-keygen -t ed25519 -C "github-actions-ohs-construction" -f ~/.ssh/github_deploy_ohs
```

**Ne pas** définir de passphrase (appuyez sur Entrée).

Vous obtiendrez:
- **Clé privée:** `~/.ssh/github_deploy_ohs`
- **Clé publique:** `~/.ssh/github_deploy_ohs.pub`

### Étape 2: Installer la clé publique sur le serveur

1. **Afficher la clé publique:**
   ```bash
   cat ~/.ssh/github_deploy_ohs.pub
   ```

2. **Se connecter au serveur cPanel via SSH:**
   ```bash
   ssh USERNAME@votre-domaine.com
   ```

3. **Ajouter la clé publique:**
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   echo "VOTRE_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

4. **Tester la connexion:**
   ```bash
   ssh -i ~/.ssh/github_deploy_ohs USERNAME@votre-domaine.com
   ```

### Étape 3: Récupérer la clé privée

```bash
cat ~/.ssh/github_deploy_ohs
```

**Copiez tout le contenu** (y compris `-----BEGIN OPENSSH PRIVATE KEY-----` et `-----END OPENSSH PRIVATE KEY-----`)

---

## 5. GitHub Secrets Configuration

### Ajouter les secrets

Allez dans:
```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

Créez les secrets suivants:

| Nom Secret        | Valeur                                    | Exemple                          |
|-------------------|-------------------------------------------|----------------------------------|
| `SSH_PRIVATE_KEY` | Contenu complet de la clé privée          | `-----BEGIN OPENSSH...`          |
| `SSH_USER`        | Nom d'utilisateur cPanel                  | `ohsconst`                       |
| `SSH_HOST`        | Domaine ou IP du serveur                  | `ohs-construction.com`           |
| `SSH_PORT`        | Port SSH (généralement 22)                | `22`                             |
| `DEPLOY_PATH`     | Chemin de déploiement sur le serveur      | `/home/ohsconst/public_html`     |

**⚠️ Sécurité:** Ne partagez jamais `SSH_PRIVATE_KEY` publiquement.

---

## 6. GitHub Actions Workflow

### Créer le fichier de workflow

Créez le fichier: `.github/workflows/deploy.yml`

```yaml
name: Deploy OHS Construction to cPanel

on:
  push:
    branches: ["main"]
  workflow_dispatch:  # Permet le déclenchement manuel

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout repository
        uses: actions/checkout@v4

      - name: 🔧 Configure SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: 🚀 Deploy files to cPanel
        run: |
          rsync -avz --delete \
            -e "ssh -p ${{ secrets.SSH_PORT }}" \
            --exclude='.git' \
            --exclude='.github' \
            --exclude='CI-CD.md' \
            --exclude='README.md' \
            --exclude='*.txt' \
            ./ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}

      - name: ✅ Deployment successful
        run: echo "🎉 Site deployed successfully to ${{ secrets.SSH_HOST }}"
```

### Explications des options rsync

- `-a` : Mode archive (préserve permissions, timestamps)
- `-v` : Verbose (affiche les fichiers transférés)
- `-z` : Compression pendant le transfert
- `--delete` : Supprime les fichiers sur le serveur qui n'existent plus localement
- `--exclude` : Exclut certains fichiers/dossiers du déploiement

---

## 7. Deployment Steps (Operational Flow)

### Workflow Quotidien

1. **Modifier les fichiers du site localement**
   ```bash
   # Exemple: éditer index.html
   code index.html
   ```

2. **Tester localement**
   ```bash
   python3 -m http.server 8080
   # Ouvrir http://localhost:8080
   ```

3. **Commiter les changements**
   ```bash
   git add .
   git commit -m "feat: ajout section services avec images"
   ```

4. **Pousser vers GitHub**
   ```bash
   git push origin main
   ```

5. **Vérifier le déploiement**
   - Allez dans `Actions` sur GitHub
   - Vérifiez que le workflow s'exécute
   - Attendez le ✅ vert

6. **Vérifier le site en production**
   ```
   https://ohs-construction.com
   ```

### Déploiement Manuel (via GitHub)

Si vous voulez déclencher un déploiement sans push:

1. Allez dans `Actions` sur GitHub
2. Sélectionnez `Deploy OHS Construction to cPanel`
3. Cliquez sur `Run workflow`
4. Sélectionnez la branche `main`
5. Cliquez sur `Run workflow`

---

## 8. Result

### ✅ Avantages du Pipeline

- ✅ **Déploiement automatique** - Chaque push sur `main` déploie automatiquement
- ✅ **Pas de FTP manuel** - Fini les uploads manuels fastidieux
- ✅ **Traçabilité complète** - Historique de tous les déploiements
- ✅ **Rollback facile** - Revenez à une version précédente via Git
- ✅ **Validation avant déploiement** - Possibilité d'ajouter des tests
- ✅ **Déploiement rapide** - rsync ne transfère que les fichiers modifiés

### 📊 Temps de Déploiement

- **Premier déploiement:** ~2-3 minutes (tous les fichiers)
- **Déploiements suivants:** ~30-60 secondes (fichiers modifiés uniquement)

---

## 9. Troubleshooting

### ❌ Erreur: "Permission denied (publickey)"

**Cause:** La clé SSH n'est pas correctement configurée.

**Solution:**
```bash
# Vérifier que la clé publique est dans authorized_keys sur le serveur
ssh USERNAME@HOST "cat ~/.ssh/authorized_keys"

# Vérifier les permissions
ssh USERNAME@HOST "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

### ❌ Erreur: "Host key verification failed"

**Cause:** Le serveur n'est pas dans known_hosts.

**Solution:** Le workflow inclut déjà `ssh-keyscan`. Si le problème persiste:
```bash
# Localement, ajoutez manuellement le host
ssh-keyscan -H votre-domaine.com >> ~/.ssh/known_hosts
```

### ❌ Erreur: "rsync: failed to connect"

**Cause:** Port SSH incorrect ou serveur inaccessible.

**Solution:**
1. Vérifiez le port SSH dans les secrets GitHub
2. Testez la connexion manuellement:
   ```bash
   ssh -p PORT USERNAME@HOST
   ```

### ❌ Le workflow ne se déclenche pas

**Cause:** Branche incorrecte ou workflow désactivé.

**Solution:**
1. Vérifiez que vous pushez sur `main`
2. Allez dans `Actions` → Vérifiez que le workflow est activé

### 🔍 Logs de Débogage

Pour voir les logs détaillés:
1. Allez dans `Actions` sur GitHub
2. Cliquez sur le workflow en cours/échoué
3. Cliquez sur `deploy` job
4. Consultez chaque étape

---

## 10. Notes

### 📌 Points Importants

- **Type de pipeline:** Push-based CI/CD (déploiement à chaque push)
- **Protocole:** SSH + rsync (fiable et éprouvé en production)
- **Sécurité:** Clés SSH dédiées, secrets GitHub chiffrés
- **Compatibilité:** Fonctionne avec tous les hébergeurs cPanel avec SSH

### 🚀 Améliorations Futures (Optionnel)

Vous pouvez améliorer le pipeline avec:

1. **Tests automatisés:**
   ```yaml
   - name: Validate HTML
     run: |
       npm install -g html-validator-cli
       html-validator --file=index.html
   ```

2. **Optimisation d'images:**
   ```yaml
   - name: Optimize images
     run: |
       npm install -g imagemin-cli
       imagemin assets/images/* --out-dir=assets/images/
   ```

3. **Notifications Slack/Discord:**
   ```yaml
   - name: Notify deployment
     uses: 8398a7/action-slack@v3
     with:
       status: ${{ job.status }}
       webhook_url: ${{ secrets.SLACK_WEBHOOK }}
   ```

4. **Déploiement par environnement:**
   - `main` → Production
   - `staging` → Environnement de test

### 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [rsync Manual](https://linux.die.net/man/1/rsync)
- [cPanel SSH Access Guide](https://docs.cpanel.net/knowledge-base/ssh/how-to-use-ssh/)

---

## 📝 License

MIT - Documentation CI/CD pour OHS CONSTRUCTION

---

**Dernière mise à jour:** Décembre 2025  
**Maintenu par:** Équipe DevOps OHS Construction
