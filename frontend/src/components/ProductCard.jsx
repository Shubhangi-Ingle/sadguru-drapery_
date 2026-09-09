import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../config'
import { optimizeImage } from '../utils/cloudinary'
import { useState } from 'react'
import { trackEvent } from '../utils/analytics'

function ProductCard({ product }) {
  const coverImage =
    product.images?.find((img) => img.is_cover === 1)?.image_url ||
    product.images?.[0]?.image_url

  const price = product.rent_price || 0
  const hasDiscount = product.original_price && product.original_price > price
  const discountPercent = hasDiscount ? Math.round((1 - price / product.original_price) * 100) : null
  
// Hypothetical placeholder data — shown until a real chart is uploaded in admin for this category

  const handleEnquire = (e) => {
    e.preventDefault()
    e.stopPropagation()
    trackEvent('whatsapp_click', { source: 'product_card', product_name: product.name })
    const message = `Hi! I'd like to enquire about "${product.name}".`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  

const EnquireButton = ({ className = '' }) => (
  <button
    type="button"
    onClick={handleEnquire}
    className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#F0C000] text-gray-900 font-semibold rounded-full shadow-sm shadow-yellow-600/20 active:scale-[0.98] transition-all ${className}`}
  >
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
    </svg>
    Enquire on WhatsApp
  </button>
)

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 sm:block flex"
    >
      {/* Mobile: Amazon-style horizontal list card */}
      <div className="w-32 shrink-0 sm:hidden aspect-square bg-gray-100">
        {coverImage ? (
          <img src={optimizeImage(coverImage, 300)} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
        )}
      </div>
      <div className="flex-1 min-w-0 p-3 sm:hidden">
        <h3 className="text-gray-800 font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-xs line-clamp-2 mb-1.5">
            {product.description}{' '}
            <span className="text-pink-600 font-medium whitespace-nowrap">Read more</span>
          </p>
        )}
        {price > 0 && (
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <span className="text-gray-900 font-semibold text-base">₹{price}</span>
            {hasDiscount && (
              <>
                <span className="text-gray-400 text-xs line-through">₹{product.original_price}</span>
                <span className="text-green-700 text-xs font-semibold">{discountPercent}% off</span>
              </>
            )}
          </div>
        )}
        <EnquireButton className="text-[11px] py-1.5 px-3 mt-1.5" />
       
      </div>

      {/* Tablet/Desktop: existing vertical grid card */}
      <div className="hidden sm:block">
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          {coverImage ? (
            <img
              src={optimizeImage(coverImage, 500)}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image yet
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-gray-800 font-medium text-sm md:text-base line-clamp-2 mb-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-500 text-xs line-clamp-2 mb-1.5">
              {product.description}{' '}
              <span className="text-pink-600 font-medium whitespace-nowrap">Read more</span>
            </p>
          )}
          {price > 0 && (
            <div className="flex items-baseline gap-2 flex-wrap mb-1">
              <span className="text-pink-600 font-semibold text-sm md:text-base">₹{price}</span>
              {hasDiscount && (
                <>
                  <span className="text-gray-400 text-xs line-through">₹{product.original_price}</span>
                  <span className="text-green-700 text-xs font-semibold">{discountPercent}% off</span>
                </>
              )}
            </div>
          )}
          <EnquireButton className="w-full text-xs md:text-sm py-2.5 mt-2" />
        
        </div>
      </div>
     
    </Link>
  )
}

export default ProductCard