const API_URL = "http://localhost:8000"

export async function getApprovedReviews(productId) {
  const res = await fetch(`${API_URL}/reviews/product/${productId}`)
  if (!res.ok) throw new Error("Failed to fetch reviews")
  return res.json()
}

export async function submitReview(productId, customerName, rating, comment) {
  const res = await fetch(`${API_URL}/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer_name: customerName,
      rating,
      comment: comment || null,
      product_id: productId,
    }),
  })
  if (!res.ok) throw new Error("Failed to submit review")
  return res.json()
}

export async function uploadReviewImage(reviewId, file) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch(`${API_URL}/reviews/${reviewId}/upload-image`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload review image")
  return res.json()
}