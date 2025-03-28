#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Starting Astro dev server...');

// Start Astro dev server
const astroServer = spawn('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: 'true' // Disable telemetry for faster startup
  }
});

astroServer.on('close', (code) => {
  console.log(`Astro server exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  astroServer.kill();
  process.exit(0);
});