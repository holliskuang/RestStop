import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './themes';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const Hello = () => {
  const mode = useSelector((state: { mode: any }) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <h1>electron-react-boilerplate Hello World</h1>
        <div className="Hello">
          <a
            href="https://electron-react-boilerplate.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                📚
              </span>
              Read our docs
            </button>
          </a>
          <a
            href="https://github.com/sponsors/electron-react-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="folded hands">
                🙏
              </span>
              Donate
            </button>
          </a>
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
      </Routes>
    </Router>
  );
}
