import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { ToastContainer } from 'react-toastify';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-right" autoClose={5000} theme="light" />
      <App />
    </Provider>
  </React.StrictMode>
);

/*

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

*/
