import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SeniorModeProvider } from './context/SeniorModeContext';
import Layout from './components/layout/Layout';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FarmsPage from './pages/FarmsPage';
import FarmDetailPage from './pages/FarmDetailPage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import GuidePage from './pages/GuidePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupBusinessPage from './pages/SignupBusinessPage';
import MyPage from './pages/MyPage';

function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <SeniorModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/farms" replace />} />

          <Route path="/products" element={<AppLayout><ProductsPage /></AppLayout>} />
          <Route path="/products/:id" element={<AppLayout><ProductDetailPage /></AppLayout>} />

          <Route path="/farms" element={<AppLayout><FarmsPage /></AppLayout>} />
          <Route path="/farms/:id" element={<AppLayout><FarmDetailPage /></AppLayout>} />

          <Route path="/listings" element={<AppLayout><ListingsPage /></AppLayout>} />
          <Route path="/listings/:id" element={<AppLayout><ListingDetailPage /></AppLayout>} />

          <Route path="/guide" element={<AppLayout><GuidePage /></AppLayout>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/business" element={<SignupBusinessPage />} />

          <Route path="/mypage" element={<AppLayout><MyPage /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </SeniorModeProvider>
  );
}
