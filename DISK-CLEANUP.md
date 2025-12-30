# Hosting Disk Cleanup Guide

**Critical Issue:** Your deployment failed with `FTPError: 552 Disk full`.
This means your hosting account `/home/ohsconst/` has no free space left.

Based on your directory structure, here is where you should look to free up space using the **cPanel File Manager**:

## 1. Primary Cleanup Targets (Safe to Delete)

### `.trash/`
- **Action**: Delete everything inside this folder.
- **Why**: This contains files you previously deleted but didn't permanently remove.

### `tmp/`
- **Action**: Check for large session files or error logs. Delete old files.
- **Warning**: Do not delete the folder itself, only contents.

### `logs/`
- **Action**: Delete old archive logs (e.g., `access_log.gz`, `error_log`).
- **Why**: Logs can grow very large over time.

### `public_html/error_log`
- **Action**: Look specifically for a file named `error_log` inside `public_html`. It can sometimes be GBs in size. Delete it.

## 2. Mail Cleanup (Often the largest usage)

### `mail/`
- **Action**: You likely have accumulating emails in `Trash` or `Sent` folders.
- **How to clean**:
  1. Go to cPanel -> **Email Disk Usage**.
  2. Select your email account.
  3. Click "Manage" next to Trash/Sent/Spam and select "Delete all messages".

## 3. Backups

### `softaculous_backups` (if exists) or root backups
- Check if you have old `.zip` or `.tar.gz` backup files sitting in your root directory `/home/ohsconst/`. Download them to your computer and delete them from the server.

---

## Verification

After deleting files:
1. Check the "Disk Usage" bar on the main cPanel dashboard.
2. Ensure you have at least **50-100 MB** free before retrying the deployment.
