import { adminFetch } from './adminFetch'

const API_URL = "http://localhost:8000"

export async function getProductsAdmin() {
  const res = await fetch(`${API_URL}/products/`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function createProduct(data) {
  const res = await adminFetch(`/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return res.json()
}

export async function updateProduct(id, data) {
  const res = await adminFetch(`/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteProduct(id) {
  const res = await adminFetch(`/products/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}

export async function getProductAdmin(id) {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function uploadProductImage(productId, file, isCover) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await adminFetch(`/products/${productId}/upload-image?is_cover=${isCover}`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload image")
  return res.json()
}

export async function addProductSize(productId, sizeLabel, isAvailable) {
  const res = await adminFetch(`/product-sizes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ size_label: sizeLabel, is_available: isAvailable, product_id: productId }),
  })
  if (!res.ok) throw new Error("Failed to add size")
  return res.json()
}

export async function getAllProductsForLinking() {
  const res = await fetch(`${API_URL}/products/`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function linkRelatedProduct(productId, relatedProductId) {
  const res = await adminFetch(`/products/link-related`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, related_product_id: relatedProductId }),
  })
  if (!res.ok) throw new Error("Failed to link product")
  return res.json()
}

export async function deleteProductImage(imageId) {
  const res = await adminFetch(`/products/images/${imageId}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete image")
  return res.json()
}

export async function setCoverImage(imageId) {
  const res = await adminFetch(`/products/images/${imageId}/set-cover`, { method: "PATCH" })
  if (!res.ok) throw new Error("Failed to set cover image")
  return res.json()
}

export async function deleteProductSize(sizeId) {
  const res = await adminFetch(`/sizes/product-sizes/${sizeId}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete size")
  return res.json()
}