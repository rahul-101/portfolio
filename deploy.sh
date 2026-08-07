#!/bin/bash
set -e

echo "🚀 Starting deployment..."
echo ""

# Build the project
echo "📦 Building project..."
npm run build

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "✓ Current branch: $CURRENT_BRANCH"
echo ""

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🌿 gh-pages branch exists, switching to it..."
    git checkout gh-pages
    # Remove all files except .git
    git rm -rf .
else
    echo "🌱 Creating new gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Copy built files from dist
echo "📋 Copying built files..."
cp -r ../portfolio-dist-temp/* .
git add -A

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push
echo "☁️  Pushing to GitHub..."
git push -f origin gh-pages

# Return to original branch
echo "🔙 Returning to $CURRENT_BRANCH branch..."
git checkout $CURRENT_BRANCH

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site will be live at: https://rahul-101.github.io/portfolio"
