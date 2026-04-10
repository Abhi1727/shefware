import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { MarketplacePage } from './pages/MarketplacePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/products/ProductDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { ServiceDetailPage } from './pages/services/ServiceDetailPage'
import { ServicesPage } from './pages/ServicesPage'
import { WhyShefwarePage } from './pages/WhyShefwarePage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="why-shefware" element={<WhyShefwarePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productSlug" element={<ProductDetailPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
