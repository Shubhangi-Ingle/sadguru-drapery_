import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCategories } from '../api/categories'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import { getSizeCharts } from '../api/sizeCharts'
import Seo from '../components/Seo'

function Catalogue() {
  const { categoryId, subcategoryId } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')
  const [searchTerm, setSearchTerm] = useState('')
  const [sizeCharts, setSizeCharts] = useState([])

  useEffect(() => {
    setLoading(true)
    Promise.all([getCategories(), getProducts()])
      .then(([catData, prodData]) => {
        setCategories(catData)
        setProducts(prodData)
      })
      .catch(() => {
        setCategories([])
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
  getSizeCharts().then(setSizeCharts).catch(() => setSizeCharts([]))
}, [])

  const activeCategory = categories.find((c) => String(c.id) === categoryId)
  const activeSubcategory = activeCategory?.subcategories?.find((s) => String(s.id) === subcategoryId)

  let filteredProducts = products
  if (subcategoryId) {
    filteredProducts = filteredProducts.filter((p) => String(p.subcategory_id) === subcategoryId)
  } else if (categoryId) {
    filteredProducts = filteredProducts.filter((p) => String(p.category_id) === categoryId)
  }

  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  }

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.rent_price || 0) - (b.rent_price || 0))
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.rent_price || 0) - (a.rent_price || 0))
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  }



  return (
    
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Seo
  title="Catalogue"
  description="Browse our full range of kids' dance and traditional costumes — available for rent or bulk order."
  path="/catalogue"
/>
      {/* Search bar */}
      <div className="mb-5">
        <div className="relative w-full md:max-w-md">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for costumes..."
            className="w-full bg-white border-2 border-black-400 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
      </div>


      {/* Category tab bar - text only, thin top/bottom border, pink active underline */}
      <div className="border-t border-b border-gray-200 mb-1">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar px-1">
          <button
            onClick={() => navigate('/catalogue')}
            className={`shrink-0 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${!categoryId ? 'border-pink-600 text-gray-900 font-semibold' : 'border-transparent text-gray-600 font-medium'
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/catalogue/${cat.id}`)}
              className={`shrink-0 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${categoryId === String(cat.id) ? 'border-pink-600 text-gray-900 font-semibold' : 'border-transparent text-gray-600 font-medium'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory pills - text only, second row of filters under the active category */}
      {activeCategory?.subcategories?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-3 -mx-4 px-4">
          <button
            onClick={() => navigate(`/catalogue/${activeCategory.id}`)}
            className={`shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              !subcategoryId ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            All {activeCategory.name}
          </button>
          {activeCategory.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => navigate(`/catalogue/${activeCategory.id}/${sub.id}`)}
              className={`shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                subcategoryId === String(sub.id) ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}


    
      {/* Product grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-brand text-lg md:text-xl font-bold text-gray-800">
            {activeSubcategory ? activeSubcategory.name : activeCategory ? activeCategory.name : "All Products"}
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value="default">Sort by</option>
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {loading ? "Loading..." : `Showing ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`}
        </p>

        {loading ? (
          <div className="text-center text-gray-400 py-16">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-16">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalogue