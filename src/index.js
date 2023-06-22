import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import { default as OffPage } from './views/Offline'
import App from './route/route';

// assets for web
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './assets/css/custom.css'
import './assets/css/app.css'

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <Online>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <App />
      </BrowserRouter>
    </Online>
    <Offline>
      <OffPage />
    </Offline>
  </React.StrictMode>
);
