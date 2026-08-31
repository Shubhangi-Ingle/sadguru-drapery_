import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const coverImage =
    product.images?.find((img) => img.is_cover === 1)?.image_url ||
    product.images?.[0]?.image_url

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden ring-1 ring-[#B8863B]/15 hover:ring-[#B8863B]/45 shadow-sm hover:shadow-lg hover:shadow-[#7A1F2B]/8 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[3/4] bg-[#FBF3E9] overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image yet
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-gray-800 font-medium text-sm md:text-[15px] leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>
        {product.rent_price ? (
          <p className="text-[#7A1F2B] font-semibold text-sm md:text-base">
            ₹{product.rent_price}
            <span className="text-gray-400 font-normal text-xs ml-1">/ piece</span>
          </p>
        ) : (
          <p className="text-gray-500 text-xs">Price on enquiry</p>
        )}
      </div>
    </Link>
  )
}

export default ProductCard