import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import SchoolClassDataService from "../Services/SchoolClassDataService";
import SchoolClassList from "./SchoolClassList";
import SchoolClassSingle from "./SchoolClassSingle";
import {useParams} from "react-router-dom";
import DepartmentDataService from "../Services/DepartmentDataService";
import {AxiosHeaders as props} from "axios";
import TeacherDataService from "../Services/TeacherDataService";


const SchoolClassesList = (props) => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [loadCrudState, setLoadCrudState] = useState({state: Misc.LoadState.Load, error: null});
    const [schoolClasses, setSchoolClasses] = useState([]);
    const [mode, setMode] = useState(Misc.cBlank);
    const [currentSchoolClass, setCurrentSchoolClass] = useState({});
    const [crudState, setCrudState] = useState({state: Misc.LoadCrudState.Blank, message: ''});


    const {id} = useParams();
    const from = props.from;
    //Business Logic
    //lade die Liste der SchoolClass
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der SchoolClass
        load(id);

    }, [id]);

    const load = async (id) => {
        try {
            console.log(id);
            if (id) {
                console.log(from);
                if (from == "department"){
                const response = await DepartmentDataService.schoolClasses(id);
                setSchoolClasses(response.data);
                console.log(response.data);
                }else {
                    const response = await TeacherDataService.schoolClasses(id);
                setSchoolClasses(response.data);
                console.log(response.data);
                }
            } else {
                const response = await SchoolClassDataService.getAll();
                setSchoolClasses(response.data);
                console.log(response.data);
            }
            setLoadState({state: Misc.LoadState.Show});
        } catch (e) {
            setLoadState({state: Misc.LoadState.Error, error: e.message});
        }
        ;
    }


    const add = () => {
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank)

    }

    const edit = (schoolClassId) => {
        let schoolClass = schoolClasses.find(s => s.schoolClassId === schoolClassId);
        setCurrentSchoolClass(schoolClass);
        setMode(Misc.LoadCrudState.Edit);
    }

    const save = async (schoolClass) => {
        let response = true;
        console.log("save");
        try {
            //insert (create)
            if (schoolClass.schoolClassId === '') {
                response = await SchoolClassDataService.create(schoolClass);
                const schoolClassNew = response.data;
                setSchoolClasses([...schoolClasses, schoolClassNew]);
            }
            //update
            else {
                response = await SchoolClassDataService.update(schoolClass);
                const schoolClassNew = response.data;
                setSchoolClasses(schoolClasses.map(s => (s.schoolClassId === schoolClassNew.schoolClassId ? schoolClassNew : s)));
            }
            setCrudState({state: Misc.LoadCrudState.Success, message: Misc.getTimeMessage("Successfully saved")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }
    }


    const deleteF = async (schoolClassId) => {
        try {
            await SchoolClassDataService.remove(schoolClassId);
            setSchoolClasses(schoolClasses.filter(schoolClass => schoolClass.schoolClassId !== schoolClassId));
            setMode(Misc.cBlank);
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});
        } catch (e) {
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
                    <Row className="mt-3">
                        <Col lg="1">
                            <Button size="sm-1" variant="success" onClick={add} active>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h3>Schulklassen</h3>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            Anzahl der Schulklassen: {schoolClasses.length}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SchoolClassList schoolClasses={schoolClasses}
                                             edit={edit}
                                             delete={deleteF}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col
                            className={crudState.state === Misc.LoadCrudState.Error ? 'text-bg-danger' : 'text-bg-success'}>
                            <h4>{crudState.message}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {mode === Misc.LoadCrudState.Blank && <></>}
                            {mode === Misc.LoadCrudState.Add && <SchoolClassSingle save={save}/>}
                            {mode === Misc.LoadCrudState.Edit &&
                                <SchoolClassSingle save={save} schoolClass={currentSchoolClass}/>}
                        </Col>
                    </Row>
                </Container>}
        </>
    );
}
export default SchoolClassesList;