import { useState, useEffect } from 'react'
import { getProductsAdmin } from '../../api/adminProducts'
import { getAllReviewsAdmin, approveReview, deleteReview } from '../../api/adminReviews'

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.83 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('pending') // pending | approved | all

  const loadData = () => {
    setLoading(true)
    Promise.all([getAllReviewsAdmin(), getProductsAdmin()])
      .then(([reviewData, productData]) => {
        setReviews(reviewData)
        setProducts(productData)
      })
      .catch(() => setError('Failed to load reviews'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const productName = (id) => products.find((p) => p.id === id)?.name || 'Unknown product'

  const visibleReviews = reviews.filter((r) => {
    if (filter === 'pending') return r.is_approved === 0
    if (filter === 'approved') return r.is_approved === 1
    return true
  })

  const pendingCount = reviews.filter((r) => r.is_approved === 0).length

  const handleApprove = async (id) => {
    setError('')
    try {
      await approveReview(id)
      loadData()
    } catch (err) {
      setError('Failed to approve review')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review? This cannot be undone.')) return
    setError('')
    try {
      await deleteReview(id)
      loadData()
    } catch (err) {
      setError('Failed to delete review')
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Reviews</h1>
      <p className="text-gray-500 text-sm mb-6">
        Approve customer reviews before they appear publicly on product pages.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: 'pending', label: `Pending${pendingCount > 0 ? ` (${pendingCount})` : ''}` },
          { key: 'approved', label: 'Approved' },
          { key: 'all', label: 'All' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              filter === tab.key ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : visibleReviews.length === 0 ? (
        <p className="text-gray-400 text-sm">
          {filter === 'pending' ? 'No pending reviews — all caught up.' : 'No reviews found.'}
        </p>
      ) : (
        <div className="space-y-3">
          {visibleReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  <p className="font-medium text-gray-800">{review.customer_name}</p>
                  <p className="text-xs text-gray-400">{productName(review.product_id)}</p>
                </div>
                <StarDisplay rating={review.rating} />
              </div>
              {review.comment && (
                <p className="text-sm text-gray-600 mt-2 mb-3">{review.comment}</p>
              )}
              <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100">
                {review.is_approved === 0 ? (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="text-xs font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1.5 rounded-lg">
                    Approved
                  </span>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminReviews