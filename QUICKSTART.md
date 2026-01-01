## Getting Started

### Initial Setup (First Time Only)

#### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

#### 2. Configure Environment

**Backend Setup (`server/.env`):**
- Set `MONGODB_URI` if not using local MongoDB
- Set `JWT_SECRET` to a secure random string
- Set email credentials (Gmail recommended)
- Get OpenAI API key from openai.com (optional)

**Frontend Setup (`client/.env`):**
```
VITE_API_URL=http://localhost:5000/api
```

#### 3. Start MongoDB (if local)

```bash
mongod --dbpath ~/data/db
# or use MongoDB Atlas cloud database
```

#### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

### Testing the Application

1. **Home Page**
   - Visit http://localhost:3000
   - Test dark mode toggle
   - Scroll through all sections

2. **Contact Form**
   - Fill and submit contact form
   - Check terminal for email logs
   - Verify success page

3. **Authentication**
   - Click "Sign Up" → Register with email
   - Login with credentials
   - Visit Admin Dashboard

4. **Chat Widget**
   - Click chat icon (bottom right)
   - Send a message
   - See AI response

5. **Admin Dashboard**
   - Login with admin account (manually set role in DB)
   - View submissions and conversations

### Project Structure Overview

**Frontend Files:**
- `src/pages/` - Full page components
- `src/components/sections/` - Homepage sections
- `src/components/layout/` - Navigation, Footer
- `src/components/chat/` - Chat widget
- `src/store/` - State management (Zustand)
- `src/services/api.js` - API calls

**Backend Files:**
- `models/` - MongoDB schemas
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/` - Auth, validation
- `services/` - Email, AI services
- `server.js` - Main entry point

### Common Commands

**Frontend:**
```bash
npm run dev       # Start dev server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

**Backend:**
```bash
npm start         # Start server
npm run dev       # Start with nodemon (auto-reload)
npm test          # Run tests (if configured)
```

### Troubleshooting

**Problem: "Cannot find module"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Problem: MongoDB connection error**
```bash
# Ensure MongoDB is running
mongod --version  # Check if installed
mongod           # Start MongoDB
```

**Problem: Port already in use**
```bash
# Change port in server/.env
PORT=5001

# Or kill process using port
lsof -i :5000
kill -9 <PID>
```

**Problem: CORS errors**
- Check `FRONTEND_URL` in server/.env
- Should be `http://localhost:3000` for development

**Problem: API not responding**
- Verify backend is running on correct port
- Check error logs in terminal
- Verify `.env` file has correct values

### Next Steps

1. **Customize Content**
   - Edit text in `src/components/sections/`
   - Change colors in `tailwind.config.js`
   - Update images/assets

2. **Add Features**
   - Create new pages in `src/pages/`
   - Add routes in `src/App.jsx`
   - Create API endpoints in backend

3. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Set up environment variables
   - Deploy frontend and backend

### Documentation Links

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Tailwind:** https://tailwindcss.com
- **Express:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com
- **Socket.IO:** https://socket.io/docs/

### Support & Resources

- **Frontend Issues:** Check browser console (F12)
- **Backend Issues:** Check terminal logs
- **API Testing:** Use Postman or cURL
- **Database:** Use MongoDB Compass

---

Need help? Check README_COMPLETE.md for comprehensive documentation.
