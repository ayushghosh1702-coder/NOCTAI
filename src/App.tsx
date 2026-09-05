import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfileOnboardingPage } from './pages/ProfileOnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GenerateProjectPage } from './pages/GenerateProjectPage';
import { ExploreProjectsPage } from './pages/ExploreProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { ProjectRoadmapPage } from './pages/ProjectRoadmapPage';
import { ProjectMentorPage } from './pages/ProjectMentorPage';
import { ProjectImprovementsPage } from './pages/ProjectImprovementsPage';
import { ProjectDocumentationPage } from './pages/ProjectDocumentationPage';
import { ProjectVivaPage } from './pages/ProjectVivaPage';
import { SettingsPage } from './pages/SettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BackgroundProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer />

          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfileOnboardingPage />} />

            {/* Authenticated / Student Workspace Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/generate" element={<GenerateProjectPage />} />
              <Route path="/projects" element={<ExploreProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route path="/projects/:id/roadmap" element={<ProjectRoadmapPage />} />
              <Route path="/projects/:id/mentor" element={<ProjectMentorPage />} />
              <Route path="/projects/:id/improvements" element={<ProjectImprovementsPage />} />
              <Route path="/projects/:id/documentation" element={<ProjectDocumentationPage />} />
              <Route path="/projects/:id/viva" element={<ProjectVivaPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </BackgroundProvider>
    </AppProvider>
  );
}
