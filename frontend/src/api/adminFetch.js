import { getToken, logout } from './auth'

const API_URL = "http://localhost:8000"

export async function adminFetch(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    logout()
    window.location.href = "/admin/login"
    throw new Error("Session expired, please log in again")
  }

  return res
}