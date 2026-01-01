import express from 'express'
import * as newsletterController from '../controllers/newsletterController.js'

const router = express.Router()

router.post('/subscribe', newsletterController.subscribe)
router.post('/unsubscribe', newsletterController.unsubscribe)

export default router
