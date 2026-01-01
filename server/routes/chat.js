import express from 'express'
import * as chatController from '../controllers/chatController.js'
import { validateMessage, handleValidationErrors } from '../middleware/validation.js'
import { authenticateToken, checkAccessExpiry, requirePermission } from '../middleware/auth.js'
import { PERMISSIONS } from '../shared/constants/permissions.js'

const router = express.Router()

router.post('/message', validateMessage, handleValidationErrors, chatController.sendMessage)
router.get('/conversation/:id', chatController.getConversation)
router.get(
	'/conversations',
	authenticateToken,
	checkAccessExpiry,
	requirePermission(PERMISSIONS.RESPOND_CHATS),
	chatController.getConversations
)
router.post(
	'/message/:messageId/respond',
	authenticateToken,
	checkAccessExpiry,
	requirePermission(PERMISSIONS.RESPOND_CHATS),
	chatController.respondToMessage
)

export default router
