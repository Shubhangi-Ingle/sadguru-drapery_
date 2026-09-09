import Hero from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import WhyUs from '../components/WhyUs'
import ProductRange from '../components/ProductRange'
import HowItWorks from '../components/HowItWorks'
import GetQuote from '../components/GetQuote'
import CustomerReviews from '../components/CustomerReviews'
import Seo from '../components/Seo'

function Home() {
  return (
    <div className="bg-white">
      <Seo
        title="Kids Dance & Traditional Costume Rentals"
        description="Rent or bulk-order kids' dance and traditional costumes — Bharatanatyam, folk, western styles and more. Trusted by families, schools, and dance academies in Pune."
        path="/"
      />
      <AnnouncementBar />
      <Hero />
      <WhyUs />
      <ProductRange />
      <CustomerReviews />
      <HowItWorks />
      <GetQuote />
    </div>
  )
}

export default Home