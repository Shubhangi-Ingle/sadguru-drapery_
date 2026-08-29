import { useState, useEffect } from 'react'
import { getCategoriesAdmin } from '../../api/adminCategories'
import {
  getSubcategoriesAdmin,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from '../../api/adminSubcategories'

function AdminSubcategories() {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filterCategoryId, setFilterCategoryId] = useState('all')
  const [newName, setNewName] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  const loadData = () => {
    setLoading(true)
    Promise.all([getCategoriesAdmin(), getSubcategoriesAdmin()])
      .then(([catData, subData]) => {
        setCategories(catData)
        setSubcategories(subData)
        if (!newCategoryId && catData.length > 0) setNewCategoryId(String(catData[0].id))
      })
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || 'Unknown'

  const visibleSubcategories =
    filterCategoryId === 'all'
      ? subcategories
      : subcategories.filter((s) => String(s.category_id) === filterCategoryId)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim() || !newCategoryId) return
    setError('')
    try {
      await createSubcategory(newName.trim(), newCategoryId)
      setNewName('')
      loadData()
    } catch (err) {
      setError('Failed to create subcategory')
    }
  }

  const startEdit = (sub) => {
    setEditingId(sub.id)
    setEditName(sub.name)
  }

  const handleUpdate = async (id) => {
    if (!editName.trim()) return
    setError('')
    try {
      await updateSubcategory(id, editName.trim())
      setEditingId(null)
      loadData()
    } catch (err) {
      setError('Failed to update subcategory')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete subcategory "${name}"? This cannot be undone.`)) return
    setError('')
    try {
      await deleteSubcategory(id)
      loadData()
    } catch (err) {
      setError('Failed to delete — this subcategory may still have products linked to it')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Subcategories</h1>
      <p className="text-gray-500 text-sm mb-6">Manage subcategories within each category.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Add new subcategory */}
      <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-2 mb-6">
        <select
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 sm:w-56"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New subcategory name..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shrink-0"
        >
          Add Subcategory
        </button>
      </form>

      {/* Filter dropdown */}
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

      {/* Subcategory list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : visibleSubcategories.length === 0 ? (
        <p className="text-gray-400 text-sm">No subcategories found — add one above.</p>
      ) : (
        <div className="space-y-3">
          {visibleSubcategories.map((sub) => (
            <div key={sub.id} className="bg-white border border-gray-200 rounded-xl p-4">
              {editingId === sub.id ? (
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <button
                    onClick={() => handleUpdate(sub.id)}
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
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">{sub.name}</p>
                      <p className="text-xs text-gray-400">{categoryName(sub.category_id)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => startEdit(sub)}
                      className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sub.id, sub.name)}
                      className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminSubcategories