import { adminFetch } from './adminFetch'

const API_URL = "http://localhost:8000"

export async function getSubcategoriesAdmin() {
  const res = await fetch(`${API_URL}/subcategories/`)
  if (!res.ok) throw new Error("Failed to fetch subcategories")
  return res.json()
}

export async function createSubcategory(name, categoryId) {
  const res = await adminFetch(`/subcategories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category_id: Number(categoryId) }),
  })
  if (!res.ok) throw new Error("Failed to create subcategory")
  return res.json()
}

export async function updateSubcategory(id, name) {
  const res = await adminFetch(`/subcategories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error("Failed to update subcategory")
  return res.json()
}

export async function deleteSubcategory(id) {
  const res = await adminFetch(`/subcategories/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete subcategory")
  return res.json()
}