import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TeacherMain from "./Teacher/TeacherMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import SchoolClassMain from "./Schoolclass/SchoolClassMain";
import AppSchool from "./Utilities/AppSchool/AppSchool";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    //<TeacherMain/>
    //<SchoolClassMain/>
    <AppSchool/>



  //   <StudentMain/>
  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
