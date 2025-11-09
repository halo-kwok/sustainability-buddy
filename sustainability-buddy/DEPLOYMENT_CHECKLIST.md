# Deployment Checklist

Use this checklist before deploying to Netlify to ensure everything is ready.

## Pre-Deployment

- [ ] All code is committed and pushed to Git repository
- [ ] Build runs successfully locally (`npm run build`)
- [ ] All environment variables are documented
- [ ] No sensitive data is committed (check `.gitignore`)

## Netlify Configuration

- [ ] Repository is connected to Netlify
- [ ] Build settings are configured:
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
  - [ ] Base directory: (leave empty or set to `sustainability-buddy` if repo root is parent)
- [ ] Environment variables are set in Netlify dashboard:
  - [ ] `VITE_LITELLM_API_KEY`
  - [ ] `VITE_LITELLM_GATEWAY_URL`
  - [ ] `VITE_LITELLM_MODEL`

## Files Verification

- [ ] `netlify.toml` exists and is correct
- [ ] `public/_redirects` exists
- [ ] All images are in `public/` directory:
  - [ ] `logo.png`
  - [ ] `home-logo.png`
  - [ ] `agent-avatar.png`
  - [ ] `background.jpg`

## Post-Deployment Testing

- [ ] Site loads at Netlify URL
- [ ] Home page displays correctly
- [ ] Navigation works (all routes accessible)
- [ ] Direct URL access works (e.g., `/profile`, `/chat`)
- [ ] Images load correctly
- [ ] AI chat functionality works
- [ ] Environment variables are accessible (check browser console)
- [ ] No console errors
- [ ] Mobile responsiveness works

## Optional

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics/tracking set up (if needed)
- [ ] Performance monitoring configured

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs, verify dependencies |
| 404 on routes | Verify `_redirects` file is in `public/` |
| AI not working | Check environment variables in Netlify |
| Images broken | Verify images are in `public/` and paths start with `/` |
| Environment vars not found | Ensure all start with `VITE_` prefix |

