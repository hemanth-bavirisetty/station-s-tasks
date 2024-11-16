import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/elements/LandingPage'
import RegisterPage from './components/elements/RegisterPage'
import LoginPage from './components/elements/LoginPage'
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import DashboardPage from './components/elements/DashboardPage'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },



])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  </StrictMode>,
)
