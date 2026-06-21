import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register' // Importação da nova página de cadastro
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

// Definição das rotas do ecossistema
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register', // Nova rota configurada no ecossistema
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default function App() {
  return <RouterProvider router={router} />
}