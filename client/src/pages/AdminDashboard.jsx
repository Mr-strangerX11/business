import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { contactAPI, chatAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('submissions')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login')
      return
    }

    fetchData()
  }, [isAuthenticated, user, navigate])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [submissionsRes, conversationsRes] = await Promise.all([
        contactAPI.getAll(),
        chatAPI.getConversations(),
      ])
      setSubmissions(submissionsRes.data)
      setConversations(conversationsRes.data)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border border-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'submissions'
                ? 'bg-accent text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'conversations'
                ? 'bg-accent text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Conversations ({conversations.length})
          </button>
        </div>

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <motion.div
                key={submission._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-6 rounded-lg"
              >
                <h3 className="font-bold text-lg mb-2">{submission.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{submission.email}</p>
                <p className="mb-4">{submission.message}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                  <span className={`px-3 py-1 rounded ${
                    submission.status === 'new' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {submission.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Conversations Tab */}
        {activeTab === 'conversations' && (
          <div className="grid gap-4">
            {conversations.map((conv) => (
              <motion.div
                key={conv._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-6 rounded-lg"
              >
                <h3 className="font-bold text-lg mb-2">{conv.visitorName || 'Anonymous'}</h3>
                <p className="text-sm text-gray-400 mb-2">{conv.visitorEmail}</p>
                <p className="mb-4 line-clamp-2">{conv.messages[0]?.text}</p>
                <div className="text-sm text-gray-400">
                  {conv.messages.length} message{conv.messages.length !== 1 ? 's' : ''}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
