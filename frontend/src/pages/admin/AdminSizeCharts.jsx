import { useState, useEffect } from 'react'
import { getProductsAdmin, uploadProductSizeChart, deleteProductSizeChart } from '../../api/adminProducts'

function AdminSizeCharts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [uploadingId, setUploadingId] = useState(null)

  const loadData = () => {
    setLoading(true)
    getProductsAdmin()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUpload = async (productId, file) => {
    if (!file) return
    setError('')
    setUploadingId(productId)
    try {
      await uploadProductSizeChart(productId, file)
      loadData()
    } catch (err) {
      setError('Failed to upload size chart')
    } finally {
      setUploadingId(null)
    }
  }

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Remove the size chart for "${productName}"?`)) return
    setError('')
    try {
      await deleteProductSizeChart(productId)
      loadData()
    } catch (err) {
      setError('Failed to remove size chart')
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Size Charts</h1>
      <p className="text-gray-500 text-sm mb-6">
        Upload a size chart image for each product — shown to customers on that product's page.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
      />

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-400 text-sm">No products found.</p>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <img
                src={product.images?.[0]?.image_url}
                alt=""
                className="w-14 h-14 rounded-lg object-cover border border-gray-100 shrink-0 bg-gray-50"
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-xs text-gray-400">
                  {product.size_chart_image_url ? 'Size chart added' : 'No size chart yet'}
                </p>
              </div>

              {product.size_chart_image_url && (
                <img
                  src={product.size_chart_image_url}
                  alt="Size chart"
                  className="w-14 h-14 rounded-lg object-cover border border-gray-100 shrink-0"
                />
              )}

              <div className="flex items-center gap-2 shrink-0">
                <label className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                  uploadingId === product.id
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-gray-600 hover:text-pink-600 cursor-pointer border-gray-200 hover:border-pink-300'
                }`}>
                  {uploadingId === product.id
                    ? 'Uploading...'
                    : product.size_chart_image_url ? 'Change' : 'Add Chart'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingId === product.id}
                    onChange={(e) => handleUpload(product.id, e.target.files[0])}
                  />
                </label>
                {product.size_chart_image_url && (
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminSizeCharts