# Deployment Setup Guide

## GitHub Pages Deployment

Your project is configured for automatic deployment to GitHub Pages using GitHub Actions!

### Step 1: Add Your API Key to GitHub Secrets

1. Go to your repository: https://github.com/westpoint0101/wealth
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `DECART_API_KEY`
5. Value: Your Decart AI API key
6. Click **Add secret**

### Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Branch: **gh-pages**
4. Folder: **/ (root)**
5. Click **Save**

### Step 3: Deploy

After adding your API key secret, any push to the `main` branch will automatically:
- Install dependencies
- Build the production bundle
- Deploy to GitHub Pages

Your app will be live at: **https://westpoint0101.github.io/wealth**

### Manual Deployment (Local)

If you want to deploy manually from your computer:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Note: The `npm run deploy` command requires the `gh-pages` CLI tool and proper git configuration.

### Troubleshooting

**Build fails with "API key not found":**
- Make sure you've added the `DECART_API_KEY` secret to your repository
- The secret name must match exactly

**GitHub Pages not updating:**
- Check the **Actions** tab to see if the workflow ran successfully
- Wait a few minutes for GitHub Pages to update
- Clear your browser cache

**App loads but shows "API key error":**
- Verify the API key in your GitHub secret is correct
- Make sure it's not expired

### Environment Variables

The GitHub Actions workflow automatically passes the API key as an environment variable during the build. The React app accesses it via `process.env.REACT_APP_DECART_API_KEY`.

For local development, create a `.env.local` file:
```
REACT_APP_DECART_API_KEY=your_key_here
```

(This file is in `.gitignore` so it won't be committed to GitHub)
