# GitHub Pages Deployment Guide

This guide explains the configuration for deploying this Astro project to GitHub Pages.

## Key Configuration Changes

1. **Base Path Configuration**

   In `astro.config.mjs`, we've added:
   ```js
   base: "/cygint",
   ```
   This configures the project to work at the URL `https://cygintel.github.io/cygint/`.

2. **Path Updates**

   All internal links are updated to use the base path:
   ```js
   // Instead of
   <a href="/">Home</a>
   
   // We now use
   <a href={import.meta.env.BASE_URL}>Home</a>
   ```

3. **Asset URLs**

   All asset URLs in JSON data files have been prefixed with the `/cygint` base path.

4. **GitHub Actions Workflow**

   The workflow in `.github/workflows/deploy.yml` handles:
   - Building the project
   - Creating a `.nojekyll` file (prevents Jekyll processing)
   - Deploying to GitHub Pages

5. **Static Data**

   Using static JSON files in `/public/data/` instead of API endpoints for GitHub Pages deployment.

## Deployment Process

The deployment is handled automatically by GitHub Actions when you push to the main branch.

## Local Development

For local development, you can run:
```
npm run dev
```

When running locally, the base path is automatically managed by Astro.

## Troubleshooting

If you encounter 404 errors:
1. Make sure the `.nojekyll` file is present
2. Check if the repository settings are correctly configured for GitHub Pages
3. Verify all internal links use the `import.meta.env.BASE_URL` prefix