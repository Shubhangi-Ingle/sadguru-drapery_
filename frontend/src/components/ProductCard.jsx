import { Link } from 'react-router-dom'



function ProductCard({ product }) {
  const coverImage =
    product.images?.find((img) => img.is_cover === 1)?.image_url ||
    product.images?.[0]?.image_url

 

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
    >
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
        {product.rent_price && (
          <p className="text-pink-600 font-semibold text-sm md:text-base">
            ₹{product.rent_price} <span className="text-gray-400 font-normal text-xs">/ rent</span>
          </p>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="mt-2 w-full text-xs font-medium border border-pink-200 text-pink-600 rounded-lg py-1.5 hover:bg-pink-50 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard