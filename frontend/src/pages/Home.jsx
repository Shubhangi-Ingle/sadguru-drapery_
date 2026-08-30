import Hero from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import FeaturedCategories from '../components/FeaturedCategories'

function Home() {
  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Hero />
      <FeaturedCategories />
    </div>
  )
}

export default Home