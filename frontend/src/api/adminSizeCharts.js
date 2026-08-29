import { adminFetch } from './adminFetch'

const API_URL = import.meta.env.VITE_API_URL

export async function getSizeChartsAdmin() {
  const res = await fetch(`${API_URL}/size-charts/`)
  if (!res.ok) throw new Error("Failed to fetch size charts")
  return res.json()
}

export async function createSizeChart(categoryId, chartText) {
  const res = await adminFetch(`/size-charts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_id: Number(categoryId), chart_text: chartText || null }),
  })
  if (!res.ok) throw new Error("Failed to create size chart")
  return res.json()
}

export async function uploadSizeChartImage(chartId, file) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await adminFetch(`/size-charts/${chartId}/upload-image`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload chart image")
  return res.json()
}

export async function updateSizeChart(chartId, chartText) {
  const res = await adminFetch(`/size-charts/${chartId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chart_text: chartText }),
  })
  if (!res.ok) throw new Error("Failed to update size chart")
  return res.json()
}

export async function deleteSizeChart(chartId) {
  const res = await adminFetch(`/size-charts/${chartId}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete size chart")
  return res.json()
}