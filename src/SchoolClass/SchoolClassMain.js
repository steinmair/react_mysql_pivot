import '../App.css';
import {useEffect, useState} from "react";
import SchoolClassDataService from "../Services/SchoolClassDataService";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import SchoolClassList from "./SchoolClassList";
import SchoolClassSingle from "./SchoolClassSingle";
import {useParams} from "react-router-dom";
import DataService from "../Services/DataService";

const SchoolClassesList = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [mode, setMode] = useState(Misc.LoadCrudState.Blank);
    const [schoolClass, setSchoolClass] = useState({});
    const [masterObject, setMasterObject] = useState();
    const [teachers, setTeachers] = useState();
    const [departments, setDepartments] = useState();
    const [currentSchoolClass, setCurrentSchoolClass] = useState({});
    const [crudState, setCrudState] = useState({state: Misc.LoadCrudState.Blank, message: ''});

    const  {detailId: detailId} = useParams();
    const  {master:master} = useParams();

    console.log("MASTER DETAIL:", master, detailId);
    //Business Logic
    //lade die Liste der SchoolClass
    //fetch von React oder Methoden von Axios
    //Haupt(problem): Datenzugriff asynchron

    useEffect(() => {
        //load - lade die Liste der SchoolClass
        load();
        loadSchoolClasses(master,detailId);
        loadTeachers();
        loadDepartments();
    }, []);

    const save = async (schoolClass) => {
        let response;
        console.log("Save Schoolclass")
        setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully stored")});
        if (schoolClass.schoolClassId === '') {
            // insert (create)
            try {
                console.log("insert");
                console.log(schoolClass);
                response = await DataService.create("schoolclasses",schoolClass);
                const schoolClassNew = response.data;
                console.log("Response: ", schoolClassNew);
                setSchoolClass([...schoolClass, schoolClassNew]);     // das teacher Array wird durch den Spread Operator (...) in einzelne SchoolClass-Objekte aufgespalten
                setCrudState({state: Misc.LoadCrudState.Add, message: Misc.getTimeMessage("Successfully")});
                loadSchoolClasses();
            } catch (e) {
                console.log(e.message);
            }
        } else {
            // update
            console.log("update");
            response = await DataService.update("schoolclasses",schoolClass);
            const schoolClassNew = response.data;
            setSchoolClass(schoolClass.map(s => s.schoolClassId === schoolClass.schoolClassId ? schoolClassNew : s));
            loadSchoolClasses();
        }
    }
    const load = async () => {
        DataService.getAll("schoolclasses")
            .then(response => {
                setSchoolClass(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message}))
    };

    const loadSchoolClasses = async (master,detailId) => {
        try {
            if (detailId){
                const response = await DataService.getMasterDetail(master,detailId,"schoolclasses");
                setSchoolClass(response.data)
                const masterObject = await DataService.get(master,detailId);
                setMasterObject(masterObject.data);
            }else{
                const response = await DataService.getAll("schoolclasses");
                setSchoolClass(response.data)
            }
            setLoadState({state: Misc.LoadState.Show})
        } catch (e){
            console.error(e);
            setLoadState({state: Misc.LoadState.Error, error: e.message})
        }
    };

    const loadTeachers = async () => {
        DataService.getAll("teachers")
            .then(response => {
                setTeachers(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message
            }))
    };
    const loadDepartments = async () => {
        DataService.getAll("departments")
            .then(response => {
                setDepartments(response.data);
                setLoadState({state: Misc.LoadState.Show});
            })
            .catch(error => setLoadState({
                state: Misc.LoadState.Error,
                error: error.message
            }))
    };
    const add = () => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        if (mode === Misc.LoadCrudState.Blank || mode === Misc.LoadCrudState.Edit )
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank);
    }

    const edit = (schoolClassId) => {
         setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        console.log("SchoolClass ID: " + schoolClassId);
        let schoolClass = schoolClass.find(s => s.schoolClassId === schoolClassId);
        setCurrentSchoolClass(schoolClass);
        setMode(Misc.LoadCrudState.Edit);
    }

    const deleteF = async (schoolClassId)=>{
        try {
            await DataService.remove("schoolclasses",schoolClassId);
            setSchoolClass(schoolClass.filter(schoolClass => schoolClass.schoolClassId !== schoolClassId));
            setMode(Misc.cBlank);
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});

        }catch (e){
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }
    }
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="Schoolclass"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row>
                    <Col lg="11">
                        <h3>Schoolclass ({schoolClass.length})</h3>
                    </Col>
                    <Col lg="1">
                        <Button size="sm" variant="success" onClick={add} active>
                            Add
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <SchoolClassList schoolClasses={schoolClass}
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
                         {mode === Misc.LoadCrudState.Add && <SchoolClassSingle save={save}/>}
                         {mode === Misc.LoadCrudState.Edit && <SchoolClassSingle save={save} schoolClass={currentSchoolClass}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default SchoolClassesList;

