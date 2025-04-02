# GitHub Pages Deployment Guide for Cygint Website

This document outlines how the Cygint website is deployed to GitHub Pages with a custom domain.

## Deployment Overview

The website is built with Astro and configured to create a static site output that's deployed to GitHub Pages. We use GitHub Actions to automate the build and deployment process.

## Key Files for Deployment

- `.github/workflows/deploy.yml` - GitHub Actions workflow that builds and deploys the site
- `astro.config.mjs` - Astro configuration set with `output: "static"` for GitHub Pages compatibility
- `.nojekyll` - Empty file that prevents GitHub Pages from processing the site with Jekyll
- `CNAME` - Contains the custom domain (cygint.co) for GitHub Pages

## GitHub Pages Configuration

1. In the GitHub repository settings, under "Pages":
   - Set "Source" to "GitHub Actions"
   - Configure "Custom domain" to cygint.co
   - Enable "Enforce HTTPS"

## Custom Domain Setup

To point the custom domain to GitHub Pages:

1. Configure your domain registrar with these DNS settings:
   - A records pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a CNAME record for www subdomain:
     ```
     www.cygint.co -> username.github.io
     ```

2. The CNAME file in the repository root ensures the custom domain persists between deployments.

## Static Site Considerations

Since this is a static site deployment:

1. All data is stored in static JSON files in the `/public/data/` directory
2. The contact form sends data to a separate backend service
3. There are no server-side components or dynamic routes

## Manual Deployment

If you need to manually trigger a deployment:

1. Go to the Actions tab in the GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the branch to deploy from