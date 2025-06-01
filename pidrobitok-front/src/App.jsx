import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Registration from './components/Registration.jsx';
import RegistrationWizard from './components/RegistrationWizard/RegistrationWizard.jsx';
import VacancyPage from './components/Vacancy/VacancyPage.jsx';
import VacancyDetailPage from './components/Vacancy/VacancyDetailPage.jsx';

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
      <Router>
        <Routes>
          {/* Головна сторінка з вакансіями */}
          <Route path="/" element={<VacancyPage />} />
          <Route path="/vacancies" element={<VacancyPage />} />
          
          {/* Сторінка окремої вакансії */}
          <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
