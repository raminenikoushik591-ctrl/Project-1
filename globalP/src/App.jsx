import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InternshipsProvider } from './context/InternshipsContext';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { InternshipDetailsPage } from './pages/InternshipDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SavedInternshipsPage } from './pages/SavedInternshipsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <InternshipsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="internship/:id" element={<InternshipDetailsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="saved" element={<SavedInternshipsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="about" element={<AboutUsPage />} />
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </InternshipsProvider>
    </AuthProvider>
  );
}

export default App;
