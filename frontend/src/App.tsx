import { Routes, Route, Navigate } from 'react-router-dom';
import { useSurveyContext } from './contexts/SurveyContext';

import LandingSurveyPage from './pages/LandingSurveyPage';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import SellCarPage from './pages/SellCarPage';
import AboutUsPage from './pages/AboutUsPage';
import ServicesPage from './pages/ServicesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import VehicleAdminPage from './pages/VehicleAdminPage';

import PageLayout from './components/layout/PageLayout';

import ScrollToTop from './utils/ScrollToTop';

// Access the environment variable
const landingSurveyEnabled = import.meta.env.VITE_LANDING_SURVEY_ENABLED === 'true';

function AppContent() { // Renamed App to AppContent to use Router here or ensure Router is in main.tsx
  const { hasCompletedSurvey } = useSurveyContext();
  const showSurvey = landingSurveyEnabled && !hasCompletedSurvey;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {showSurvey && (
          <Route path="/*" element={<LandingSurveyPage />} />
        )}

        {!showSurvey && (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<PageLayout><HomePage /></PageLayout>} />
            <Route path="/inventory" element={<PageLayout><InventoryPage /></PageLayout>} />
            <Route path="/inventory/:vehicleId" element={<PageLayout><VehicleDetailPage /></PageLayout>} />
            <Route path="/sell-car" element={<PageLayout><SellCarPage /></PageLayout>} />
            <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
            <Route path="/about-us" element={<PageLayout><AboutUsPage /></PageLayout>} />
            <Route path="/admin/vehicle" element={<VehicleAdminPage />} />
            <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default AppContent;
