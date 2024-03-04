import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TeacherMain from "./Teacher/TeacherMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import SchoolClassMain from "./SchoolClass/SchoolClassMain";
import AppSchool from "./AppsSchool/AppSchool";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //  <TeacherMain/>
  // </React.StrictMode>

    <AppSchool/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
