#!/usr/bin/env node

// This script ensures that a .nojekyll file exists in the dist directory
// to prevent GitHub Pages from processing the site with Jekyll

import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

try {
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run build command first.');
    process.exit(1);
  }

  // Create .nojekyll file in dist directory
  const nojekyllPath = path.join(distDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('Created .nojekyll file in dist directory');
} catch (error) {
  console.error('Error creating .nojekyll file:', error);
  process.exit(1);
}