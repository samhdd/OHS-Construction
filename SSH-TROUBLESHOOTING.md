# 🔧 SSH Connection Troubleshooting - OHS Construction

## ❌ Problème Détecté

**Erreur:** `Connection refused` sur le port SSH 22

```
ssh: connect to host ohs-construction.com port 22: Connection refused
```

## 📊 Diagnostic Effectué

✅ **Serveur accessible:** IP `65.21.166.134`  
✅ **cPanel actif:** Port 2083 (HTTPS) répond  
✅ **Site web en ligne:** http://ohs-construction.com fonctionne  
❌ **SSH fermé:** Aucun port SSH standard n'est ouvert (22, 2222, 21098, 2020, 2121)

**Conclusion:** SSH n'est **pas activé** ou est configuré sur un **port non-standard**.

---

## 🛠️ Solutions Possibles

### Solution 1: Activer SSH via cPanel ⭐ (Recommandé)

#### Étape 1: Se connecter à cPanel

Accédez à votre panneau cPanel:
```
https://ohs-construction.com:2083
```

**Identifiants:**
- Utilisateur: `ohsconst` (ou votre username cPanel)
- Mot de passe: Votre mot de passe cPanel

#### Étape 2: Activer l'Accès SSH

1. **Cherchez "SSH Access"** dans la barre de recherche cPanel
2. Ou allez dans **Security → SSH Access**
3. Cliquez sur **"Manage SSH Keys"**
4. Si SSH est désactivé, activez-le

#### Étape 3: Vérifier le Port SSH

Dans la section SSH Access, cherchez:
- **SSH Port:** Le numéro de port (peut être différent de 22)
- **SSH Host:** Le nom d'hôte à utiliser

#### Étape 4: Tester la Connexion

Une fois SSH activé, testez avec le bon port:
```bash
ssh -p PORT_NUMBER ohsconst@ohs-construction.com
```

Exemples:
```bash
ssh -p 2222 ohsconst@ohs-construction.com
ssh -p 21098 ohsconst@ohs-construction.com
```

---

### Solution 2: Contacter l'Hébergeur

Si vous ne trouvez pas l'option SSH dans cPanel, contactez votre hébergeur.

#### Informations à Demander:

1. **SSH est-il activé** pour mon compte?
2. **Quel est le port SSH** à utiliser?
3. **Quel est le nom d'utilisateur SSH** (peut différer du username cPanel)?
4. **Dois-je whitelister mon IP** pour accéder en SSH?
5. **Y a-t-il des restrictions** sur l'accès SSH?

#### Hébergeurs Courants et Leurs Politiques:

**Hostinger:**
- SSH disponible sur plans Business et supérieurs
- Port: Généralement 65002
- Activation: Via panneau Hostinger

**OVH:**
- SSH disponible sur tous les plans
- Port: 22 (standard)
- Activation: Automatique

**o2switch:**
- SSH disponible sur tous les plans
- Port: 22
- Activation: Via cPanel

**Infomaniak:**
- SSH disponible sur plans avancés
- Port: Variable selon serveur
- Activation: Via manager Infomaniak

---

### Solution 3: Utiliser FTP au Lieu de SSH 📁

Si SSH ne peut pas être activé, utilisez le déploiement FTP.

#### Étape 1: Obtenir les Identifiants FTP

Dans cPanel:
1. Allez dans **Files → FTP Accounts**
2. Notez vos identifiants FTP:
   - **Serveur FTP:** `ohs-construction.com` ou `ftp.ohs-construction.com`
   - **Utilisateur:** `ohsconst` (ou votre username)
   - **Port:** 21 (FTP) ou 22 (SFTP si disponible)

#### Étape 2: Configurer les Secrets GitHub pour FTP

Allez sur: https://github.com/samhdd/OHS-Construction/settings/secrets/actions

Ajoutez ces secrets:

| Secret Name      | Valeur                          |
|------------------|---------------------------------|
| `FTP_SERVER`     | `ohs-construction.com`          |
| `FTP_USERNAME`   | Votre username FTP              |
| `FTP_PASSWORD`   | Votre mot de passe FTP          |

