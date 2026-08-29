import Hero from '../components/Hero'
import FeaturedCategories from '../components/FeaturedCategories'

function Home() {
  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-white">
      <Hero />
      <FeaturedCategories />
    </div>
  )
}

export default Home