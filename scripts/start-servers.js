#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Starting development servers...');

// Start Astro dev server
const astroServer = spawn('node', ['scripts/start-astro-dev.js'], {
  stdio: 'inherit',
  shell: true
});

// Start Express server
const expressServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

// Handle Astro server exit
astroServer.on('close', (code) => {
  console.log(`Astro server exited with code ${code}`);
  expressServer.kill();
  process.exit(code);
});

// Handle Express server exit
expressServer.on('close', (code) => {
  console.log(`Express server exited with code ${code}`);
  astroServer.kill();
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  astroServer.kill();
  expressServer.kill();
  process.exit(0);
});