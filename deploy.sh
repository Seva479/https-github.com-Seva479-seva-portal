#!/usr/bin/env bash
set -e

echo "=== Configuring Git Environment ==="
git config --global --add safe.directory /app/applet || true
git config --global user.name "SEVA Tech Team" || true
git config --global user.email "seva.ecology@gmail.com" || true

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git branch -M main
  git remote add origin https://github.com/Seva479/seva-portal.git || true
  git fetch origin main --depth=1 || true
  git reset --soft origin/main || true
fi

git config user.name "SEVA Tech Team"
git config user.email "seva.ecology@gmail.com"

echo "=== Staging and Committing Source Changes to main ==="
git add -A
if ! git diff-index --quiet HEAD --; then
  git commit -m "fix(mobile): full mobile version overhaul with thumb bottom nav, pillar cards, and cache-busting"
fi

echo "=== Building SEVA Production Site ==="
npm run build
cp dist/index.html dist/404.html
echo "sevavillage.org" > dist/CNAME
touch dist/.nojekyll

echo "=== Production build ready in dist/ ==="
if [ -n "$GITHUB_TOKEN" ]; then
  echo "Pushing main branch to GitHub..."
  git push https://${GITHUB_TOKEN}@github.com/Seva479/seva-portal.git main
  
  # Deploy dist/ to gh-pages branch
  echo "Deploying dist/ to gh-pages branch..."
  cd dist
  rm -rf .git
  git init
  git config user.name "SEVA Tech Team"
  git config user.email "seva.ecology@gmail.com"
  git branch -M gh-pages
  git add -A
  git commit -m "Deploy latest production build with full mobile navigation and responsive pillar cards"
  git push -f https://${GITHUB_TOKEN}@github.com/Seva479/seva-portal.git gh-pages
  cd ..
  echo "=== Successfully pushed to main and gh-pages! ==="
else
  echo "To push automatically, run: GITHUB_TOKEN=your_token ./deploy.sh"
  echo "Or manually push:"
  echo "  git push origin main"
fi
