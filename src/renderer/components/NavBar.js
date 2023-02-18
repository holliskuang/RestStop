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
import { Link } from "react-router-dom";
import React, { useState } from 'react';

export default function NavBar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.light.mode);
  const location = useLocation();

  const handleModeChange = () => {
    dispatch(setMode());
  };

   const pages = [
    { name: 'HTTP', route: '/', value: 'http' ,endIcon:DataObjectIcon},
    { name: 'GraphQL', route: '/graphql', value: 'graphQL', endIcon:HubIcon },
    { name: 'WebSocket', route: '/websocket', value: 'ws', endIcon:PowerIcon},
    { name: 'SSE', route: '/sse', value: 'sse', endIcon:SettingsInputAntennaIcon },
    { name: 'GRPC', route: '/grpc', value: 'grpc', endIcon:WebhookIcon },
  ]; 
  function ReduxPageUpdate() {
    console.log('redux page update');
  }

  return (
    <AppBar sx={{minWidth:'100%', height:'8vh' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    
      <img style= {{width:'70px', height:'40px'}} src='https://res.cloudinary.com/dd97ovnmi/image/upload/v1676516183/restLogo_qwj20k.png'/>

     
       
        <div className="grow" />
        <div className="nav-buttons">
          
      {pages.map((page) 
     =>(<Button  component={Link} to={page.route}
      key={page.name}
      color="inherit"
      variant="outlined"
      endIcon={<page.endIcon/>}
      onClick={ReduxPageUpdate}
      sx={{mr:'10px', ml:'10px', width:'130px'}}
     >
    {page.name}
     </Button>))} 
          <Button
          key="mode"
            color="inherit"
            variant="outlined"
            onClick={handleModeChange}
            endIcon={<Brightness4Icon />}
            sx={{mr:'10px', ml:'10px'}}
          >
            {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
