import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import AbsenceList from "./AbsenceList";
import AbsenceSingle from "./AbsenceSingle";
import {useParams} from "react-router-dom";
import DataService from "../Services/DataService";

const AbsenceClassMain = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [mode, setMode] = useState(Misc.LoadCrudState.Blank);
    const [absences, setAbsences] = useState([]);
    const [students, setStudents] = useState([]);
    const [masterObject, setMasterObject] = useState();
    const [currentAbsence, setCurrentAbsence] = useState({});
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
        loadStudents(detailId);

    }, []);

    const save = async (absence) => {
        const formattedTimeFrom = new Date(absence.timeFrom);
        const formattedTimeTo = new Date(absence.timeTo);
        let response;
        console.log("save")
        // insert (Create)
        if (!absence.absenceId) {
            console.log("insert: ", absence)
            try {
                const absenceData = {
                    ...absence,
                    timeFrom: formattedTimeFrom,
                    timeTo: formattedTimeTo
                };

                response = await DataService.create("absences", absenceData);
                console.log("insert")
                const absenceNew = response.data;
                console.log("Response data: ", response.data);
                setAbsences([...absences, absenceNew]);
                setCrudState({state: Misc.LoadCrudState.Add, message: Misc.getTimeMessage("Successfully")});

            } catch (e) {
                setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
            }
        }
        // update
        else {
            const absenceData = {
                ...absence,
                timeFrom: formattedTimeFrom,
                timeTo: formattedTimeTo
            };

            response = await DataService.update("absences", absenceData);
            console.log("update");
            const updatedAbsence = response.data;

            setAbsences(absences.map(a => {
                if (a.absenceId === updatedAbsence.absenceId) {
                    return updatedAbsence;
                }
                return a;
            }));
        }
        setMode(Misc.LoadCrudState.Blank);
    }

    const load = async (master, detailId) => {
        try {
            if (detailId) {
                const response = await DataService.getMasterDetail(master, detailId, "absences");

                setAbsences(response.data)
                const masterObject = await DataService.get(master, detailId)
                setMasterObject(masterObject.data);
            } else {
                const response = await DataService.getAll("absences");
                setAbsences(response.data)
            }
            setLoadState({state: Misc.LoadState.Show})
        } catch (e) {
            console.error(e);
            setLoadState({state: Misc.LoadState.Error, error: e.message})
        }
    };

// VON HIER
    const loadStudents = async (detailId) => {
        try {
            const student = await DataService.get(students, detailId)
            setMasterObject(student.data);
            setLoadState({state: Misc.LoadState.Show})
        } catch (e) {
            console.error(e);
            setLoadState({state: Misc.LoadState.Error, error: e.message})
        }
    };

// BIS HIER


    const add = () => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank);
    }

    const edit = (absenceId) => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        let absence = absences.find(a => a.absenceId === absenceId);
        // setCrudState({state: Misc.LoadCrudState.Delete, message: ""});
        setCurrentAbsence(absence);
        console.log("CurrentAbsence:     ", absence);
        setMode(Misc.LoadCrudState.Edit);
        console.log("MODUS: ",mode);
        if (mode === Misc.LoadCrudState.Blank) {
            setMode(Misc.LoadCrudState.Edit);
            console.log("AbsenceId im Modus EDIT: ", absenceId);
        }
        else
            setMode(Misc.LoadCrudState.Blank);
        console.log("AbsenceId: ", absenceId)
    }

    const deleteF = async (absenceId)=>{
        try {
            await DataService.remove("absences", absenceId);
            setAbsences(absences.filter(absence => absence.absenceId !== absenceId))
            setMode(Misc.Blank)
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
        }
    }
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="absences"/>}
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
                        <h3>Abwesenheiten</h3>
                    </Col>
                    <Col>
                        {absences.length}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AbsenceList absences={absences}
                                     delete={deleteF}
                                     edit={edit}/>
                    </Col>
                </Row>

                <Row>
                    <Col className={crudState.state === Misc.LoadCrudState.Error ? "text-danger" : "text-success"}>{crudState.message}</Col>
                </Row>

                <Row>
                    <Col>
                        {mode === Misc.LoadCrudState.Blank && <></>}
                        {mode === Misc.LoadCrudState.Add && <AbsenceSingle save={save}
                                                                            students={masterObject}
                        />}
                        {mode === Misc.LoadCrudState.Edit && <AbsenceSingle absence={currentAbsence}
                                                                            save={save}
                                                                            students={masterObject}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default AbsenceClassMain;