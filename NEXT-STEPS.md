# OHS Construction - FTP Deployment Activation

## Strategy Update: FTP

The CI/CD pipeline has been configured to use **FTP** for deployment.

---

## Final Verification Steps

### 1. GitHub Secrets

Ensure the following secrets are configured in GitHub:
* `FTP_SERVER`
* `FTP_USERNAME`
* `FTP_PASSWORD`

**Verification:**
- **FTP_USERNAME**: Ensure it includes the full identifier (often `user@domain.com` on cPanel).
- **FTP_SERVER**: Ensure it is the correct hostname or IP address.

### 2. Deployment Test

The `deploy.yml` workflow has been updated. The next git push will trigger a deployment attempt.

#### Option A: Push Configuration Changes (Recommended)

Commit and push the updated documentation and workflow files:

```bash
git add .
git commit -m "chore: update CI/CD configuration to professional FTP setup"
git push origin main
```

#### Option B: Manual Deployment

1. Navigate to the GitHub **Actions** tab.
2. Select **Deploy OHS Construction via FTP**.
3. Click **Run workflow**.

---

## Validation

Upon workflow completion (Green checkmark):

1. Visit the website: `https://ohs-construction.com`
2. specific content updates are reflected.

---

## Troubleshooting

If the workflow fails:
* **Login Issue**: Verify username and password credentials.
* **Connection Issue**: Verify the FTP server address.
* **Directory Issue**: The workflow is configured for `/public_html/`. If your site resides in a subdirectory, update `server-dir` in `.github/workflows/deploy.yml`.

---
**The website is configured for continuous deployment via FTP.**
