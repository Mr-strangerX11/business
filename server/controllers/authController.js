import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { ROLES } from '../shared/constants/roles.js'

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body

    // Check if user exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email or username already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role: ROLES.CLIENT,
      permissions: [],
    })

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        accessExpiresAt: user.accessExpiresAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        accessExpiresAt: user.accessExpiresAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body

    // Find user
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        accessExpiresAt: user.accessExpiresAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        accessExpiresAt: user.accessExpiresAt,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, company } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, company },
      { new: true }
    ).select('-password')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
