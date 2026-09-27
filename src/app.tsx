import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/lib/theme';
import { ToastProvider } from '@/components/Toast';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HomePage } from '@/pages/HomePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { LoginPage } from '@/pages/LoginPage';
import { UploadResumePage } from '@/pages/UploadResumePage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { JobsPage } from '@/pages/JobsPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
           <Route
    path="/upload"
    element={
      <ProtectedRoute>
        <UploadResumePage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/analysis"
    element={
      <ProtectedRoute>
        <AnalysisPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs"
    element={
      <ProtectedRoute>
        <JobsPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/roadmap"
    element={
      <ProtectedRoute>
        <RoadmapPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
