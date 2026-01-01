import express from 'express'
import * as authController from '../controllers/authController.js'
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js'
import { authenticateToken, checkAccessExpiry } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', validateRegister, handleValidationErrors, authController.register)
router.post('/login', validateLogin, handleValidationErrors, authController.login)
router.get('/profile', authenticateToken, checkAccessExpiry, authController.getProfile)
router.put('/profile', authenticateToken, checkAccessExpiry, authController.updateProfile)

export default router
