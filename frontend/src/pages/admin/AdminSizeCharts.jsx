import { useState, useEffect } from 'react'
import { getCategoriesAdmin } from '../../api/adminCategories'
import {
  getSizeChartsAdmin,
  createSizeChart,
  updateSizeChart,
  uploadSizeChartImage,
  deleteSizeChart,
} from '../../api/adminSizeCharts'

function AdminSizeCharts() {
  const [categories, setCategories] = useState([])
  const [charts, setCharts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [newCategoryId, setNewCategoryId] = useState('')
  const [newChartText, setNewChartText] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [uploadingId, setUploadingId] = useState(null)

  const loadData = () => {
    setLoading(true)
    Promise.all([getCategoriesAdmin(), getSizeChartsAdmin()])
      .then(([catData, chartData]) => {
        setCategories(catData)
        setCharts(chartData)
      })
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || 'Unknown'
  const categoriesWithoutChart = categories.filter((c) => !charts.some((ch) => ch.category_id === c.id))

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newCategoryId) return
    setError('')
    try {
      await createSizeChart(newCategoryId, newChartText.trim())
      setNewCategoryId('')
      setNewChartText('')
      loadData()
    } catch (err) {
      setError('Failed to create size chart')
    }
  }

  const startEdit = (chart) => {
    setEditingId(chart.id)
    setEditText(chart.chart_text || '')
  }

  const handleUpdate = async (id) => {
    setError('')
    try {
      await updateSizeChart(id, editText.trim())
      setEditingId(null)
      loadData()
    } catch (err) {
      setError('Failed to update size chart')
    }
  }

  const handleImageUpload = async (id, file) => {
    if (!file) return
    setError('')
    setUploadingId(id)
    try {
      await uploadSizeChartImage(id, file)
      loadData()
    } catch (err) {
      setError('Failed to upload chart image')
    } finally {
      setUploadingId(null)
    }
  }

  const handleDelete = async (id, catId) => {
    if (!window.confirm(`Delete size chart for "${categoryName(catId)}"?`)) return
    setError('')
    try {
      await deleteSizeChart(id)
      loadData()
    } catch (err) {
      setError('Failed to delete size chart')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Size Charts</h1>
      <p className="text-gray-500 text-sm mb-6">One size chart per category — shown to customers on product pages.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Add new chart */}
      {categoriesWithoutChart.length > 0 && (
        <form onSubmit={handleCreate} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-3">
          <h2 className="font-semibold text-gray-800 text-sm">Add Size Chart</h2>
          <select
            value={newCategoryId}
            onChange={(e) => setNewCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            required
          >
            <option value="">Select category...</option>
            {categoriesWithoutChart.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
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
        </form>
      )}

      {/* Chart list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : charts.length === 0 ? (
        <p className="text-gray-400 text-sm">No size charts yet — add one above.</p>
      ) : (
        <div className="space-y-3">
          {charts.map((chart) => (
            <div key={chart.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-medium text-gray-800 mb-2">{categoryName(chart.category_id)}</p>

              {chart.chart_image_url && (
                <img src={chart.chart_image_url} alt="Size chart" className="w-40 rounded-lg border border-gray-100 mb-3" />
              )}

              {editingId === chart.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(chart.id)}
                      className="text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 px-3 py-1.5 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-3">{chart.chart_text || <span className="text-gray-400">No text info added.</span>}</p>
              )}

              {editingId !== chart.id && (
                <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100">
                  <label className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                    uploadingId === chart.id
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-gray-600 hover:text-pink-600 cursor-pointer border-gray-200 hover:border-pink-300'
                  }`}>
                    {uploadingId === chart.id ? 'Uploading...' : chart.chart_image_url ? 'Change Chart Image' : 'Add Chart Image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingId === chart.id}
                      onChange={(e) => handleImageUpload(chart.id, e.target.files[0])}
                    />
                  </label>
                  <button
                    onClick={() => startEdit(chart)}
                    className="text-xs font-medium text-gray-600 hover:text-pink-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors"
                  >
                    Edit Text
                  </button>
                  <button
                    onClick={() => handleDelete(chart.id, chart.category_id)}
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

export default AdminSizeCharts