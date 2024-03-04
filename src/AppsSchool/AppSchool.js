import {BrowserRouter, Route, Routes} from "react-router-dom";
import TeacherMain from "../Teacher/TeacherMain";
import SchoolClassMain from "../SchoolClass/SchoolClassMain";
//import Main from './Main';
import Misc from "../Utilities/Apps/Misc";

const AppSchool = () => {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<TeacherMain />}/>
                  <Route path="/teachers" element={<TeacherMain />}/>
                  <Route path="/schoolClasses" element={<SchoolClassMain />}/>
              </Routes>
          </BrowserRouter>
      </>

  );
}
export default AppSchool;