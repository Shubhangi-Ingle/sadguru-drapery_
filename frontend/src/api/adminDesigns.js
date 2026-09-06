import { adminFetch } from './adminFetch'

const API_URL = import.meta.env.VITE_API_URL

export async function getDesignsAdmin(skip = 0, limit = 24) {
  const res = await fetch(`${API_URL}/designs/?skip=${skip}&limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch designs")
  return res.json()
}

export async function getDesignsCount() {
  const res = await fetch(`${API_URL}/designs/count`)
  if (!res.ok) throw new Error("Failed to fetch count")
  return res.json()
}

export async function uploadDesign(file, caption) {
  const formData = new FormData()
  formData.append("file", file)
  if (caption) formData.append("caption", caption)
  const res = await adminFetch(`/designs/upload`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload design")
  return res.json()
}

export async function updateDesign(id, caption) {
  const res = await adminFetch(`/designs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ caption }),
  })
  if (!res.ok) throw new Error("Failed to update design")
  return res.json()
}

export async function deleteDesign(id) {
  const res = await adminFetch(`/designs/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete design")
  return res.json()
}