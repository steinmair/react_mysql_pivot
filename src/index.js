import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App3d from "./Utilities/Apps/App3d";
import App3c from "./Utilities/Apps/App3c";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App3d surname='Poms'firstname='Florian'/>
    <App3d surname='Franz'firstname='Ferdinand'/>
    <App3c/>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
