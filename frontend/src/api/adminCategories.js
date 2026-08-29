import { adminFetch } from './adminFetch'

const API_URL = "http://localhost:8000"

export async function getCategoriesAdmin() {
  const res = await fetch(`${API_URL}/categories/`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export async function createCategory(name) {
  const res = await adminFetch(`/categories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error("Failed to create category")
  return res.json()
}

export async function updateCategory(id, name) {
  const res = await adminFetch(`/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error("Failed to update category")
  return res.json()
}

export async function deleteCategory(id) {
  const res = await adminFetch(`/categories/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete category")
  return res.json()
}

export async function uploadCategoryImage(id, file) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await adminFetch(`/categories/${id}/upload-image`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload image")
  return res.json()
}