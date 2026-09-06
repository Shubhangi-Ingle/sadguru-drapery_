const API_URL = import.meta.env.VITE_API_URL

export async function getDesigns(skip = 0, limit = 24) {
  const res = await fetch(`${API_URL}/designs/?skip=${skip}&limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch designs")
  return res.json()
}

export async function getDesignsCount() {
  const res = await fetch(`${API_URL}/designs/count`)
  if (!res.ok) throw new Error("Failed to fetch count")
  return res.json()
}