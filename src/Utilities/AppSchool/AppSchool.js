import {BrowserRouter, Route, Routes} from "react-router-dom";
import TeacherMain from "../../Teacher/TeacherMain";
import SchoolClassMain from "../../Schoolclass/SchoolClassMain";
import Misc from "../Apps/Misc";
import Main from "./Main";
import StudentClassMain from "../../Student/StudentMain";

import EventClassMain from "../../Events/EventMain";


const AppSchool = () => {
return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="teachers" element={<TeacherMain />}/>

            <Route path="schoolclasses" element={<SchoolClassMain />}/>
            {/*<Route path="/departments/:departmentId/schoolClasses" element={<SchoolClassMain />}/>*/}
            {/*<Route path="/teachers/:teacherId/schoolClasses" element={<SchoolClassMain />}/>*/}
            <Route path="/departments/:id/schoolClasses" element={<SchoolClassMain from='department'/>}/>
            {/*<Route path="/teachers/:id/schoolClasses" element={<SchoolClassMain from='teacher' />}/>*/}
            <Route path="/:master/:detailId/schoolclasses" element={<SchoolClassMain/>}></Route>
            <Route path="/:master/:detailId/students" element={<StudentClassMain/>}></Route>

            <Route path="/:master/:detailId/events" element={<EventClassMain/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
)
}

export default AppSchool;