import './config/env.js'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'

// Import routes
import authRoutes from './routes/auth.js'
import contactRoutes from './routes/contact.js'
import chatRoutes from './routes/chat.js'
import aiRoutes from './routes/ai.js'
import newsletterRoutes from './routes/newsletter.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use(limiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/newsletter', newsletterRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Wolf Alpha API is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-conversation', (conversationId) => {
    socket.join(`conversation-${conversationId}`)
  })

  socket.on('new-message', (data) => {
    io.to(`conversation-${data.conversationId}`).emit('message-received', data)
  })

  socket.on('user-typing', (data) => {
    io.to(`conversation-${data.conversationId}`).emit('typing', { userId: socket.id })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wolf_alpha')
    console.log('✅ MongoDB connected')
    return true
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message)
    console.warn('⚠️  Server will run without database functionality')
    console.warn('💡 To enable database features:')
    console.warn('   - Start MongoDB: brew services start mongodb-community')
    console.warn('   - Or use MongoDB Atlas cloud database')
    return false
  }
}

// Start server
const PORT = process.env.PORT || 5000
const startServer = async () => {
  const dbConnected = await connectDB()

  httpServer.listen(PORT, () => {
    console.log(`\n🚀 Wolf Alpha API running on port ${PORT}`)
    console.log(`📍 Environment: ${process.env.NODE_ENV}`)
    console.log(`🔗 CORS enabled for: ${process.env.FRONTEND_URL}`)
    console.log(`💾 Database: ${dbConnected ? 'Connected' : 'Disconnected (limited functionality)'}\n`)
  })
}

startServer()
