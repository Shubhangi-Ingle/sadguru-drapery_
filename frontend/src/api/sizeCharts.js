const API_URL = import.meta.env.VITE_API_URL

export async function getSizeCharts() {
  const res = await fetch(`${API_URL}/size-charts/`)
  if (!res.ok) throw new Error("Failed to fetch size charts")
  return res.json()
}