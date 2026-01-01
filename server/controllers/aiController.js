import { generateAIResponse } from '../services/aiService.js'

export const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body
    const response = await generateAIResponse(prompt)
    res.json({ success: true, message: response })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const analyzeMessage = async (req, res) => {
  try {
    const { message } = req.body
    // Implement sentiment analysis or classification here
    res.json({ success: true, analysis: { sentiment: 'neutral', score: 0.5 } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
