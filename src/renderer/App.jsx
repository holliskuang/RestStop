import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './themes';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Request from './components/Main.js/Request/Request';

const Hello = () => {
  const mode = useSelector((state) => state.light.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log('hi')
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="Hello">
          <NavBar></NavBar>
          <Request></Request>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/graphql" element={}/>
        <Route path="/websocket" element={}/>
        <Route path="/sse" element={}/>
        <Route path="/webhook" element={}/>
      </Routes>
    </Router>
  );
}

