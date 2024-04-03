import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TeacherMain from "../Teacher/TeacherMain";
import SchoolClassMain from "../SchoolClass/SchoolClassMain";

import Misc from "../Utilities/Apps/Misc";
import Main from "./Main";
import EventMain from "../Event/EventMain";

const AppSchool = () => {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main />}/>
                  <Route path="/teachers" element={<TeacherMain />}/>
                  <Route path="/schoolClasses" element={<SchoolClassMain />}/>
                  <Route path="/events" element={<EventMain />}/>

                  <Route path="/departments/:id/schoolClasses" element={<SchoolClassMain from='department'/>}/>
                  <Route path="/teachers/:id/schoolClasses" element={<SchoolClassMain from='teacher'/>}/>
              </Routes>
          </BrowserRouter>
      </>

  );
}

//student -> address master detail

//medical case
export default AppSchool;