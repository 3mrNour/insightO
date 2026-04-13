import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import LoginPage from '@/features/Auth/pages/LoginPage'
import RegisterPage from '@/features/Auth/pages/RegisterPage'
import DashboardPlaceholder from '@/features/Auth/pages/DashboardPlaceholder.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          },
        }}
      />
    </>
  )
}

export default App
