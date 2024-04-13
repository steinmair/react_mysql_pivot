import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import StudentList from "./StudentList";
import StudentSingle from "./StudentSingle";
import {useParams} from "react-router-dom";
import DataService from "../Services/DataService";

const StudentClassMain = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [mode, setMode] = useState(Misc.LoadCrudState.Blank);
    const [students, setStudents] = useState([]);
    const [schoolClasses, setSchoolClasses] = useState([]);
    const [masterObject, setMasterObject] = useState();
    const [currentStudent, setCurrentStudent] = useState({});
    const [crudState, setCrudState] = useState({state: Misc.LoadCrudState.Blank, message: ''});

    const {detailId: detailId} = useParams();
    const {master: master} = useParams();

    console.log("MASTER DETAIL: ", master, detailId)
    //Business Logic
    //lade die Liste der SchoolClass
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der SchoolClass

        load(master, detailId);
        loadSchoolClasses();

    }, []);

    const save = async (student) => {
        let response;
        console.log("save")
        // insert (Create)
        if (!student.studentId) {
            try {
                response = await DataService.create("students", student);
                console.log("insert")
                const studentNew = response.data;
                console.log("Response data: ", response.data);
                setStudents([...students, studentNew]);
                setCrudState({state: Misc.LoadCrudState.Add, message: Misc.getTimeMessage("Successfully")});

            } catch (e) {
                setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
            }
        }
        // update
        else {
            response = await DataService.update("students", student);
            console.log("update");
            const studentNew = response.data;
            setStudents(students.map(s => s.studentId === studentNew.studentId ? studentNew : s));

        }
    }

    const load = async (master, detailId) => {
        try {
            if (detailId) {
                const response = await DataService.getMasterDetail(master, detailId, "students");
                setStudents(response.data)
                const masterObject = await DataService.get(master, detailId)
                setMasterObject(masterObject.data);
            } else {
                const response = await DataService.getAll("students");
                setStudents(response.data)
            }
            setLoadState({state: Misc.LoadState.Show})
        } catch (e) {
            console.error(e);
            setLoadState({state: Misc.LoadState.Error, error: e.message})
        }
    };

    const loadSchoolClasses = async () => {
        DataService.getAll("schoolclasses")
            .then(response => {
                setSchoolClasses(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message
            }))
    };
    const add = () => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank);
    }

    const edit = (studentId) => {
        let student = students.find(s => s.studentId === studentId);
        setCrudState({state: Misc.LoadCrudState.Delete, message: ""});
        setCurrentStudent(student);
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Edit);
        else
            setMode(Misc.LoadCrudState.Blank);
        console.log("StudentId: ", studentId)
    }

    const deleteF = async (studentId)=>{
        try {
            await DataService.remove("students", studentId);
            setStudents(students.filter(student => student.studentId !== studentId))
            setMode(Misc.Blank)
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
        }
    }
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="students"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row>
                    <Col lg="11">
                        {/*<h3>{masterObject ? `Students of: ${masterObject.name}` : 'Students'}</h3>*/}
                    </Col>
                    <Col lg="1">
                    <Button size="sm" variant="success" onClick={add} active>
                            Add
                        </Button>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <h3>Schüler/innen</h3>
                    </Col>
                    <Col>
                        {students.length}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StudentList students={students}
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
                        {mode === Misc.LoadCrudState.Add && <StudentSingle save={save}
                                                                           schoolClasses={schoolClasses}
                        />}
                        {mode === Misc.LoadCrudState.Edit && <StudentSingle student={currentStudent}
                                                                            save={save}
                                                                            schoolClasses={schoolClasses}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default StudentClassMain;