import Hero from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import WhyUs from '../components/WhyUs'
import ProductRange from '../components/ProductRange'
import HowItWorks from '../components/HowItWorks'
import GetQuote from '../components/GetQuote'

function Home() {
  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Hero />
      <WhyUs/>
      <ProductRange/>
      <HowItWorks/>
      <GetQuote/>
    </div>
  )
}

export default Home