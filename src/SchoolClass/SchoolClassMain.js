import '../App.css';
import {useEffect, useState} from "react";
import SchoolClassDataService from "../Services/SchoolClassDataService";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import SchoolClassList from "./SchoolClassList";
import SchoolClassSingle from "./SchoolClassSingle";
import {useParams} from "react-router-dom";
import DataService from "../Services/DataService";
import schoolClass from "./SchoolClass";

const SchoolClassMain = () => {

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
        load(master,detailId);
        //loadSchoolClasses(detailId);
        loadTeachers(detailId);
        loadDepartments(detailId);
    }, []);

    const save = async (schoolClass) => {
        try {
            let response;
            console.log("Save Schoolclass");

            if (schoolClass.schoolClassId === '') {
                // insert (create)
                console.log("insert");
                console.log(schoolClass);
                response = await DataService.create("schoolclasses", schoolClass);
            } else {
                // update
                console.log("update");
                response = await DataService.update("schoolclasses", schoolClass);
            }

            const schoolClassNew = response.data;
            console.log("Response: ", schoolClassNew);


            if (schoolClass.schoolClassId === '') {

                setSchoolClass([...schoolClass, schoolClassNew]);
                setCrudState({ state: Misc.LoadCrudState.Add, message: Misc.getTimeMessage("Successfully") });
            } else {

                setSchoolClass(schoolClass.map(s => s.schoolClassId === schoolClass.schoolClassId ? schoolClassNew : s));
            }


        } catch (error) {
            console.error("Error while saving:", error);
            let errorMessage = "Unknown error occurred";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || error.response.data.error || errorMessage;
            }
            setCrudState({ state: Misc.LoadCrudState.Error, message: errorMessage });
        }
    };
    const load = async (master,detailId) => {
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

        let schoolClasse = schoolClass.find(a => a.schoolClassId === schoolClassId);
        setCrudState({state: Misc.LoadCrudState.Delete, message: ""});
        setCurrentSchoolClass(schoolClasse);
        console.log("CurrentSchoolClass:     ", schoolClasse);

        console.log("MODUS: ",mode);
        if (mode === Misc.LoadCrudState.Blank) {
            setMode(Misc.LoadCrudState.Edit);
            console.log("EventId im Modus EDIT: ", schoolClassId);
        }
        else
            setMode(Misc.LoadCrudState.Blank);
        console.log("SchoolClassId: ", schoolClassId)
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
                        <h3>SchoolClass ({schoolClass.length})</h3>
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
                         {mode === Misc.LoadCrudState.Add && <SchoolClassSingle save={save}
                                                                                departments={departments}
                                                                                teachers ={teachers}

                         />}
                         {mode === Misc.LoadCrudState.Edit && <SchoolClassSingle save={save} schoolClass={currentSchoolClass}
                                                                                 departments={departments}
                                                                                 teachers ={teachers}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default SchoolClassMain;

