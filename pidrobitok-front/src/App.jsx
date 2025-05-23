import { useState } from 'react'
import Login from './components/Login.jsx'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Registration from './components/Registration.jsx';
import RegistrationWizard from './components/RegistrationWizard/RegistrationWizard.jsx';
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
    <>
    <Login />
    </>
    </ThemeProvider>
  )
}

export default App