#### Étape 3: Activer le Workflow FTP

Le fichier `.github/workflows/deploy-ftp.yml` a été créé.

Pour l'activer:

1. **Désactiver le workflow SSH:**
   ```bash
   cd "/home/sam/Downloads/site web"
   mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
   ```

2. **Activer le workflow FTP:**
   ```bash
   mv .github/workflows/deploy-ftp.yml .github/workflows/deploy.yml
   ```

3. **Commiter et pousser:**
   ```bash
   git add .github/workflows/
   git commit -m "chore: switch to FTP deployment"
   git push origin main
   ```

---

### Solution 4: Vérifier les Restrictions IP

Certains hébergeurs limitent SSH à des IPs spécifiques.

#### Vérifier Votre IP Publique:

```bash
curl ifconfig.me
```

#### Whitelister l'IP dans cPanel:

1. Allez dans **Security → IP Blocker** ou **SSH Access**
2. Ajoutez votre IP à la liste blanche
3. Réessayez la connexion SSH

**Note:** GitHub Actions utilise des IPs dynamiques, donc cette solution ne fonctionnera que pour vos tests locaux.

---

## 🧪 Tests de Diagnostic

### Test 1: Vérifier si un Port SSH Personnalisé est Ouvert

```bash
# Scanner les ports SSH courants
for port in 22 2222 21098 2020 2121 65002; do
  echo "Testing port $port..."
  nc -zv ohs-construction.com $port 2>&1 | grep -q succeeded && echo "✅ Port $port OPEN" || echo "❌ Port $port closed"
done
```

### Test 2: Vérifier les Services Disponibles

```bash
# Vérifier cPanel
curl -I https://ohs-construction.com:2083 2>&1 | grep "HTTP"

# Vérifier FTP
nc -zv ohs-construction.com 21 2>&1
```

### Test 3: Vérifier les DNS et Connectivité

```bash
# Résolution DNS
dig ohs-construction.com +short

# Ping
ping -c 3 ohs-construction.com

# Traceroute
traceroute ohs-construction.com
```

---

## 📋 Checklist de Résolution

- [ ] Connexion à cPanel réussie
- [ ] Section SSH Access trouvée dans cPanel
- [ ] SSH activé (si option disponible)
- [ ] Port SSH identifié
- [ ] Test de connexion SSH réussi
- [ ] Clé SSH générée (si SSH fonctionne)
- [ ] Clé publique installée sur le serveur
- [ ] Secrets GitHub configurés
- [ ] Premier déploiement testé

**OU (si SSH impossible):**

- [ ] Identifiants FTP obtenus
- [ ] Test de connexion FTP réussi
- [ ] Secrets FTP configurés dans GitHub
- [ ] Workflow FTP activé
- [ ] Premier déploiement FTP testé

---

## 🆘 Besoin d'Aide?

### Informations à Fournir:

Si vous contactez le support, ayez ces informations:

1. **Nom de l'hébergeur:** (Hostinger, OVH, o2switch, etc.)
2. **Type de plan:** (Shared, VPS, Dedicated)
3. **Nom de domaine:** ohs-construction.com
4. **Username cPanel:** ohsconst
5. **Erreur exacte:** Connection refused on port 22

### Ressources Utiles:

- [Documentation cPanel SSH](https://docs.cpanel.net/knowledge-base/ssh/)
- [GitHub Actions FTP Deploy](https://github.com/SamKirkland/FTP-Deploy-Action)
- [Troubleshooting SSH](https://www.ssh.com/academy/ssh/troubleshooting)

---

## 📝 Prochaines Étapes

**Une fois SSH activé ou FTP configuré:**

1. Retournez au fichier `NEXT-STEPS.md`
2. Suivez les étapes de configuration
3. Testez le déploiement

**Le CI/CD sera opérationnel dès que l'accès distant (SSH ou FTP) sera configuré!** 🚀
