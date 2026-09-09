import { useState, useEffect } from 'react'
import {
  getSizeChartsAdmin,
  createSizeChart,
  updateSizeChart,
  uploadSizeChartImage,
  deleteSizeChart,
} from '../../api/adminSizeCharts'

function AdminSizeCharts() {
  const [chart, setChart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [newChartText, setNewChartText] = useState('')
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [uploading, setUploading] = useState(false)

  const loadData = () => {
    setLoading(true)
    getSizeChartsAdmin()
      .then((data) => setChart(data[0] || null))
      .catch(() => setError('Failed to load size chart'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createSizeChart(newChartText.trim())
      setNewChartText('')
      loadData()
    } catch (err) {
      setError('Failed to create size chart')
    }
  }

  const startEdit = () => {
    setEditing(true)
    setEditText(chart.chart_text || '')
  }

  const handleUpdate = async () => {
    setError('')
    try {
      await updateSizeChart(chart.id, editText.trim())
      setEditing(false)
      loadData()
    } catch (err) {
      setError('Failed to update size chart')
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return
    setError('')
    setUploading(true)
    try {
      await uploadSizeChartImage(chart.id, file)
      loadData()
    } catch (err) {
      setError('Failed to upload chart image')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete the size chart? It will stop showing on all product pages.')) return
    setError('')
    try {
      await deleteSizeChart(chart.id)
      loadData()
    } catch (err) {
      setError('Failed to delete size chart')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Size Chart</h1>
      <p className="text-gray-500 text-sm mb-6">
        One size chart, shown to customers on every product page.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : !chart ? (
        <form onSubmit={handleCreate} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-gray-800 text-sm">Add Size Chart</h2>
          <textarea
            value={newChartText}
            onChange={(e) => setNewChartText(e.target.value)}
            placeholder="e.g. S: Bust 34, Waist 28 | M: Bust 36, Waist 30 | L: Bust 38, Waist 32"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Add Chart
          </button>
          <p className="text-xs text-gray-400">
            You can upload a chart image right after adding this.
          </p>
        </form>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          {chart.chart_image_url && (
            <img src={chart.chart_image_url} alt="Size chart" className="w-full max-w-sm rounded-lg border border-gray-100 mb-3" />
          )}

          {editing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 px-3 py-1.5 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-3">
              {chart.chart_text || <span className="text-gray-400">No text info added.</span>}
            </p>
          )}

          {!editing && (
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100">
              <label className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                uploading
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-gray-600 hover:text-pink-600 cursor-pointer border-gray-200 hover:border-pink-300'
              }`}>
                {uploading ? 'Uploading...' : chart.chart_image_url ? 'Change Chart Image' : 'Add Chart Image'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </label>
              <button
                onClick={startEdit}
                className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
              >
                Edit Text
              </button>
              <button
                onClick={handleDelete}
                className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminSizeCharts