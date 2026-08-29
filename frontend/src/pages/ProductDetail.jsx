import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { getProduct } from '../api/products'
import { getApprovedReviews, submitReview, uploadReviewImage } from '../api/reviews'

const statusStyles = {
  available: { label: "Available", classes: "bg-green-100 text-green-700" },
  rented_out: { label: "Rented Out", classes: "bg-amber-100 text-amber-700" },
  coming_soon: { label: "Coming Soon", classes: "bg-blue-100 text-blue-700" },
}

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewPhoto, setReviewPhoto] = useState(null)
  useEffect(() => {
    setLoading(true)
    getProduct(productId)
      .then((data) => {
        setProduct(data)
        const cover = data.images?.find((img) => img.is_cover === 1) || data.images?.[0]
        setActiveImage(cover?.image_url || null)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [productId])

  useEffect(() => {
    setReviewsLoading(true)
    getApprovedReviews(productId)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false))
  }, [productId])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewName.trim()) return
    setReviewError('')
    setReviewSubmitting(true)
    try {
      const newReview = await submitReview(productId, reviewName.trim(), reviewRating, reviewComment.trim())
      if (reviewPhoto) {
        await uploadReviewImage(newReview.id, reviewPhoto)
      }
      setReviewSubmitted(true)
      setShowReviewForm(false)
      setReviewName('')
      setReviewRating(5)
      setReviewComment('')
      setReviewPhoto(null)
    } catch (err) {
      setReviewError('Failed to submit review. Please try again.')
    } finally {
      setReviewSubmitting(false)
    }
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <Link to="/catalogue" className="text-pink-600 font-medium">Back to Catalogue</Link>
      </div>
    )
  }

  const status = statusStyles[product.status] || statusStyles.available
  const whatsappNumber = "919999999999" // same number as WhatsAppButton.jsx — replace with real number
  const whatsappMessage = `Hi! I'm interested in "${product.name}". Is it available?`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => {
          if (location.key !== 'default') {
            navigate(-1)
          } else {
            navigate('/catalogue')
          }
        }}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-pink-600 mb-5 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3">
            {activeImage ? (
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image yet</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.image_url)}
                  className={`shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 ${activeImage === img.image_url ? 'border-pink-500' : 'border-gray-200'
                    }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div>
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${status.classes}`}>
            {status.label}
          </span>
          <h1 className="font-brand text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          {product.rent_price && (
            <p className="text-pink-600 font-semibold text-xl mb-4">
              ₹{product.rent_price} <span className="text-gray-400 font-normal text-sm">/ rent</span>
            </p>
          )}
          {product.status === 'rented_out' && product.available_from && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4 inline-block">
              Available from {new Date(product.available_from).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          )}

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Select Size</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    disabled={size.is_available === 0}
                    className={`min-w-[3rem] px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${size.is_available === 0
                        ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                        : 'border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600'
                      }`}
                  >
                    {size.size_label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enquiry buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2 pt-2 border-t border-gray-100">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl text-center transition-colors shadow-md shadow-green-500/20 mt-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
              </svg>
              Enquire on WhatsApp
            </a>
            <a
              href={`tel:+${whatsappNumber}`}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3.5 rounded-xl text-center transition-colors shadow-md shadow-gray-900/20 mt-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call to Book
            </a>
          </div>
        </div>
      </div>

      {/* Related Accessories */}
      {product.related_products?.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="font-brand text-xl md:text-2xl font-bold text-gray-800 mb-4">
            You May Also Like
          </h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {product.related_products.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="group shrink-0 w-36 md:w-44 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                  {related.images?.[0]?.image_url ? (
                    <img
                      src={related.images[0].image_url}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-gray-800 text-sm font-medium line-clamp-2 mb-1">{related.name}</p>
                  {related.rent_price && (
                    <p className="text-pink-600 text-sm font-semibold">₹{related.rent_price}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="font-brand text-xl md:text-2xl font-bold text-gray-800">
              Customer Reviews
            </h2>
            {averageRating && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg
                      key={n}
                      className={`w-4 h-4 ${n <= Math.round(averageRating) ? 'text-amber-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.83 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {averageRating} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}
          </div>
          {!showReviewForm && !reviewSubmitted && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="text-sm font-medium text-pink-600 border border-pink-200 hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {reviewSubmitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-5">
            Thank you for your review!
          </div>
        )}

        {/* Review form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) =>
                  n <= reviewRating ? (
                    <button key={n} type="button" onClick={() => setReviewRating(n)} className="p-0.5">
                      <svg className="w-7 h-7 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.83 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    </button>
                  ) : (
                    <button key={n} type="button" onClick={() => setReviewRating(n)} className="p-0.5">
                      <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review (optional)</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Add a Photo (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReviewPhoto(e.target.files[0])}
                className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:border-pink-300 hover:file:text-pink-600"
              />
            </div>
            {reviewError && <p className="text-red-600 text-sm">{reviewError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={reviewSubmitting}
                className="bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews list */}
        {reviewsLoading ? (
          <p className="text-sm text-gray-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-gray-400">No reviews yet — be the first to share your experience.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-800 text-sm">{review.customer_name}</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <svg
                        key={n}
                        className={`w-3.5 h-3.5 ${n <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.83 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>
                </div>
                {review.comment && <p className="text-sm text-gray-600 mb-2">{review.comment}</p>}
                {review.image_url && (
                  <img src={review.image_url} alt="Customer photo" className="w-20 h-20 rounded-lg object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail