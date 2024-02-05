import '../App.css';
import {useEffect, useState} from "react";
import TeacherDataservice from "../Services/TeacherDataService";
import Misc from "../Utilities/Apps/Misc";
import {Col, Container, Row} from "react-bootstrap";
import TeacherList from "./TeacherList";

const TeachersList = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});

    const [teachers, setTeachers] = useState([]);
    // const [currentTeacher, setCurrentTeacher] = useState({});

    //Business Logic
    //lade die Liste der Teacher
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der Teacher
        load();

    }, []);

    const load = async () => {

        TeacherDataservice.getAll()
            .then(response => {
                setTeachers(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message}))
    };
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="Teacher"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Lehrer/innen</h3>
                    </Col>
                    <Col>
                        {teachers.length}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TeacherList teachers={teachers}/>
                    </Col>
                </Row>
            </Container>}

        </>
    );
}
export default TeachersList;

