# Wolf Alpha - Enterprise Full-Stack Website

A complete, production-ready full-stack website for Wolf Alpha, a premium software development company. Built with React.js, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

## 🎯 Features

### Frontend
- ✅ Modern React with Vite for fast development
- ✅ Tailwind CSS for responsive design
- ✅ Framer Motion animations
- ✅ Dark/Light mode toggle
- ✅ Real-time chat widget with AI
- ✅ Contact form with validation
- ✅ Testimonials carousel
- ✅ FAQ accordion
- ✅ Admin dashboard
- ✅ Knowledge base
- ✅ Socket.IO integration
- ✅ Fully responsive (mobile-first)
- ✅ SEO optimized
- ✅ Accessibility best practices

### Backend
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ Role-based access control (User, Staff, Admin)
- ✅ Email automation with Nodemailer
- ✅ AI-powered responses (OpenAI integration)
- ✅ Real-time chat with Socket.IO
- ✅ Rate limiting & security (Helmet)
- ✅ Input validation
- ✅ Error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
cd /Users/macbook/Desktop/wolf_alpha
```

2. **Backend Setup**
```bash
cd server
npm install
```

3. **Frontend Setup**
```bash
cd ../client
npm install
```

### Configuration

1. **Backend Environment** (`server/.env`)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/wolf_alpha
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=hello@wolfalpha.com

OPENAI_API_KEY=your_openai_api_key
```

2. **Frontend Environment** (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Terminal 1 - Start Backend
```bash
cd server
npm install
npm start
# or for development with auto-reload:
npm run dev
```

Backend will be available at: `http://localhost:5000`

#### Terminal 2 - Start Frontend
```bash
cd client
npm install
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
wolf_alpha/
├── client/                         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Sidebar, Footer
│   │   │   ├── sections/          # Hero, Services, About, Process, etc.
│   │   │   ├── common/            # Reusable components
│   │   │   └── chat/              # Chat widget
│   │   ├── pages/                 # Route pages
│   │   ├── services/              # API calls
│   │   ├── hooks/                 # Custom hooks
│   │   ├── store/                 # Zustand state management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                         # Node.js Backend
    ├── models/                    # MongoDB schemas
    ├── controllers/               # Business logic
    ├── routes/                    # API endpoints
    ├── middleware/                # Auth, validation
    ├── services/                  # Email, AI, etc.
    ├── server.js
    ├── .env
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin only)
- `PUT /api/contact/:id` - Respond to submission (admin only)
- `DELETE /api/contact/:id` - Delete submission (admin only)

### Chat
- `POST /api/chat/message` - Send message
- `GET /api/chat/conversations` - Get conversations (staff only)
- `GET /api/chat/conversation/:id` - Get specific conversation
- `POST /api/chat/message/:messageId/respond` - Admin response

### AI
- `POST /api/ai/generate` - Generate AI response
- `POST /api/ai/analyze` - Analyze message

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe

## 🔐 Authentication & Authorization

### JWT Flow
1. User registers or logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with each API request in Authorization header
5. Protected routes verify token

### Roles
- **User**: Can submit contact forms, chat
- **Staff**: Can view and respond to messages
- **Admin**: Full access to dashboard, user management

## 🤖 AI Integration

The system uses OpenAI's GPT-3.5-turbo for intelligent responses:

- **Auto-responses**: AI generates initial responses to new messages
- **Smart analysis**: Message classification and sentiment analysis
- **Fallback mode**: Default responses when API is unavailable

## 📧 Email Automation

### Triggers
1. **Contact submission**: User receives confirmation, admin notified
2. **Message response**: User notified of response
3. **Newsletter**: Subscription confirmation

### Configuration
- Uses Nodemailer with Gmail SMTP
- For development: Logs to console
- For production: Sends actual emails

## 🔄 Real-Time Features

### Socket.IO Events
- `join-conversation` - Join chat room
- `new-message` - Send message to room
- `message-received` - Receive message
- `user-typing` - Typing indicator

## 🛠️ Development

### Frontend Development
```bash
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
```

### Backend Development
```bash
cd server
npm run dev          # Run with nodemon
npm start            # Run normally
```

## 📦 Building for Production

### Frontend Build
```bash
cd client
npm run build
# Output in: client/dist
```

### Backend Preparation
```bash
# Ensure all env variables are set
NODE_ENV=production
# Use MongoDB Atlas connection
```

## 🚢 Deployment

### Frontend (Netlify/Vercel/GitHub Pages)

1. **Build**
```bash
cd client
npm run build
```

2. **Deploy**
   - Push `dist/` folder to hosting service
   - Set environment variable: `VITE_API_URL=https://your-api-url.com`

### Backend (Render/Railway/Heroku)

1. **Prepare**
   - Set all environment variables
   - Use MongoDB Atlas (cloud database)

2. **Deploy**
   - Connect Git repository
   - Set environment variables in hosting dashboard
   - Start command: `npm start`

### Docker (Optional)

Create `Dockerfile` for containerization:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔒 Security Best Practices

- ✅ CORS enabled only for frontend URL
- ✅ Rate limiting on API routes
- ✅ Helmet.js for security headers
- ✅ JWT token expiration
- ✅ Password hashing with bcryptjs
- ✅ Input validation
- ✅ Error message sanitization
- ✅ HTTPS recommended for production

## 📊 Database Models

### User
- name, email, password (hashed), phone, company
- role (user/staff/admin), avatar
- isActive, lastLogin, timestamps

### Contact
- name, email, phone, company, message
- status (new/read/responded)
- response, respondedBy, respondedAt
- ipAddress, userAgent, timestamps

### Message
- text, sender (user/admin/ai)
- conversationId, response, respondedBy
- read, timestamps

### Conversation
- visitorName, visitorEmail
- messages (array of Message IDs)
- assignedTo, status, hasResponse
- lastMessageAt, closedAt, timestamps

### Newsletter
- email, status (subscribed/unsubscribed)
- subscribedAt, unsubscribedAt, timestamps

## 🧪 Testing

### Manual Testing
1. Register and login
2. Submit contact form
3. Try admin dashboard (after login as admin)
4. Test chat widget
5. Test dark mode toggle
6. Test responsive design

### API Testing (with cURL or Postman)
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Submit contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
```

## 🐛 Troubleshooting

### MongoDB Connection
```bash
# Local MongoDB
mongod --dbpath /path/to/db

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wolf_alpha
```

### API Not Responding
- Check backend is running on port 5000
- Verify CORS settings in server.js
- Check environment variables
- View server logs

### Frontend Not Loading API
- Ensure backend is running
- Check VITE_API_URL in .env
- Verify proxy settings in vite.config.js

### Email Not Sending
- Check SMTP credentials in .env
- Enable "Less Secure Apps" if using Gmail
- Use App-Specific Password for Gmail
- Check console logs in development

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://docs.mongodb.com)
- [Socket.IO](https://socket.io/docs/)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and create pull requests.

## 👥 Team

Wolf Alpha - Premium Software Development Company

## 📞 Support

- Email: hello@wolfalpha.com
- Phone: +1 (555) 123-4567
- Website: https://wolfalpha.com

---

**Built with ❤️ for the future of software development**
