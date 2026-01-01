import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import ScrollToTop from './components/common/ScrollToTop'
import ChatWidget from './components/chat/ChatWidget'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import ThankYouPage from './pages/ThankYouPage'
import NotFoundPage from './pages/NotFoundPage'
import { useThemeStore } from './store'
import { AuthProvider } from './app/providers/AuthProvider'
import { PermissionProvider } from './app/providers/PermissionProvider'
import { ProtectedRoute } from './app/router/ProtectedRoute'
import { RoleGuard } from './app/router/RoleGuard'
import { PermissionGuard } from './app/router/PermissionGuard'
import { ROLES } from './shared/roles'
import { PERMISSIONS } from './shared/permissions'
import backgroundDark from './logo/background.png'
import backgroundLight from './logo/light-background.png'

export default function App() {
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Router>
      <AuthProvider>
        <PermissionProvider>
          <div
            className="min-h-screen bg-white text-primary-900 dark:bg-primary-900 dark:text-white transition-colors duration-300"
            style={{
              backgroundImage: `url(${isDark ? backgroundDark : backgroundLight})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/admin"
                    element={(
                      <ProtectedRoute>
                        <RoleGuard allowed={[ROLES.ADMIN]}>
                          <PermissionGuard permission={PERMISSIONS.VIEW_ANALYTICS}>
                            <AdminDashboard />
                          </PermissionGuard>
                        </RoleGuard>
                      </ProtectedRoute>
                    )}
                  />
                  <Route path="/thank-you" element={<ThankYouPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
            <ScrollToTop />
            <ChatWidget />
            <Toaster position="top-right" />
          </div>
        </PermissionProvider>
      </AuthProvider>
    </Router>
  )
}
