import { validationResult, body, param, query } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}

export const validateRegister = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can contain letters, numbers, and underscores'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

export const validateLogin = [
  body('identifier').trim().notEmpty().withMessage('Email or username required'),
  body('password').notEmpty().withMessage('Password required'),
]

export const validateContact = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Invalid name'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be 10-1000 characters'),
  body('phone').optional().trim().isMobilePhone().withMessage('Invalid phone'),
]

export const validateMessage = [
  body('text').trim().notEmpty().withMessage('Message required'),
  body('conversationId').trim().notEmpty().withMessage('Conversation ID required'),
]
