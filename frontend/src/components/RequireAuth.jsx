import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../api/auth'

function RequireAuth({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export default RequireAuth