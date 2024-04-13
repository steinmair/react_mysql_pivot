import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TeacherMain from "../../Teacher/TeacherMain";
import SchoolClassMain from "../../Schoolclass/SchoolClassMain";
import {Button, Col, Row} from "react-bootstrap";


const Main = () => {
    return (
        <>
           <Row>
               <Col className="bg-secondary mb-3">
                   <h1 className="ms-3 text-white">Schoolclass React Project 8AAIF</h1>
                   <Button className="mt-2 ms-3 mb-3" variant="secondary">
                       <Link to="/teachers" className="text-white">Teachers</Link>
                   </Button>
                   <Button className="mt-2 ms-3 mb-3" variant="secondary">
                       <Link to="/schoolclasses" className="text-white">Schulklassen</Link>
                   </Button>
               </Col>
               {/*<ul className="bg-danger">*/}
               {/*    <li className="bg-success">*/}
               {/*        <Button className="mt-2 ms-3" variant="primary">*/}
               {/*            <Link to="/teachers" className="text-white">Teachers</Link>*/}
               {/*        </Button>*/}
               {/*        <Button className="mt-2 ms-3" variant="success">*/}
               {/*            <Link to="/schoolclasses" className="text-white">Schulklassen</Link>*/}
               {/*        </Button>*/}
               {/*    </li>*/}

               {/*    <li><Link to="/departments/1/schoolClasses">Schulklassen der BG</Link></li>*/}
               {/*</ul>*/}
           </Row>
        </>
    )
}

export default Main;