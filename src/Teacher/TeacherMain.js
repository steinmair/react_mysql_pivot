import '../App.css';
import {useEffect, useState} from "react";
import TeacherDataservice from "../Services/TeacherDataService";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import TeacherList from "./TeacherList";
import TeacherSingle from "./TeacherSingle";
import teacher from "./Teacher";


const TeachersList = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [loadCrudState, setLoadCrudState] = useState({state: Misc.LoadState.Load, error: null});
    const [teachers, setTeachers] = useState([]);
    const [mode, setMode] = useState(Misc.cBlank);
    const [currentTeacher, setCurrentTeacher] = useState({});

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
    const add = () =>{
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank)

    }
    const edit = (teacherId) =>{

        console.log("Edit TeacherId: "+teacherId)

        let teacher = teachers.find(t => t.teacherId === teacherId);
        setCurrentTeacher(teacher);
        setMode(Misc.LoadCrudState.Edit);

    }

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
                        <Col lg="1">
                            <Button size="sm" variant="success" onClick={add} active>
                                Add
                            </Button>
                        </Col>
                        <Col>
                            {teachers.length}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TeacherList teachers={teachers} edit={edit}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {mode===Misc.LoadCrudState.Blank &&<></>}
                            {mode===Misc.LoadCrudState.Add && <TeacherSingle/>}
                            {mode===Misc.LoadCrudState.Edit && <TeacherSingle teacher={currentTeacher}/>}
                        </Col>
                    </Row>
                </Container>}

        </>
    );
}
export default TeachersList;