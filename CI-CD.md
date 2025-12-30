# CI/CD Pipeline: GitHub Actions to cPanel (FTP Deployment)

Documentation for the **automated CI/CD pipeline** deploying the **OHS CONSTRUCTION** website to a **cPanel** server via **FTP**.

---

## Table of Contents

1. [Architecture](#1-architecture-diagram)
2. [Repository Structure](#2-repository-structure)
3. [Prerequisites](#3-prerequisites)
4. [GitHub Secrets](#4-github-secrets-configuration)
5. [GitHub Actions Workflow](#5-github-actions-workflow)
6. [Deployment Operations](#6-deployment-steps-operational-flow)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Architecture Diagram

```text
Developer (Local)
  │
  │ git push (main)
  ▼
GitHub Repository
  │
  │ triggers workflow
  ▼
GitHub Actions Runner
  │
  ├─ Checkout code
  └─ Deploy via FTP (SamKirkland Action)
  ▼
cPanel Server
  └─ /home/USERNAME/public_html
```

---

## 2. Repository Structure

```text
ohs-construction/
├── .github/
│   └── workflows/
│       └── deploy.yml          # FTP Deployment Workflow
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── *.html                      # Website Pages
├── README.md                   # Main Documentation
└── CI-CD.md                    # This File
```

**Important:** All files in the root and `assets/` directories will be deployed, excluding documentation and configuration files.

---

## 3. Prerequisites

### cPanel Server

- Valid FTP Account (Username and Password)
- FTP Server Address (e.g., `ftp.your-domain.com` or IP address)
- Target Directory (usually `/public_html/`)

### GitHub

- Created Repository
- Access to Repository Secrets

---

## 4. GitHub Secrets Configuration

The following secrets must be configured in `Repository -> Settings -> Secrets and variables -> Actions`:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `FTP_SERVER` | FTP Server Address | `ftp.ohs-construction.com` |
| `FTP_USERNAME` | FTP Username | `user@ohs-construction.com` |
| `FTP_PASSWORD` | FTP Password | `******` |

---

## 5. GitHub Actions Workflow

The file `.github/workflows/deploy.yml` utilizes `SamKirkland/FTP-Deploy-Action`. This action is an industry standard for synchronizing files via FTP/FTPS.

```yaml
name: Deploy OHS Construction via FTP

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  web-deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Sync files via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: /public_html/
          exclude: |
            **/.git*
            **/.github*/**
            **/node_modules/**
            CI-CD.md
            README.md
            NEXT-STEPS.md
            .gitignore
```

---

## 6. Deployment Operations

### Routine Workflow

1. **Modify files locally**
2. **Test locally** (`python3 -m http.server 8080`)
3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: content update"
   ```
4. **Push to GitHub**
   ```bash
   git push origin main
   ```
5. **Verify deployment** in the "Actions" tab on GitHub

### Manual Deployment

1. Go to the **Actions** tab
2. Select the workflow **Deploy OHS Construction via FTP**
3. Click **Run workflow**

---

## 7. Troubleshooting

### Error: "Timeout" or "Connection refused"

- Verify `FTP_SERVER` address is correct.
- Ensure the server firewall allows connections from GitHub IPs (usually allowed for standard shared hosting).

### Error: "Login failed"

- Check `FTP_USERNAME` and `FTP_PASSWORD`.
- Note: FTP usernames often require the full structure `user@domain.com`.

### Files not updating

- Browser cache may be holding old versions. Test in Incognito/Private mode.
- Verify `server-dir` points to `/public_html/` correctly.

---

## License

Internal Documentation - OHS CONSTRUCTION
