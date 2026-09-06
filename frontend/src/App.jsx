import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './components/admin/AdminLayout'
import AdminCategories from './pages/admin/AdminCategories'
import AdminSubcategories from './pages/admin/AdminSubcategories'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductDetail from './pages/admin/AdminProductDetail'
import AdminSizeCharts from './pages/admin/AdminSizeCharts'
import AdminReviews from './pages/admin/AdminReviews'
import ScrollToTop from './components/ScrollToTop'
import AdminDesigns from './pages/admin/AdminDesigns'

function Layout() {
  const location = useLocation()
  const isProductPage = location.pathname.startsWith('/product/')
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:categoryId" element={<Catalogue />} />
          <Route path="/catalogue/:categoryId/:subcategoryId" element={<Catalogue />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
                   
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="subcategories" element={<AdminSubcategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/:productId" element={<AdminProductDetail />} />
            <Route path="size-charts" element={<AdminSizeCharts />} />
            <Route path="reviews" element={<AdminReviews />} />
             <Route path="designs" element={<AdminDesigns />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isProductPage && !isAdminPage && <Footer />}
      {!isProductPage && !isAdminPage && <WhatsAppButton />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}

export default App