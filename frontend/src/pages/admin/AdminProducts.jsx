import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategoriesAdmin } from '../../api/adminCategories'
import { getProductsAdmin, createProduct, updateProduct, deleteProduct } from '../../api/adminProducts'

const emptyForm = {
  name: '',
  description: '',
  rent_price: '',
  original_price: '',
  status: 'available',
  available_from: '',
  category_id: '',
  subcategory_id: '',
}

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [filterCategoryId, setFilterCategoryId] = useState('all')

  const loadData = () => {
    setLoading(true)
    Promise.all([getProductsAdmin(), getCategoriesAdmin()])
      .then(([prodData, catData]) => {
        setProducts(prodData)
        setCategories(catData)
      })
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || 'Unknown'
  const activeFormCategory = categories.find((c) => String(c.id) === String(form.category_id))

  const visibleProducts =
    filterCategoryId === 'all'
      ? products
      : products.filter((p) => String(p.category_id) === filterCategoryId)

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const startCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const startEdit = (product) => {
    setForm({
      name: product.name || '',
      description: product.description || '',
      rent_price: product.rent_price ?? '',
      original_price: product.original_price ?? '',
      status: product.status || 'available',
      available_from: product.available_from || '',
      category_id: product.category_id ?? '',
      subcategory_id: product.subcategory_id ?? '',
    })

    setEditingId(product.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.category_id) {
      setError('Name and Category are required')
      return
    }
    setError('')

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      rent_price: form.rent_price ? Number(form.rent_price) : null,
      original_price: form.original_price ? Number(form.original_price) : null,
      status: form.status,
      available_from: form.status === 'rented_out' && form.available_from ? form.available_from : null,
      category_id: Number(form.category_id),
      subcategory_id: form.subcategory_id ? Number(form.subcategory_id) : null,
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }
      resetForm()
      loadData()
    } catch (err) {
      setError('Failed to save product')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete product "${name}"? This also removes its images, sizes, and reviews.`)) return
    setError('')
    try {
      await deleteProduct(id)
      loadData()
    } catch (err) {
      setError('Failed to delete product')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={startCreate}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Add Product
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-6">Manage your costume catalogue.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-800">{editingId ? 'Edit Product' : 'New Product'}</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={form.rent_price}
                onChange={(e) => setForm({ ...form, rent_price: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price / MRP (₹) — optional</label>
              <input
                type="number"
                value={form.original_price}
                onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                placeholder="Leave blank for no discount shown"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="available">Available</option>
                <option value="rented_out">Rented Out</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
          </div>

          {form.status === 'rented_out' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
              <input
                type="date"
                value={form.available_from}
                onChange={(e) => setForm({ ...form, available_from: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value, subcategory_id: '' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory (optional)</label>
              <select
                value={form.subcategory_id}
                onChange={(e) => setForm({ ...form, subcategory_id: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                disabled={!activeFormCategory}
              >
                <option value="">None</option>
                {activeFormCategory?.subcategories?.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {editingId ? 'Save Changes' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mr-2">Filter by category:</label>
        <select
          value={filterCategoryId}
          onChange={(e) => setFilterCategoryId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Product list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : visibleProducts.length === 0 ? (
        <p className="text-gray-400 text-sm">No products found.</p>
      ) : (
        <div className="space-y-3">
          {visibleProducts.map((product) => {
            const cover = product.images?.find((img) => img.is_cover === 1)?.image_url || product.images?.[0]?.image_url
            return (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {cover ? (
                      <img src={cover} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">
                      {categoryName(product.category_id)} · {product.status.replace('_', ' ')}
                      {product.rent_price ? ` · ₹${product.rent_price}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
                  >
                    Manage Photos / Sizes
                  </Link>
                  <button
                    onClick={() => startEdit(product)}
                    className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminProducts