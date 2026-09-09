import { useState, useEffect } from 'react'
import { getDesigns, getDesignsCount } from '../api/designs'
import { optimizeImage } from '../utils/cloudinary'

const PAGE_SIZE = 24

function DesignGallery() {
  const [designs, setDesigns] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([getDesigns(0, PAGE_SIZE), getDesignsCount()])
      .then(([data, countData]) => {
        setDesigns(data)
        setTotalCount(countData.total)
      })
      .catch(() => {
        setDesigns([])
        setTotalCount(0)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLoadMore = () => {
    setLoadingMore(true)
    getDesigns(designs.length, PAGE_SIZE)
      .then((data) => setDesigns((prev) => [...prev, ...data]))
      .catch(() => {})
      .finally(() => setLoadingMore(false))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#B8863B] mb-3">
          Design Gallery
        </p>
        <h1 className="font-impact uppercase text-3xl md:text-4xl text-gray-900 mb-3 tracking-wide">
          Our Design Collection
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Browse our full range of costume designs — {totalCount}+ styles and counting.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-16">Loading designs...</div>
      ) : designs.length === 0 ? (
        <div className="text-center text-gray-400 py-16">No designs uploaded yet — check back soon.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {designs.map((design) => (
              <button
                key={design.id}
                onClick={() => setLightboxImage(design)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center"
              >
                <img
                  src={optimizeImage(design.image_url, 400)}
                  alt={design.caption || 'Design'}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {design.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium text-left line-clamp-2">{design.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {designs.length < totalCount && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-[#7A1F2B] hover:bg-[#5C1620] disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
              >
                {loadingMore ? 'Loading...' : `Load More (${designs.length} of ${totalCount})`}
              </button>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-3xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={optimizeImage(lightboxImage.image_url, 1200)}
              alt={lightboxImage.caption || 'Design'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {lightboxImage.caption && (
              <p className="text-white text-center text-sm mt-3">{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DesignGallery