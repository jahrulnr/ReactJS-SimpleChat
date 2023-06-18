import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './route/route';
import reportWebVitals from './test/reportWebVitals';

// assets for web
import './assets/css/app.css'
import 'reactjs-toastr/lib/toast.css'

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <App/>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
