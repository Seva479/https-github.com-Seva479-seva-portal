#!/usr/bin/env bash
set -e

echo "=== Staging and Committing Source Changes to main ==="
git add src/
if ! git diff-index --quiet HEAD --; then
  git commit -m "fix(mobile): apply high-contrast dark green emblem logo, structured icon pillar cards, and admin data backup/restore"
fi

echo "=== Building SEVA Production Site ==="
npm run build
cp dist/index.html dist/404.html

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
  git commit -m "Deploy latest production build with dark green emblem and robust mobile layout"
  git push -f https://${GITHUB_TOKEN}@github.com/Seva479/seva-portal.git gh-pages
  cd ..
  echo "=== Successfully pushed to main and gh-pages! ==="
else
  echo "To push automatically, run: GITHUB_TOKEN=your_token ./deploy.sh"
  echo "Or manually push:"
  echo "  git push origin main"
fi
