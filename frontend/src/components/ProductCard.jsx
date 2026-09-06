import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const coverImage =
    product.images?.find((img) => img.is_cover === 1)?.image_url ||
    product.images?.[0]?.image_url

  const price = product.rent_price || 0
  const hasDiscount = product.original_price && product.original_price > price
  const discountPercent = hasDiscount ? Math.round((1 - price / product.original_price) * 100) : null

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 sm:block flex"
    >
      {/* Mobile: Amazon-style horizontal list card */}
      <div className="w-32 shrink-0 sm:hidden aspect-square bg-gray-100">
        {coverImage ? (
          <img src={coverImage} alt={product.name} className="w-full h-full object-cover" />
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
      </div>

      {/* Tablet/Desktop: existing vertical grid card */}
      <div className="hidden sm:block">
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.name}
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
        </div>
      </div>
    </Link>
  )
}

export default ProductCard