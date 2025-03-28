#!/usr/bin/env node

import { spawn } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Run both the Express API server and Astro dev server in parallel
console.log('Starting Astro development server...');

// First start the Astro dev server
const astroServer = spawn('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321'], {
  cwd: rootDir,
  stdio: 'inherit'
});

// Wait briefly for Astro server to start
setTimeout(() => {
  console.log('Starting Express API server...');
  
  // Then start the Express API server which will proxy requests to Astro
  const apiServer = spawn('node', ['--loader', 'tsx', 'server/index.ts'], {
    cwd: rootDir,
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'development',
      PORT: '5000' 
    }
  });

  // Handle cleanup on exit
  const cleanup = () => {
    console.log('\nShutting down servers...');
    apiServer.kill();
    astroServer.kill();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  // Handle process errors
  apiServer.on('error', (err) => {
    console.error('API Server error:', err);
    cleanup();
  });

  astroServer.on('error', (err) => {
    console.error('Astro Server error:', err);
    cleanup();
  });

  // Handle process exit
  apiServer.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`API Server exited with code ${code}`);
      cleanup();
    }
  });

  astroServer.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Astro Server exited with code ${code}`);
      cleanup();
    }
  });
}, 3000); // Wait 3 seconds for Astro to start