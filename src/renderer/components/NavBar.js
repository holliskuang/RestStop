import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setMode } from '../state/authReducer';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function NavBar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const location = useLocation();

  const handleModeChange = () => {
    dispatch(setMode());
  };

  const pages = [
    { name: 'HTTP', route: '/', value: 'http' },
    { name: 'GraphQL', route: '/graphql', value: 'graphQL' },
    { name: 'WebSocket', route: '/websocket', value: 'ws' },
    { name: 'SSE', route: '/sse', value: 'sse' },
    { name: 'Webhook', route: '/webhook', value: 'webhook' },
  ];

  function reduxPage
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography variant="h6" className="title">
          REST Client
        </Typography>
        <div className="grow" />
        <div className="nav-buttons">
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<DataObjectIcon />}
          >
            HTTP
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<DataObjectIcon />}
          >
            GraphQL
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<DataObjectIcon />}
          >
            WebSocket
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<DataObjectIcon />}
          >
            WebHook
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<DataObjectIcon />}
          >
            SSE
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleModeChange}
            endIcon={<Brightness4Icon />}
          >
            {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
