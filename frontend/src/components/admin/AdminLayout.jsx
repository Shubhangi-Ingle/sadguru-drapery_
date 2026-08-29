import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../api/auth'

const navItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Categories', path: '/admin/categories' },
  { name: 'Subcategories', path: '/admin/subcategories' },
  { name: 'Products', path: '/admin/products' },
  { name: 'Size Charts', path: '/admin/size-charts' },
  { name: 'Reviews', path: '/admin/reviews' },
]

function AdminLayout() {
  const navigate = useNavigate()
  // Open by default on desktop (≥768px), closed by default on mobile
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const closeOnMobile = () => {
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Backdrop — mobile only, shown while drawer is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — overlay drawer on mobile, collapsible static column on desktop */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 bg-gray-900 text-gray-300 flex flex-col shrink-0
        w-64 transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:transition-all md:duration-200
        ${sidebarOpen ? 'md:w-64' : 'md:w-0'} md:overflow-hidden`}
      >
        <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between whitespace-nowrap">
          <div>
            <p className="font-brand text-lg font-bold text-white">Sadguru Drapery</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto whitespace-nowrap">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={closeOnMobile}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-gray-800 whitespace-nowrap">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-brand text-sm font-semibold text-gray-700">Admin Panel</span>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout