import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './route/route';

// assets for web
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './assets/css/custom.css'
import './assets/css/app.css'

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <App />
);
