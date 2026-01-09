# Quick Start: Connect Database to GitHub

## Prerequisites Checklist
- [ ] Git installed (download from: https://git-scm.com/download/win)
- [ ] GitHub account created
- [ ] Firebase project set up
- [ ] .env file configured with Firebase credentials

## Quick Commands

### 1. Install Git
Download and install from: https://git-scm.com/download/win

### 2. Configure Git (First Time Only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Initialize Repository
```powershell
cd C:\Users\Admin\Desktop\BLE\nirajfy
git init
git add .
git commit -m "Initial commit"
```

### 4. Create GitHub Repository
1. Go to: https://github.com/new
2. Name: `nirajfy`
3. Don't initialize with README
4. Click "Create repository"

### 5. Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/nirajfy.git
git branch -M main
git push -u origin main
```

## Important Files Created

✅ `.gitignore` - Updated to exclude .env file
✅ `.env.example` - Template for environment variables
✅ `README.md` - Complete project documentation
✅ `GITHUB_SETUP_GUIDE.md` - Detailed setup instructions
✅ `.github/workflows/deploy.yml` - Auto-deployment workflow

## Security Reminder

⚠️ **CRITICAL**: Your `.env` file is now protected!
- It's listed in `.gitignore`
- It will NOT be committed to GitHub
- Your Firebase API keys are safe

## Next Steps

1. Install Git (if not already installed)
2. Follow commands above
3. Read `GITHUB_SETUP_GUIDE.md` for detailed instructions
4. Set up GitHub Secrets for deployment (optional)

## Daily Git Commands

```powershell
git status              # Check what changed
git add .               # Stage all changes
git commit -m "message" # Commit with message
git push                # Push to GitHub
git pull                # Get latest changes
```

---

Need detailed help? Read: `GITHUB_SETUP_GUIDE.md`
