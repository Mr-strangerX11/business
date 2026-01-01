import { create } from 'zustand'

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    localStorage.removeItem('user')
    return null
  }
}

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: (user, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
  setUser: (user) => set({ user }),
}))

const getInitialTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored) return stored === 'dark'
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeStore = create((set) => {
  const initial = getInitialTheme()
  document.documentElement.classList.toggle('dark', initial)

  return {
    isDark: initial,
    toggleTheme: () => set((state) => {
      const newTheme = !state.isDark
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newTheme)
      return { isDark: newTheme }
    }),
    setTheme: (isDark) => {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark)
      set({ isDark })
    },
  }
})

export const useChatStore = create((set) => ({
  messages: [],
  isOpen: false,
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  clearMessages: () => set({ messages: [] }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen) => set({ isOpen }),
}))
