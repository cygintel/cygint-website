import { spawn } from 'child_process';
import http from 'http';

console.log('Starting development servers...');

// Start Astro dev server
const astroServer = spawn('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: 'true' // Disable telemetry for faster startup
  }
});

// Track if Astro has started
let astroStarted = false;

// Poll to check if Astro is running
const checkAstro = () => {
  const req = http.request({
    hostname: 'localhost',
    port: 4321,
    path: '/',
    method: 'HEAD',
    timeout: 1000
  }, (res) => {
    if (!astroStarted) {
      console.log('Astro dev server is running, starting Express server...');
      astroStarted = true;
      
      // Start Express server
      const expressServer = spawn('npx', ['tsx', 'server/index.ts'], {
        stdio: 'inherit',
        shell: true,
        env: {
          ...process.env,
          NODE_ENV: 'development'
        }
      });
      
      expressServer.on('close', (code) => {
        console.log(`Express server exited with code ${code}`);
        if (astroServer && !astroServer.killed) {
          astroServer.kill();
        }
        process.exit(code);
      });
    }
  });
  
  req.on('error', () => {
    // Astro not ready yet, try again in 1 second
    if (!astroStarted) {
      setTimeout(checkAstro, 1000);
    }
  });
  
  req.end();
};

// Start checking after 2 seconds to give Astro time to start
setTimeout(checkAstro, 2000);

// Handle Astro close
astroServer.on('close', (code) => {
  console.log(`Astro server exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  if (astroServer && !astroServer.killed) {
    astroServer.kill();
  }
  process.exit(0);
});