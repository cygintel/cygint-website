/**
 * This script ensures that a .nojekyll file exists in the dist directory
 * to prevent GitHub Pages from using Jekyll to process the site.
 */

const fs = require('fs');
const path = require('path');

// The directory where the built site is located
const distDir = path.resolve(process.cwd(), 'dist');

// Create .nojekyll file if it doesn't exist
const nojekyllPath = path.join(distDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  // Make sure the dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Create an empty .nojekyll file
  fs.writeFileSync(nojekyllPath, '');
  console.log('.nojekyll file created successfully');
} else {
  console.log('.nojekyll file already exists');
}

// Copy CNAME file to dist directory if it exists in the root
const rootCnamePath = path.resolve(process.cwd(), 'CNAME');
const distCnamePath = path.join(distDir, 'CNAME');

if (fs.existsSync(rootCnamePath)) {
  fs.copyFileSync(rootCnamePath, distCnamePath);
  console.log('CNAME file copied to dist directory');
} else {
  console.log('No CNAME file found in root directory');
}