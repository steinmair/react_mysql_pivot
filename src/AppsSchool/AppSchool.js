import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TeacherMain from "../Teacher/TeacherMain";
import SchoolClassMain from "../SchoolClass/SchoolClassMain";

import Misc from "../Utilities/Apps/Misc";
import Main from "./Main";

const AppSchool = () => {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main />}/>
                  <Route path="/teachers" element={<TeacherMain />}/>
                  <Route path="/schoolClasses" element={<SchoolClassMain />}/>
                  <Route path="/departments/:departmentId/schoolClasses" element={<SchoolClassMain/>}/>
              </Routes>
          </BrowserRouter>
      </>

  );
}
export default AppSchool;