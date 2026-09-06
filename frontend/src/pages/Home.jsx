import Hero from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import WhyUs from '../components/WhyUs'
import ProductRange from '../components/ProductRange'
import HowItWorks from '../components/HowItWorks'
import GetQuote from '../components/GetQuote'
import CustomerReviews from '../components/CustomerReviews'

function Home() {
  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Hero />
      <WhyUs/>
      <ProductRange/>
      <CustomerReviews/>
      <HowItWorks/>
      <GetQuote/>
    </div>
  )
}

export default Home