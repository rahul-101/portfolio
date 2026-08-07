# 🚀 GitHub Pages Deployment Guide

## Prerequisites
- Git installed on your machine
- GitHub account
- GitHub CLI installed (`gh`) — optional but recommended

---

## Option A: Deploy with GitHub CLI (Recommended — 5 minutes)

### Step 1: Commit All Changes
```bash
cd ~/Documents/Projects/portfolio
git add -A
git commit -m "Premium React portfolio: 3D background, responsive design, enhanced .gitignore"
```

### Step 2: Create Repository on GitHub
If the repo doesn't exist yet:
```bash
gh repo create portfolio --public --source=. --push
```

Or if it already exists:
```bash
git push origin main
```

### Step 3: Build the Project
```bash
npm run build
```

This generates a `dist/` folder with the production build.

### Step 4: Deploy to GitHub Pages
The easiest way is using the `gh-pages` branch. First, install the deployment tool:
```bash
npm install --save-dev gh-pages
```

### Step 5: Add Deploy Scripts to package.json
```bash
# Open package.json and add these scripts under "scripts":
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Example:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 6: Run Deployment
```bash
npm run deploy
```

This automatically:
- Builds the project
- Creates a `gh-pages` branch
- Pushes the `dist/` folder to GitHub Pages

---

## Option B: Manual Deployment (10 minutes)

### Step 1-3: Same as Above
Commit, push, and build locally.

### Step 2: Create `gh-pages` Branch
```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial gh-pages commit"
git push -u origin gh-pages
```

### Step 3: Push Build Files
```bash
git checkout main
git subtree push --prefix dist origin gh-pages
```

---

## Option C: GitHub Actions (Fully Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Every push to `main` will automatically deploy!

---

## Step-by-Step for Your Portfolio (Recommended)

### 1. Open Terminal
```bash
cd ~/Documents/Projects/portfolio
```

### 2. Commit Changes
```bash
git add -A
git commit -m "feat: Premium React portfolio with 3D background and responsive design

- 3D animated background with rotating wireframes
- Time-shifting color palette (12s hue rotation)
- Mobile-first responsive design
- Aligned metric boxes and glassmorphism effects
- Enhanced .gitignore for React/Vite project
- Production build: 106KB gzipped"
```

### 3. Push to GitHub
```bash
git push origin main
```

### 4. Build the Project
```bash
npm run build
```

### 5. Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 6. Update package.json
Add these two lines to the `"scripts"` section:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 7. Deploy!
```bash
npm run deploy
```

### 8. Enable GitHub Pages
1. Go to GitHub → Your Repository → **Settings**
2. Scroll to **Pages** section
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages`
   - **Folder**: Select `/ (root)`
4. Click **Save**

### 9. Access Your Site
After a few seconds, your portfolio will be live at:
```
https://rahul-101.github.io/portfolio
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### Assets Not Loading
- Check that `vite.config.ts` has `base: './'`
- Verify `dist/` folder contains all files

### Page Shows 404
- Wait 1-2 minutes for GitHub to process deployment
- Check repo Settings → Pages shows `gh-pages` branch
- Verify files are in the `gh-pages` branch

### Still Not Working?
```bash
# Force a clean deploy
git push origin --delete gh-pages
npm run deploy
```

---

## Custom Domain (Optional)

To use your own domain (e.g., `rahulbiswas.dev`):

1. Add `CNAME` file to `public/` directory:
```bash
echo "rahulbiswas.dev" > public/CNAME
```

2. In GitHub Settings → Pages, enter your domain in "Custom domain"
3. Update your domain DNS records to point to GitHub Pages

---

## After Deployment

✅ Your portfolio is now live!

To update it in the future:
```bash
# Make changes
git add -A
git commit -m "Update portfolio content"
git push origin main
npm run deploy
```

That's it! 🎉

---

## One-Command Quick Deploy
```bash
git add -A && git commit -m "Portfolio update" && git push origin main && npm run deploy
```
