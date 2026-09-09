import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { getProduct } from '../api/products'
import { getApprovedReviews, submitReview, uploadReviewImage } from '../api/reviews'
import { WHATSAPP_NUMBER } from '../config'
import { optimizeImage } from '../utils/cloudinary'
import { getSizeCharts } from '../api/sizeCharts'

const statusStyles = {
  available: { label: "In Production", classes: "bg-green-100 text-green-700" },
  rented_out: { label: "Made to Order", classes: "bg-amber-100 text-amber-700" },
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
  const [sizeCharts, setSizeCharts] = useState([])
  const [showAvailability, setShowAvailability] = useState(false)
  const [showSizeChart, setShowSizeChart] = useState(false)

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

  useEffect(() => {
    getSizeCharts().then(setSizeCharts).catch(() => setSizeCharts([]))
  }, [])

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
      setReviewError('Could not submit your review. Please try again.')
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
        <p className="text-gray-500 mb-4">That design isn't available.</p>
        <Link to="/catalogue" className="text-[#7A1F2B] font-semibold hover:text-[#B8863B] transition-colors">
          Back to Catalogue
        </Link>
      </div>
    )
  }

  const status = statusStyles[product.status] || statusStyles.available
  const whatsappMessage = `Hi! I'd like a bulk rate for "${product.name}".`

  return (
    <div className="bg-[#FDF8F1]">
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
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#7A1F2B] mb-5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] bg-[#FBF3E9] rounded-xl overflow-hidden mb-3 ring-1 ring-[#B8863B]/15">
              {activeImage ? (
                <img src={optimizeImage(activeImage, 800)} alt={product.name} className="w-full h-full object-cover" />
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
                    className={`shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === img.image_url ? 'border-[#B8863B]' : 'border-[#B8863B]/20'
                      }`}
                  >
                    <img src={optimizeImage(img.image_url, 150)} alt="" loading="lazy" className="w-full h-full object-cover" />
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
            <h1 className="font-display text-2xl md:text-3xl text-gray-900 mb-2">
              {product.name}
            </h1>
            {product.rent_price ? (
              <p className="text-[#7A1F2B] font-semibold text-xl mb-4">
                ₹{product.rent_price}
                <span className="text-gray-400 font-normal text-sm ml-1.5">
                  / piece · bulk rate on enquiry
                </span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm mb-4">Price on enquiry</p>
            )}
            {product.status === 'rented_out' && product.available_from && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4 inline-block">
                Next batch from {new Date(product.available_from).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Size selector + Check Availability + Size Chart */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700">Select Size</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowAvailability(true)}
                      className="text-xs font-semibold text-[#7A1F2B] hover:underline"
                    >
                      Check Availability
                    </button>
                    {sizeCharts.some((c) => c.category_id === product.category_id) && (
                      <button
                        onClick={() => setShowSizeChart(!showSizeChart)}
                        className="text-xs font-semibold text-[#7A1F2B] hover:underline"
                      >
                        {showSizeChart ? 'Hide Size Chart' : 'Size Chart'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
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

                {/* Inline Size Chart */}
                {showSizeChart && (
                  <div className="border border-gray-200 rounded-xl p-4 mb-3">
                    {sizeCharts
                      .filter((c) => c.category_id === product.category_id)
                      .map((chart) => (
                        <div key={chart.id}>
                          {chart.chart_image_url && (
                            <img src={chart.chart_image_url} alt="Size chart" className="w-full rounded-lg mb-3" />
                          )}
                          {chart.chart_text && (
                            <p className="text-sm text-gray-600 leading-relaxed">{chart.chart_text}</p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Enquiry buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-2 pt-2 border-t border-[#B8863B]/20">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#20A44E] to-[#158A3E] hover:from-[#1c9346] hover:to-[#117535] text-white font-semibold px-6 py-3.5 rounded-xl text-center transition-colors shadow-md shadow-green-700/20 mt-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
                </svg>
                Enquire on Whatsapp
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3.5 rounded-xl text-center transition-colors shadow-md shadow-gray-900/20 mt-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {product.related_products?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#B8863B]/20">
            <h2 className="font-display-sm text-xl md:text-2xl text-gray-900 mb-4">
              You May Also Like
            </h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {product.related_products.map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  className="group shrink-0 w-36 md:w-44 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ring-1 ring-[#B8863B]/15"
                >
                  <div className="aspect-[3/4] bg-[#FBF3E9] overflow-hidden">
                    {related.images?.[0]?.image_url ? (
                      <img
                        src={optimizeImage(related.images[0].image_url, 300)}
                        alt={related.name}
                        loading="lazy"
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
                      <p className="text-[#7A1F2B] text-sm font-semibold">₹{related.rent_price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-12 pt-8 border-t border-[#B8863B]/20">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div>
              <h2 className="font-display-sm text-xl md:text-2xl text-gray-900">
                Customer Reviews
              </h2>
              {averageRating && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <svg
                        key={n}
                        className={`w-4 h-4 ${n <= Math.round(averageRating) ? 'text-[#B8863B]' : 'text-gray-200'}`}
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
                className="text-sm font-medium text-[#7A1F2B] border border-[#B8863B]/30 hover:bg-[#FBF3E9] px-4 py-2 rounded-lg transition-colors"
              >
                Write a Review
              </button>
            )}
          </div>

          {reviewSubmitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-5">
              Thank you for your review — it'll appear once approved.
            </div>
          )}

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white border border-[#B8863B]/20 rounded-xl p-5 mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-[#B8863B]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7A1F2B] focus:ring-4 focus:ring-[#7A1F2B]/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) =>
                    n <= reviewRating ? (
                      <button key={n} type="button" onClick={() => setReviewRating(n)} className="p-0.5">
                        <svg className="w-7 h-7 text-[#B8863B]" fill="currentColor" viewBox="0 0 20 20">
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
                  className="w-full border border-[#B8863B]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7A1F2B] focus:ring-4 focus:ring-[#7A1F2B]/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add a Photo (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReviewPhoto(e.target.files[0])}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-[#B8863B]/30 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:border-[#B8863B] hover:file:text-[#7A1F2B]"
                />
              </div>
              {reviewError && <p className="text-red-600 text-sm">{reviewError}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="bg-[#7A1F2B] hover:bg-[#5C1620] disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
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

          {reviewsLoading ? (
            <p className="text-sm text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet — be the first to share your experience.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-[#B8863B]/15 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-800 text-sm">{review.customer_name}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <svg
                          key={n}
                          className={`w-3.5 h-3.5 ${n <= review.rating ? 'text-[#B8863B]' : 'text-gray-200'}`}
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
                    <img src={review.image_url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Check Availability Modal */}
      {showAvailability && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAvailability(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-lg">
                Style Availability — {product.name}
              </h3>
              <button onClick={() => setShowAvailability(false)} className="text-gray-400 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-500 mb-4">
                Stock updates regularly. For bulk orders or a specific delivery date, message us on WhatsApp.
              </p>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-white bg-gray-900">Size</th>
                      <th className="text-left px-4 py-3 font-semibold text-white bg-[#7A1F2B]">In-Stock</th>
                      <th className="text-left px-4 py-3 font-semibold text-white bg-green-600">Coming Soon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes?.map((size, idx) => (
                      <tr key={size.id} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 text-gray-800 font-medium">{size.size_label}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {size.is_available === 1 ? '1' : '0'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {size.is_available === 0 && size.restock_date ? (
                            <>Order today for {new Date(size.restock_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</>
                          ) : size.is_available === 0 ? (
                            'Currently unavailable'
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail