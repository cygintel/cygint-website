import express, { type Express, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "http";
import httpProxy from 'http-proxy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adapter for integrating Express with Astro in development mode
export async function setupAstroDevServer(app: Express, server: Server) {
  // Create a proxy for Astro dev server
  const astroProxy = httpProxy.createProxyServer({
    target: 'http://localhost:4321', // Default Astro dev server port
    ws: true,
    changeOrigin: true,
  });
  
  // Log proxied requests
  astroProxy.on('error', (err: Error) => {
    console.error('Proxy error:', err);
  });
  
  // Proxy all non-API requests to Astro dev server
  app.all('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    astroProxy.web(req, res);
  });
  
  // Proxy WebSocket connections
  server.on('upgrade', (req, socket, head) => {
    astroProxy.ws(req, socket, head);
  });
}

// Function to serve static Astro files in production
export function serveAstroStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "client");
  
  app.use(express.static(distPath, {
    index: false // Don't serve index.html for all routes
  }));
  
  // Serve index.html for all routes except API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}