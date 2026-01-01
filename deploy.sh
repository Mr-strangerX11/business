#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Wolf Alpha Deployment Script${NC}"
echo ""

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Backend URL not provided${NC}"
    echo ""
    echo "Usage: ./deploy.sh <BACKEND_URL>"
    echo "Example: ./deploy.sh https://wolf-alpha-backend.onrender.com"
    echo ""
    echo "First deploy your backend to Render, then run this script with your backend URL"
    exit 1
fi

BACKEND_URL="$1"
API_URL="${BACKEND_URL}/api"

echo -e "${GREEN}📦 Backend URL: $BACKEND_URL${NC}"
echo -e "${GREEN}🔌 API URL: $API_URL${NC}"
echo ""

# Navigate to client directory
echo -e "${YELLOW}📂 Navigating to client directory...${NC}"
cd client || exit 1

# Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm install

# Build with backend URL
echo -e "${YELLOW}🔨 Building frontend with API URL: $API_URL${NC}"
VITE_API_URL="$API_URL" npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Navigate to dist directory
echo -e "${YELLOW}📂 Preparing deployment...${NC}"
cd dist || exit 1

# Initialize git in dist
git init

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')"

# Rename branch to gh-pages
git branch -M gh-pages

# Add remote (ignore error if already exists)
git remote add origin https://github.com/Mr-strangerX11/business.git 2>/dev/null || \
git remote set-url origin https://github.com/Mr-strangerX11/business.git

# Increase buffer size
git config http.postBuffer 524288000

# Push to GitHub Pages
echo -e "${YELLOW}🚀 Deploying to GitHub Pages...${NC}"
git push -f origin gh-pages

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${GREEN}🌐 Your website is live at:${NC}"
echo -e "${GREEN}   https://mr-strangerx11.github.io/business/${NC}"
echo ""
echo -e "${YELLOW}⏳ Note: GitHub Pages may take 1-5 minutes to update${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "   1. Wait a few minutes for GitHub Pages to update"
echo "   2. Visit https://mr-strangerx11.github.io/business/"
echo "   3. Test all features (contact form, chat, admin dashboard)"
echo ""
