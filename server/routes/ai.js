import express from 'express'
import * as aiController from '../controllers/aiController.js'

const router = express.Router()

router.post('/generate', aiController.generateResponse)
router.post('/analyze', aiController.analyzeMessage)

export default router
