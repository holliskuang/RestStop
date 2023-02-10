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
import Dashboard from './components/Main.js/Dashboard/Dashboard';
import Box from '@mui/material/Box';
import HTTP from './components/Main.js/Pages/HTTP';
import GraphQL from './components/Main.js/Pages/GraphQL';
import WebSocket from './components/Main.js/Pages/WebSocket';
import SSE from './components/Main.js/Pages/SSE';





export default function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HTTP />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/graphql" element={<GraphQL/>}/>
        <Route path="/websocket" element={<WebSocket/>}/>
        <Route path="/sse" element={<SSE/>}/>
        <Route path="/webhook" element={}/>
      </Routes>
    </Router>
  );
}

