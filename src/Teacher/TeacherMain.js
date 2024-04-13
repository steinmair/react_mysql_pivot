import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import TeacherList from "./TeacherList";
import TeacherSingle from "./TeacherSingle";
import DataService from "../Services/DataService";

const TeachersList = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [mode, setMode] = useState(Misc.LoadCrudState.Blank);
    const [teachers, setTeachers] = useState({});
    const [currentTeacher, setCurrentTeacher] = useState({});
    const [crudState,setCrudState]= useState({state: Misc.LoadCrudState.Blank, message: "DELETE"});

    //Business Logic
    //lade die Liste der SchoolClass
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der SchoolClass
        load();

    }, []);

    const save = async (teacher) => {
        let response;
        setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully stored")});
        if (teacher.teacherId === '') {
            // insert (create)
            try {

                console.log("insert");
                console.log(teacher);
                response = await DataService.create("teachers",teacher);
                const teacherNew = response.data;
                console.log(teacherNew);
                setTeachers([...teachers, teacherNew]);     // das teacher Array wird durch den Spread Operator (...) in einzelne SchoolClass-Objekte aufgespalten


            } catch (e) {
                console.log(e.message);
            }
        } else {
            // update
            console.log("update");
            response = await DataService.update("teachers",teacher);
            const teacherNew = response.data;
            setTeachers(teachers.map(t => t.teacherId === teacher.teacherId ? teacherNew : this));
        }
    }

    const load = async () => {

        DataService.getAll("teachers")
            .then(response => {
                setTeachers(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message}))
    };

    const add = () => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        if (mode === Misc.LoadCrudState.Blank || mode === Misc.LoadCrudState.Edit )
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank);
    }

    const edit = (teacherId) => {
         setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        console.log("SchoolClass ID: " + teacherId);
        let teacher = teachers.find(t => t.teacherId === teacherId);
        setCurrentTeacher(teacher);
        setMode(Misc.LoadCrudState.Edit);
    }

    const deleteF = async (teacherId)=>{
        try {
            await DataService.remove("teachers",teacherId);
            setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
            setMode(Misc.cBlank);
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});

        }catch (e){
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }
    }
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="SchoolClass"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row>
                    <Col lg="11">
                        <h3>Lehrer/innen ({teachers.length})</h3>
                    </Col>
                    <Col lg="1">
                        <Button size="sm" variant="success" onClick={add} active>
                            Add
                        </Button>
                    </Col>
                </Row>


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
                        <TeacherList teachers={teachers}
                                     delete={deleteF}
                                     edit={edit}/>
                    </Col>
                </Row>

                <Row>
                    <Col className={crudState.state === Misc.LoadCrudState.Delete ? "text-success" : "text-danger"}>{crudState.message}</Col>
                </Row>

                <Row>
                    <Col>
                         {mode === Misc.LoadCrudState.Blank && <></>}
                         {mode === Misc.LoadCrudState.Add && <TeacherSingle save={save}/>}
                         {mode === Misc.LoadCrudState.Edit && <TeacherSingle save={save} teacher={currentTeacher}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default TeachersList;

