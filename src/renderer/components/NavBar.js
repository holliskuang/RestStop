import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setMode } from '../state/lightSlice';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DataObjectIcon from '@mui/icons-material/DataObject';
import HubIcon from '@mui/icons-material/Hub';
import PowerIcon from '@mui/icons-material/Power';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import WebhookIcon from '@mui/icons-material/Webhook';

export default function NavBar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.light.mode);
  const location = useLocation();

  const handleModeChange = () => {
    dispatch(setMode());
  };

  const pages = [
    { name: 'HTTP', route: '/', value: 'http' ,endIcon={<DataObjectIcon />}},
    { name: 'GraphQL', route: '/graphql', value: 'graphQL', endIcon={<HubIcon />} },
    { name: 'WebSocket', route: '/websocket', value: 'ws', endIcon={<PowerIcon />}},
    { name: 'SSE', route: '/sse', value: 'sse', endIcon={<SettingsInputAntennaIcon />} },
    { name: 'Webhook', route: '/webhook', value: 'webhook', endIcon={<WebhookIcon />} },
  ];

 function ReduxPageUpdate() {}

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography variant="h6" className="title">
          REST Client
        </Typography>
        <div className="grow" />
        <div className="nav-buttons">
     {pages.map((page) => (return(<Button
     to={page.route}
      color="inherit"
      variant="outlined"
      endIcon={page.endIcon}
      onClick={ReduxPageUpdate}
     ></Button>)))}

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
