import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import EventDataService from "../Services/EventDataService";
import EventList from "./EventList";
import EventSingle from "./EventSingle";
import {useParams} from "react-router-dom";
import SchoolClassDataService from "../Services/SchoolClassDataService";
import {AxiosHeaders as props} from "axios";
import TeacherDataService from "../Services/TeacherDataService";
import DepartmentDataService from "../Services/DepartmentDataService";



const EventsList = (props) => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [loadCrudState, setLoadCrudState] = useState({state: Misc.LoadState.Load, error: null});
    const [events, setEvents] = useState([]);
    const [mode, setMode] = useState(Misc.cBlank);
    const [currentEvent, setCurrentEvent] = useState({});
    const [crudState, setCrudState] = useState({state: Misc.LoadCrudState.Blank, message: ''});
    const {id} = useParams();

    //const {id} = useParams();
    //const from = props.from;
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
            const response = await SchoolClassDataService.events(id);
            setEvents(response.data);
            console.log(response.data);
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

    const edit = (eventId) => {
        let event = events.find(e => e.eventId === eventId);
        setCurrentEvent(event);
        setMode(Misc.LoadCrudState.Edit);
    }

    const save = async (event) => {
        let response = true;
        console.log("save");
        try {
            //insert (create)
            if (event.eventId === '') {
                response = await EventDataService.create(event);
                const eventNew = response.data;
                setEvents([...events, eventNew]);
            }
            //update
            else {
                response = await EventDataService.update(event);
                const eventNew = response.data;
                setEvents(events.map(e => (e.eventId === eventNew.eventId ? eventNew : e)));
            }
            setCrudState({state: Misc.LoadCrudState.Success, message: Misc.getTimeMessage("Successfully saved")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }
    }


    const deleteF = async (eventId) => {
        try {
            await EventDataService.remove(eventId);
            setEvents(events.filter(event => event.eventId !== eventId));
            setMode(Misc.cBlank);
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data});
        }
    }


    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="Event"/>}
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
                            <h3>Events</h3>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            Anzahl der Events: {events.length}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <EventList events={events}
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
                            {mode === Misc.LoadCrudState.Add && <EventSingle save={save}/>}
                            {mode === Misc.LoadCrudState.Edit &&
                                <EventSingle save={save} event={currentEvent}/>}
                        </Col>
                    </Row>
                </Container>}
        </>
    );
}
export default EventsList;