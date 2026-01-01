import express from 'express'
import * as contactController from '../controllers/contactController.js'
import { validateContact, handleValidationErrors } from '../middleware/validation.js'
import { authenticateToken, checkAccessExpiry, requirePermission } from '../middleware/auth.js'
import { PERMISSIONS } from '../shared/constants/permissions.js'

const router = express.Router()

router.post('/', validateContact, handleValidationErrors, contactController.submitContact)
router.get(
	'/',
	authenticateToken,
	checkAccessExpiry,
	requirePermission(PERMISSIONS.VIEW_USERS),
	contactController.getContacts
)
router.put(
	'/:id',
	authenticateToken,
	checkAccessExpiry,
	requirePermission(PERMISSIONS.MANAGE_USERS),
	contactController.updateContact
)
router.delete(
	'/:id',
	authenticateToken,
	checkAccessExpiry,
	requirePermission(PERMISSIONS.MANAGE_USERS),
	contactController.deleteContact
)

export default router
