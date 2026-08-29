import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../api/categories'

function FeaturedCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        <div className="text-center text-gray-400">Loading categories...</div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-brand text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Explore Our Categories
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          From dance performances to festive occasions — find the perfect costume for your moment.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/catalogue/${cat.id}`}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-shadow"
          >
            {cat.cover_image_url ? (
              <img
                src={cat.cover_image_url}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-gray-200 text-gray-400 text-sm">
                No image yet
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/catalogue"
          className="inline-block border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          View Full Catalogue
        </Link>
      </div>
    </section>
  )
}

export default FeaturedCategories