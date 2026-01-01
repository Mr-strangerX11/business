# Deployment Guide

## Frontend Deployment

### Option 1: Netlify

1. **Build the project**
```bash
cd client
npm run build
```

2. **Connect to Netlify**
   - Go to netlify.com
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-api-url.com`

3. **Deploy**
   - Push to main branch to auto-deploy

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd client
vercel
```

3. **Configure**
   - Set environment variables in Vercel dashboard
   - Vercel auto-detects Vite setup

### Option 3: GitHub Pages

1. **Update vite.config.js**
```javascript
export default {
  base: '/wolf-alpha/',
  // ... other config
}
```

2. **Build and push**
```bash
cd client
npm run build
git add dist/
git commit -m "Build"
git push
```

3. **GitHub Settings**
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Custom domain (optional)

## Backend Deployment

### Option 1: Render

1. **Create Render account** at render.com

2. **Create new Web Service**
   - Connect Git repository
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add Environment Variables**
   - Go to Environment tab
   - Add all variables from `.env`
   - Use MongoDB Atlas for database

4. **Deploy**
   - Click "Create Web Service"
   - Get your API URL

### Option 2: Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and deploy**
```bash
cd server
railway login
railway init
railway up
```

3. **Configure**
   - Add environment variables in Railway dashboard
   - Railway auto-generates Postgres (optional)

### Option 3: Heroku

1. **Install Heroku CLI**
```bash
brew tap heroku/brew && brew install heroku
```

2. **Create and deploy**
```bash
cd server
heroku create wolf-alpha-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_here
git push heroku main
```

3. **View logs**
```bash
heroku logs --tail
```

## MongoDB Atlas Setup

1. **Create account** at mongodb.com

2. **Create cluster**
   - Choose free tier
   - Select region closest to you
   - Create M0 cluster

3. **Get connection string**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

4. **Use in backend**
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/wolf_alpha
```

## Environment Variables for Production

### Backend (.env production)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wolf_alpha
JWT_SECRET=your-very-secure-secret-key-min-32-chars
JWT_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=noreply@wolfalpha.com

OPENAI_API_KEY=sk-your-openai-key
```

### Frontend (.env production)
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Custom Domain Setup

### For Frontend
1. Purchase domain from GoDaddy, Namecheap, etc.
2. Go to domain DNS settings
3. Add CNAME record pointing to your hosting service
4. Update in hosting dashboard

### For Backend API
1. Same process as frontend
2. Use subdomain like `api.yourdomain.com`

## SSL/TLS Certificate

Most hosting services provide free SSL:
- Netlify: Automatic
- Vercel: Automatic
- Render: Automatic
- Heroku: Free with domain

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm install -g vite
vite --analyze

# Compression
npm install compression
```

### Backend
```javascript
import compression from 'compression'
app.use(compression())
```

## Monitoring & Logging

### Backend Logs
- Render: Built-in logs
- Railway: Built-in logs
- Heroku: `heroku logs --tail`

### Error Tracking
```bash
npm install sentry
```

```javascript
import * as Sentry from "@sentry/node"
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

## Database Backup

### MongoDB Atlas
1. Go to Backup/Restore
2. Enable automatic backups
3. Download backup when needed

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd client && npm install && npm run build
      - run: cd server && npm install
      - name: Deploy
        run: |
          npm install -g vercel
          vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Post-Deployment Checklist

- [ ] Test frontend on production URL
- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Test contact form submission
- [ ] Verify emails are sending
- [ ] Test chat functionality
- [ ] Check admin dashboard access
- [ ] Monitor error logs
- [ ] Set up monitoring/alerting
- [ ] Backup database
- [ ] Configure domain SSL
- [ ] Set up CDN for static assets
- [ ] Enable GZIP compression
- [ ] Test on mobile devices
- [ ] Verify analytics tracking

---

For support: hello@wolfalpha.com
