import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Use 'static' for GitHub Pages
  site: 'https://cygint.co', // Your actual production site URL
  integrations: [
    tailwind(),
    react()
  ],
  server: {
    host: '0.0.0.0',
    port: 4321
  }
});