# Netlify Deployment Guide for Sustainability Buddy

This guide will help you deploy the Sustainability Buddy application to Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://www.netlify.com))
2. Your LiteLLM API credentials from Duke
3. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first-time deployment)

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   Netlify should auto-detect these settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   
   If not auto-detected, manually set:
   - Base directory: `sustainability-buddy` (if your repo root is the parent directory)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   Go to Site settings → Environment variables and add:
   
   ```
   VITE_LITELLM_API_KEY=your_api_key_here
   VITE_LITELLM_GATEWAY_URL=https://litellm.oit.duke.edu/v1
   VITE_LITELLM_MODEL=GPT 4.1 Mini
   ```
   
   **Important:** Replace `your_api_key_here` with your actual API key from Duke.

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

2. **Initialize Netlify in your project**
   ```bash
   cd sustainability-buddy
   netlify init
   ```
   
   Follow the prompts:
   - Create & configure a new site
   - Team: Select your team
   - Site name: Choose a name or press enter for a random name
   - Build command: `npm run build` (should auto-detect)
   - Publish directory: `dist` (should auto-detect)

3. **Set Environment Variables**
   ```bash
   netlify env:set VITE_LITELLM_API_KEY "your_api_key_here"
   netlify env:set VITE_LITELLM_GATEWAY_URL "https://litellm.oit.duke.edu/v1"
   netlify env:set VITE_LITELLM_MODEL "GPT 4.1 Mini"
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Environment Variables

The following environment variables must be set in Netlify:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_LITELLM_API_KEY` | Your LiteLLM API key from Duke | `your_api_key_here` |
| `VITE_LITELLM_GATEWAY_URL` | Duke's LiteLLM gateway URL | `https://litellm.oit.duke.edu/v1` |
| `VITE_LITELLM_MODEL` | Model name to use | `GPT 4.1 Mini` |

**Note:** All environment variables must start with `VITE_` to be accessible in the browser with Vite.

## Build Configuration

The project uses the following build configuration (defined in `netlify.toml`):

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** Uses Netlify's default (Node 18+)

## Post-Deployment

### Verify Deployment

1. Check that all routes work (especially `/home`, `/profile`, `/chat`, `/actions`, `/events`)
2. Test the AI chat functionality
3. Verify that images load correctly
4. Check browser console for any errors

### Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow Netlify's instructions to configure your domain

### Continuous Deployment

Netlify automatically deploys when you push to your main branch. To change this:

1. Go to Site settings → Build & deploy → Continuous Deployment
2. Configure branch and build settings as needed

## Troubleshooting

### Build Fails

- **Error: Missing dependencies**
  - Solution: Ensure `package.json` is committed and `node_modules` is in `.gitignore`
  - Netlify will run `npm install` automatically

- **Error: Environment variables not found**
  - Solution: Verify all `VITE_*` variables are set in Netlify dashboard
  - Check Site settings → Environment variables

### Routes Return 404

- **Issue:** Direct navigation to routes like `/profile` returns 404
- **Solution:** The `_redirects` file and `netlify.toml` should handle this automatically
- **Verify:** Check that `public/_redirects` is included in the build

### AI Not Working

- **Issue:** Chat/AI features don't work after deployment
- **Solution:** 
  1. Check browser console for API errors
  2. Verify environment variables are set correctly
  3. Ensure API key has proper permissions
  4. Check CORS settings on LiteLLM gateway

### Images Not Loading

- **Issue:** Images show broken links
- **Solution:** 
  1. Verify images are in `public/` directory
  2. Check image paths in code (should start with `/`)
  3. Ensure images are committed to Git

## File Structure for Deployment

```
sustainability-buddy/
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── public/
│   ├── _redirects        # SPA redirect rules
│   ├── logo.png
│   ├── home-logo.png
│   ├── agent-avatar.png
│   └── background.jpg
├── src/                  # Source code
└── dist/                 # Build output (generated, not committed)
```

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

