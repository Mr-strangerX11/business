import { OpenAI } from 'openai'

// Use a test key if not provided to allow startup
const apiKey = process.env.OPENAI_API_KEY || 'sk-test-key'
const client = new OpenAI({
  apiKey: apiKey,
})

export const generateAIResponse = async (prompt) => {
  try {
    // For development or test mode
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('test') || process.env.NODE_ENV === 'development') {
      return generateDefaultResponse(prompt)
    }

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for Wolf Alpha, a premium software development company. Provide concise, professional responses to inquiries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('AI error:', error.message)
    return generateDefaultResponse(prompt)
  }
}

const generateDefaultResponse = (prompt) => {
  const responses = [
    'Thank you for your inquiry! We appreciate your interest in Wolf Alpha. Our team will get back to you shortly with more information.',
    'Great question! We\'d love to help you with your project. One of our specialists will contact you within 24 hours.',
    'Thank you for reaching out! We\'ll review your message and provide a detailed response soon.',
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}
