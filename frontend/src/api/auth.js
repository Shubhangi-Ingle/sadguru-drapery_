const API_URL = import.meta.env.VITE_API_URL

export async function login(username, password) {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  })

  if (!res.ok) throw new Error("Invalid username or password")
  return res.json() // { access_token, token_type }
}

export function saveToken(token) {
  localStorage.setItem("admin_token", token)
}

export function getToken() {
  return localStorage.getItem("admin_token")
}

export function logout() {
  localStorage.removeItem("admin_token")
}

export function isLoggedIn() {
  return !!getToken()
}