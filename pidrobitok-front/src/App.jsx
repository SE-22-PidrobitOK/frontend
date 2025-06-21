import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegistrationWizard from './components/RegistrationWizard/RegistrationWizard.jsx';
import VacancyPage from './components/Vacancy/VacancyPage.jsx';
import VacancyDetailPage from './components/Vacancy/VacancyDetailPage.jsx';
import AddVacancyPage from './components/Vacancy/AddVacancyPage.jsx';
import Registration from './components/Registration/Registration.jsx';
import Login from './components/Registration/Login.jsx';
import EmployerDashboard from './components/Vacancy/EmployerDashboard.jsx';
import ProtectedRoute from './components/Registration/ProtectedRoute.jsx';
import { AuthProvider } from './components/Registration/AuthContext';
import Navbar from './components/Layout/Navbar.jsx';
import Footer from './components/Layout/Footer.jsx';
import RoleBasedRedirect from './components/Registration/RoleBasedRedirect.jsx';
import StudentProfile from './components/Vacancy/StudentProfile.jsx';
import ApplicationsPage from './components/Vacancy/ApplicationsPage.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#1c2526',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#12539f',
    },
    success: {
      main: '#4caf50',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<RoleBasedRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            
            {/* Захищені маршрути для студентів */}
            <Route 
              path="/vacancies" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <VacancyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-profile" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Захищені маршрути для роботодавців */}
            <Route 
              path="/employer-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-vacancy" 
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <AddVacancyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications" 
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <ApplicationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-vacancy/:id" 
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <AddVacancyPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Інші маршрути */}
            <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App