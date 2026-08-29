import { adminFetch } from './adminFetch'

export async function getAllReviewsAdmin() {
  const res = await adminFetch(`/reviews/all`)
  if (!res.ok) throw new Error("Failed to fetch reviews")
  return res.json()
}

export async function approveReview(id) {
  const res = await adminFetch(`/reviews/${id}/approve`, { method: "PATCH" })
  if (!res.ok) throw new Error("Failed to approve review")
  return res.json()
}

export async function deleteReview(id) {
  const res = await adminFetch(`/reviews/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete review")
  return res.json()
}