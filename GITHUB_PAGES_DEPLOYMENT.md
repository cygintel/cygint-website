# GitHub Pages Deployment Guide with Custom Domain

This guide explains the configuration for deploying this Astro project to GitHub Pages with a custom domain.

## Key Configuration Changes

1. **Site URL Configuration**

   In `astro.config.mjs`, we've configured:
   ```js
   site: "https://cygint.co",
   base: "/",
   ```
   This configures the project to work with the custom domain `https://cygint.co`.

2. **Path Updates**

   All internal links are using standard root-relative paths:
   ```js
   // For home page
   <a href="/">Home</a>
   
   // For other pages
   <a href="/case-studies">Case Studies</a>
   ```

3. **Asset URLs**

   All asset URLs are using standard root-relative paths:
   ```js
   // For images
   <img src="/images/example.jpg" alt="Example">
   
   // For the favicon
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   ```

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

## Troubleshooting

If you encounter 404 errors:
1. Make sure the `.nojekyll` file is present
2. Check if the repository settings are correctly configured for GitHub Pages
3. Verify your custom domain is properly set up in GitHub repository settings
4. Check DNS settings for your custom domain