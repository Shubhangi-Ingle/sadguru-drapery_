import { useState, useEffect } from 'react'
import {
  getCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
} from '../../api/adminCategories'

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState('')
  const [uploadingId, setUploadingId] = useState(null)

  const loadCategories = () => {
    setLoading(true)
    getCategoriesAdmin()
      .then(setCategories)
      .catch(() => setError('Failed to load categories'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setError('')
    try {
      await createCategory(newName.trim())
      setNewName('')
      loadCategories()
    } catch (err) {
      setError('Failed to create category — name might already exist')
    }
  }

  const startEdit = (cat) => {
    setEditingId(cat.id)
    setEditName(cat.name)
  }

  const handleUpdate = async (id) => {
    if (!editName.trim()) return
    setError('')
    try {
      await updateCategory(id, editName.trim())
      setEditingId(null)
      loadCategories()
    } catch (err) {
      setError('Failed to update category')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? This cannot be undone.`)) return
    setError('')
    try {
      await deleteCategory(id)
      loadCategories()
    } catch (err) {
      setError('Failed to delete — this category may still have products or subcategories linked to it')
    }
  }

  const handleImageUpload = async (id, file) => {
    if (!file) return
    setError('')
    setUploadingId(id)
    try {
      await uploadCategoryImage(id, file)
      loadCategories()
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setUploadingId(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Categories</h1>
      <p className="text-gray-500 text-sm mb-6">Manage your top-level costume categories.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Add new category */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          Add Category
        </button>
      </form>

      {/* Category list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-400 text-sm">No categories yet — add one above.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4">
                {/* Cover image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {uploadingId === cat.id ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="animate-spin w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  ) : cat.cover_image_url ? (
                    <img src={cat.cover_image_url} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No image</div>
                  )}
                </div>

                {/* Name / edit field */}
                <div className="flex-1 min-w-0">
                  {editingId === cat.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        className="text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 px-3 py-1.5 rounded-lg shrink-0"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-gray-800 truncate">{cat.name}</p>
                      <p className="text-xs text-gray-400">
                        {cat.subcategories?.length || 0} subcategor{cat.subcategories?.length === 1 ? 'y' : 'ies'}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Actions — own row below, wraps cleanly on small screens */}
              {editingId !== cat.id && (
                <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
                  <label className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                    uploadingId === cat.id
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-gray-600 hover:text-pink-600 cursor-pointer border-gray-200 hover:border-pink-300'
                  }`}>
                    {uploadingId === cat.id ? 'Uploading...' : cat.cover_image_url ? 'Change Photo' : 'Add Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingId === cat.id}
                      onChange={(e) => handleImageUpload(cat.id, e.target.files[0])}
                    />
                  </label>
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCategories