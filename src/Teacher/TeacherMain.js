import '../App.css';
import {useEffect, useState} from "react";
import TeacherDataService from "../Services/TeacherDataService";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import TeacherList from "./TeacherList";
import TeacherSingle from "./TeacherSingle";



const TeachersList = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [loadCrudState, setLoadCrudState] = useState({state: Misc.LoadState.Load, error: null});
    const [teachers, setTeachers] = useState([]);
    const [mode, setMode] = useState(Misc.cBlank);
    const [currentTeacher, setCurrentTeacher] = useState({});
    const [crudState,setCrudState] = useState({state: Misc.LoadCrudState.Blank, message: ''});

    //Business Logic
    //lade die Liste der Teacher
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der Teacher
        load();

    }, []);

    const load = async () => {

        TeacherDataService.getAll()
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

    const edit = (teacherId) => {
        let teacher = teachers.find(t => t.teacherId === teacherId);
        setCurrentTeacher(teacher);
        setMode(Misc.LoadCrudState.Edit);
    }

    const save = async (teacher) => {
        let response = true;
        console.log("save");
        //insert (create)
        if(teacher.teacherId === '') {
            response = await TeacherDataService.create(teacher);
            const teacherNew = response.data;
            setTeachers([...teachers,teacherNew]);  //das Teacher-Array wird durch den Spread-Operator (...) in einzelne Teacher-Objecte aufgespalten
        }
        //update
        else {
            response = await TeacherDataService.update(teacher);
            const teacherNew = response.data;
            setTeachers(teachers.map(t => (t.teacherId === teacherNew.teacherId ? teacherNew : t)));
        }
    }

    const deleteF = async (teacherId) => {

        try {
            await TeacherDataService.remove(teacherId);
            setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
            setMode(Misc.cBlank);
            setCrudState({state: Misc.LoadCrudState.Delete,message: Misc.getTimeMessage("Successfully deleted")})
        } catch (e){
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }

    }

    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="Teacher"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row className="mt-3">
                    <Col lg="1">
                        <Button size="sm-1" variant="success" onClick={add} active>
                            Add
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <h3>Lehrer/innen</h3>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        Anzahl der Lehrer/innen: {teachers.length}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TeacherList teachers={teachers}
                                     delete={deleteF}
                                     edit={edit}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {mode===Misc.LoadCrudState.Blank &&<></>}
                        {mode===Misc.LoadCrudState.Add && <TeacherSingle save={save}/>}
                        {mode===Misc.LoadCrudState.Edit && <TeacherSingle save={save} teacher={currentTeacher}/>}
                    </Col>
                </Row>
            </Container>}

        </>
    );
}
export default TeachersList;