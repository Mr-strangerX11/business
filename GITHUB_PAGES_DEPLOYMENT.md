# GitHub Pages + Render Deployment Guide

## 🚀 Complete Deployment Steps

### Step 1: Deploy Backend to Render

1. **Go to [render.com](https://render.com)** and sign in with GitHub

2. **Create New Web Service:**
   - Click **"New +"** → **"Web Service"**
   - Connect your repository: `Mr-strangerX11/business`
   - Render will detect `render.yaml` automatically

3. **Or manually configure:**
   - **Name**: `wolf-alpha-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://wolfalphak77_db_user:wolfmaster@wolfalpha.97t5w9e.mongodb.net/
   JWT_SECRET=your_secure_secret_key_here_change_this_12345678
   JWT_EXPIRE=7d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=wolf.alpha.k77@gmail.com
   SMTP_PASS=iwarjnjesqrowzrb
   SMTP_FROM=Wolf Alpha <wolf.alpha.k77@gmail.com>
   OPENAI_API_KEY=sk-test-placeholder-key
   FRONTEND_URL=https://mr-strangerx11.github.io
   ```

5. **Deploy** and copy your backend URL (e.g., `https://wolf-alpha-backend.onrender.com`)

---

### Step 2: Update Frontend Configuration

1. **Update API URL** - Edit `client/src/services/api.js`:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'https://YOUR-BACKEND-URL.onrender.com/api'
   ```

2. **Or set in build command** (recommended):
   ```bash
   VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api npm run build
   ```

---

### Step 3: Rebuild and Redeploy Frontend

Run these commands:

```bash
cd client

# Build with your backend URL
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api npm run build

# Deploy to GitHub Pages
cd dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/Mr-strangerX11/business.git
git config http.postBuffer 524288000
git push -f origin gh-pages
```

---

### Step 4: Update Backend CORS

Once deployed, verify your backend's CORS settings allow your GitHub Pages domain in `server/server.js`.

---

## 🌐 Your Live URLs

- **Frontend**: https://mr-strangerx11.github.io/business/
- **Backend**: https://YOUR-BACKEND-URL.onrender.com

---

## ⚙️ Automated Deployment (Optional)

### GitHub Actions for Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        working-directory: ./client
        run: |
          npm install
          VITE_API_URL=${{ secrets.VITE_API_URL }} npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
```

Add `VITE_API_URL` to GitHub Secrets:
- Go to Settings → Secrets → New repository secret
- Name: `VITE_API_URL`
- Value: `https://YOUR-BACKEND-URL.onrender.com/api`

---

## 📝 Quick Deploy Script

Save this as `deploy.sh`:

```bash
#!/bin/bash

# Set your backend URL here
BACKEND_URL="https://YOUR-BACKEND-URL.onrender.com/api"

echo "Building frontend with API URL: $BACKEND_URL"
cd client
VITE_API_URL=$BACKEND_URL npm run build

echo "Deploying to GitHub Pages..."
cd dist
git init
git add -A
git commit -m "Deploy $(date +'%Y-%m-%d %H:%M:%S')"
git branch -M gh-pages
git remote add origin https://github.com/Mr-strangerX11/business.git 2>/dev/null || git remote set-url origin https://github.com/Mr-strangerX11/business.git
git config http.postBuffer 524288000
git push -f origin gh-pages

echo "✅ Deployment complete!"
echo "🌐 Visit: https://mr-strangerx11.github.io/business/"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔧 Troubleshooting

### Backend Issues
- **503 Error**: Render free tier sleeps after 15 min. First request takes ~30s
- **CORS Error**: Check `FRONTEND_URL` in Render env variables
- **Database Error**: Verify MongoDB connection string

### Frontend Issues
- **Blank Page**: Check browser console for errors
- **API Errors**: Verify `VITE_API_URL` is correct
- **404 on Refresh**: GitHub Pages doesn't support client-side routing perfectly

---

## 💰 Free Tier Limits

**Render (Backend):**
- 750 hours/month free
- Sleeps after 15 min inactivity
- 512 MB RAM

**GitHub Pages (Frontend):**
- 100 GB bandwidth/month
- 1 GB storage
- HTTPS included

---

## 🎯 Production Checklist

- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] Frontend built with correct API URL
- [ ] Frontend deployed to GitHub Pages
- [ ] CORS configured correctly
- [ ] MongoDB Atlas whitelisted Render IPs (0.0.0.0/0)
- [ ] Test all features (contact form, chat, auth)
- [ ] Change JWT_SECRET to a secure value
- [ ] Update OPENAI_API_KEY if using AI features
