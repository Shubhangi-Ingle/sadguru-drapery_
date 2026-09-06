import { useState, useEffect, useRef } from 'react'
import {
  getDesignsAdmin,
  getDesignsCount,
  uploadDesign,
  updateDesign,
  deleteDesign,
} from '../../api/adminDesigns'

const PAGE_SIZE = 24

function AdminDesigns() {
  const [designs, setDesigns] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0, failed: 0 })

  const [editingId, setEditingId] = useState(null)
  const [editCaption, setEditCaption] = useState('')

  const fileInputRef = useRef(null)

  const loadDesigns = () => {
    setLoading(true)
    Promise.all([getDesignsAdmin(0, PAGE_SIZE), getDesignsCount()])
      .then(([data, countData]) => {
        setDesigns(data)
        setTotalCount(countData.total)
      })
      .catch(() => setError('Failed to load designs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDesigns()
  }, [])

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setError('')
    setUploading(true)
    setUploadProgress({ done: 0, total: files.length, failed: 0 })

    let failedCount = 0
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadDesign(files[i], null)
      } catch (err) {
        failedCount++
      }
      setUploadProgress({ done: i + 1, total: files.length, failed: failedCount })
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    loadDesigns()
  }

  const startEdit = (design) => {
    setEditingId(design.id)
    setEditCaption(design.caption || '')
  }

  const handleSaveCaption = async (id) => {
    setError('')
    try {
      await updateDesign(id, editCaption.trim() || null)
      setEditingId(null)
      loadDesigns()
    } catch (err) {
      setError('Failed to update caption')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design photo?')) return
    setError('')
    try {
      await deleteDesign(id)
      loadDesigns()
    } catch (err) {
      setError('Failed to delete design')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Design Gallery</h1>
      <p className="text-gray-500 text-sm mb-6">
        Upload photos to showcase on the public design gallery. {totalCount} design{totalCount !== 1 ? 's' : ''} total.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Bulk upload */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <label
          className={`inline-block text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors ${
            uploading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#7A1F2B] hover:bg-[#5C1620] text-white cursor-pointer'
          }`}
        >
          {uploading ? 'Uploading...' : '+ Upload Photos'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={handleFilesSelected}
          />
        </label>
        <p className="text-xs text-gray-400 mt-2">
          Select multiple photos at once — they'll upload one by one in the background.
        </p>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-[#7A1F2B] h-2 rounded-full transition-all duration-200"
                style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Uploading {uploadProgress.done} of {uploadProgress.total}
              {uploadProgress.failed > 0 && (
                <span className="text-red-600"> — {uploadProgress.failed} failed</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Gallery grid */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : designs.length === 0 ? (
        <p className="text-gray-400 text-sm">No designs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {designs.map((design) => (
            <div key={design.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img src={design.image_url} alt={design.caption || ''} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                {editingId === design.id ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder="Add caption..."
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#7A1F2B]"
                    />
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleSaveCaption(design.id)}
                        className="text-[10px] font-semibold text-white bg-[#7A1F2B] px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-gray-600 truncate mb-1.5">
                      {design.caption || <span className="text-gray-300">No caption</span>}
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => startEdit(design)}
                        className="text-[10px] font-medium text-gray-600 border border-gray-200 px-2 py-1 rounded hover:border-[#7A1F2B] hover:text-[#7A1F2B]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(design.id)}
                        className="text-[10px] font-medium text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {designs.length < totalCount && !loading && (
        <p className="text-center text-sm text-gray-400 mt-6">
          Showing {designs.length} of {totalCount} — pagination for viewing more coming in the public gallery page.
        </p>
      )}
    </div>
  )
}

export default AdminDesigns