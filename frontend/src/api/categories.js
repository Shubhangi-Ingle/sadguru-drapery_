const API_URL = import.meta.env.VITE_API_URL

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories/`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}