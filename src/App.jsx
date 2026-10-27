import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { RealEstateProvider } from './context/RealEstateContext';

// Layout & Overlays
import Header from './components/layout/Header';
import FullscreenNav from './components/layout/FullscreenNav';
import Footer from './components/layout/Footer';
import FloatingCompareTray from './components/layout/FloatingCompareTray';
import Toast from './components/common/Toast';
import EnquiryModal from './components/property/EnquiryModal';

// Pages
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavouritesPage from './pages/FavouritesPage';
import ComparePage from './pages/ComparePage';
import SellPage from './pages/SellPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './styles/tokens.css';
import './styles/main.css';
import './styles/header-nav.css';
import './styles/property.css';
import './styles/forms.css';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <RealEstateProvider>
      <Router>
        <ScrollToTop />
        <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <FullscreenNav />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buy" element={<BuyPage />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/property/:slug" element={<PropertyDetailPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          <FloatingCompareTray />
          <EnquiryModal />
          <Toast />
          <Footer />
        </div>
      </Router>
    </RealEstateProvider>
  );
}
