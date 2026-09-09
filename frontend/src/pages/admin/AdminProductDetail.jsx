import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { uploadProductSizeChart, deleteProductSizeChart } from '../../api/adminProducts'
import {
  getProductAdmin,
  uploadProductImage,
  deleteProductImage,
  setCoverImage,
  addProductSize,
  deleteProductSize,
  getAllProductsForLinking,
  linkRelatedProduct,
} from '../../api/adminProducts'

function AdminProductDetail() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const [newSizeLabel, setNewSizeLabel] = useState('')
  const [newSizeAvailable, setNewSizeAvailable] = useState(true)
  const [newSizeRestockDate, setNewSizeRestockDate] = useState('')

  const [allProducts, setAllProducts] = useState([])
  const [relateId, setRelateId] = useState('')
  const [uploadingSizeChart, setUploadingSizeChart] = useState(false)

  const loadProduct = () => {
    setLoading(true)
    getProductAdmin(productId)
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProduct()
    getAllProductsForLinking().then(setAllProducts).catch(() => {})
  }, [productId])

  const handleImageUpload = async (file, isCover) => {
    if (!file) return
    setError('')
    setUploading(true)
    try {
      await uploadProductImage(productId, file, isCover)
      loadProduct()
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Delete this photo?')) return
    try {
      await deleteProductImage(imageId)
      loadProduct()
    } catch (err) {
      setError('Failed to delete image')
    }
  }

  const handleSetCover = async (imageId) => {
    try {
      await setCoverImage(imageId)
      loadProduct()
    } catch (err) {
      setError('Failed to set cover image')
    }
  }

  const handleAddSize = async (e) => {
    e.preventDefault()
    if (!newSizeLabel.trim()) return
    try {
      await addProductSize(productId, newSizeLabel.trim(), newSizeAvailable, newSizeRestockDate || null)
      setNewSizeLabel('')
      setNewSizeAvailable(true)
      setNewSizeRestockDate('')
      loadProduct()
    } catch (err) {
      setError('Failed to add size')
    }
  }

    const handleUploadSizeChart = async (file) => {
  if (!file) return
  setUploadingSizeChart(true)
  try {
    const updated = await uploadProductSizeChart(productId, file)
    setProduct(updated)
  } catch (err) {
    setError('Failed to upload size chart')
  } finally {
    setUploadingSizeChart(false)
  }
}

const handleDeleteSizeChart = async () => {
  if (!window.confirm('Remove the size chart for this product?')) return
  try {
    const updated = await deleteProductSizeChart(productId)
    setProduct(updated)
  } catch (err) {
    setError('Failed to remove size chart')
  }
}
  const handleDeleteSize = async (sizeId) => {
    try {
      await deleteProductSize(sizeId)
      loadProduct()
    } catch (err) {
      setError('Failed to delete size')
    }
  }

  const handleLinkRelated = async (e) => {
    e.preventDefault()
    if (!relateId) return
    try {
      await linkRelatedProduct(productId, Number(relateId))
      setRelateId('')
      loadProduct()
    } catch (err) {
      setError('Failed to link product')
    }
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading...</div>
  if (!product) return <div className="p-8 text-gray-400 text-sm">Product not found.</div>

  const otherProducts = allProducts.filter(
    (p) => p.id !== product.id && !product.related_products?.some((r) => r.id === p.id)
  )

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <Link to="/admin/products" className="text-sm text-gray-500 hover:text-pink-600 mb-3 inline-block">
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>
      <p className="text-gray-500 text-sm mb-6">Manage photos, sizes, and related accessories.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Photos */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Photos</h2>
        <div className="flex gap-3 flex-wrap mb-4">
          {product.images?.map((img) => (
            <div key={img.id} className="relative w-24 h-28 rounded-lg overflow-hidden border-2 border-gray-100 group">
              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              {img.is_cover === 1 && (
                <span className="absolute top-1 left-1 bg-pink-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                {img.is_cover !== 1 && (
                  <button
                    onClick={() => handleSetCover(img.id)}
                    className="text-[10px] text-white bg-pink-600 hover:bg-pink-700 px-2 py-1 rounded"
                  >
                    Set Cover
                  </button>
                )}
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="text-[10px] text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className={`inline-block text-sm font-medium px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
          uploading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:border-pink-400 hover:text-pink-600'
        }`}>
          {uploading ? 'Uploading...' : '+ Add Photo'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleImageUpload(e.target.files[0], !product.images || product.images.length === 0)}
          />
        </label>
      </section>

      {/* Sizes */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Sizes</h2>
        <div className="flex gap-2 flex-wrap mb-4">
          {product.sizes?.map((size) => (
            <div key={size.id} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5">
              <span className={`text-sm font-medium ${size.is_available === 0 ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {size.size_label}
              </span>
              {size.is_available === 0 && size.restock_date && (
                <span className="text-[10px] text-amber-600">
                  ({new Date(size.restock_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})
                </span>
              )}
              <button onClick={() => handleDeleteSize(size.id)} className="text-gray-400 hover:text-red-600 text-xs">✕</button>
            </div>
          ))}
        </div>
        {/* Size Chart */}
<div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">
  <h2 className="font-semibold text-gray-800 mb-3">Size Chart</h2>
  {product.size_chart_image_url && (
    <img src={product.size_chart_image_url} alt="Size chart" className="w-48 rounded-lg border border-gray-100 mb-3" />
  )}
  <div className="flex items-center gap-2 flex-wrap">
    <label className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
      uploadingSizeChart
        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
        : 'text-gray-600 hover:text-pink-600 cursor-pointer border-gray-200 hover:border-pink-300'
    }`}>
      {uploadingSizeChart ? 'Uploading...' : product.size_chart_image_url ? 'Change Size Chart' : 'Add Size Chart'}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploadingSizeChart}
        onChange={(e) => handleUploadSizeChart(e.target.files[0])}
      />
    </label>
    {product.size_chart_image_url && (
      <button
        onClick={handleDeleteSizeChart}
        className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
      >
        Remove
      </button>
    )}
  </div>
</div>
        <form onSubmit={handleAddSize} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={newSizeLabel}
            onChange={(e) => setNewSizeLabel(e.target.value)}
            placeholder="e.g. S, M, L, 6-8 yrs"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <label className="flex items-center gap-1.5 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={newSizeAvailable}
              onChange={(e) => setNewSizeAvailable(e.target.checked)}
            />
            Available
          </label>
          {!newSizeAvailable && (
            <input
              type="date"
              value={newSizeRestockDate}
              onChange={(e) => setNewSizeRestockDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              title="Expected restock date (optional)"
            />
          )}
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Add Size
          </button>
        </form>
      </section>

      {/* Related accessories */}
      <section className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-800 mb-3">Related Accessories</h2>
        <div className="flex gap-3 flex-wrap mb-4">
          {product.related_products?.length > 0 ? (
            product.related_products.map((rel) => (
              <Link
                key={rel.id}
                to={`/admin/products/${rel.id}`}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:border-pink-300 hover:text-pink-600"
              >
                {rel.name}
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400">No related products linked yet.</p>
          )}
        </div>
        <form onSubmit={handleLinkRelated} className="flex flex-wrap items-center gap-2">
          <select
            value={relateId}
            onChange={(e) => setRelateId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value="">Select a product to link...</option>
            {otherProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Link Product
          </button>
        </form>
      </section>
    </div>
  )
}

export default AdminProductDetail