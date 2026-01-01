import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '../../store'
import { chatAPI, aiAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function ChatWidget() {
  const { isOpen, setIsOpen, messages, addMessage, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      setLoading(true)
      const userMessage = { id: Date.now(), text: input, sender: 'user' }
      addMessage(userMessage)
      setInput('')

      // Get AI response
      const response = await aiAPI.generateResponse(input)
      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'ai'
      }
      addMessage(aiMessage)

      // Send to backend
      await chatAPI.sendMessage({
        message: input,
        response: response.data.message,
      })
    } catch (error) {
      toast.error('Failed to send message')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-8 w-96 h-96 bg-primary-800 border border-white/20 rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="font-semibold">Chat Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="hover:text-accent">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <p>Hey there! 👋</p>
                  <p className="text-sm mt-2">How can we help you today?</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-accent text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2 bg-accent hover:bg-orange-600 rounded text-white transition disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-accent hover:bg-orange-600 rounded-full shadow-lg transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  )
}
