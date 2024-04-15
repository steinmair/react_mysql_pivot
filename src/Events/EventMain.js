import '../App.css';
import {useEffect, useState} from "react";
import Misc from "../Utilities/Apps/Misc";
import {Button, Col, Container, Row} from "react-bootstrap";
import EventList from "./EventList";
import {useParams} from "react-router-dom";
import DataService from "../Services/DataService";
import EventSingle from "./EventSingle";

const EventClassMain = () => {

    //Zustände
    const [loadState, setLoadState] = useState({state: Misc.LoadState.Load, error: null});
    const [mode, setMode] = useState(Misc.LoadCrudState.Blank);
    const [events, setEvents] = useState([]);
    const [schoolClasses, setSchoolClasses] = useState([]);
    const [masterObject, setMasterObject] = useState();
    const [currentEvent, setCurrentEvent] = useState({});
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
        loadSchoolClasses(detailId);

    }, []);

    const save = async (event) => {
        const formattedTimeFrom = new Date(event.dateFrom);
        const formattedTimeTo = new Date(event.dateTo);
        let response;
        console.log("save")
        // insert (Create)
        if (!event.eventId) {
            console.log("insert: ", event)
            try {
                const eventData = {
                    ...event,
                    dateFrom: formattedTimeFrom,
                    dateTo: formattedTimeTo
                };

                response = await DataService.create("events", eventData);
                console.log("insert")
                const eventNew = response.data;
                console.log("Response data: ", response.data);
                setEvents([...events, eventNew]);
                setCrudState({state: Misc.LoadCrudState.Add, message: Misc.getTimeMessage("Successfully")});

            } catch (e) {
                setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
            }
        }
        // update
        else {
            const eventData = {
                ...event,
                dateFrom: formattedTimeFrom,
                dateTo: formattedTimeTo
            };

            response = await DataService.update("events", eventData);
            console.log("update");
            const updateEvent = response.data;

            setEvents(events.map(a => a.eventId === updateEvent.eventId ? updateEvent : a) );

            }

        }



    const load = async (master, detailId) => {
        try {
            if (detailId) {
                const response = await DataService.getMasterDetail(master, detailId, "events");

                setEvents(response.data)
                const masterObject = await DataService.get(master, detailId)
                setMasterObject(masterObject.data);
            } else {
                const response = await DataService.getAll("events");
                setEvents(response.data)
            }
            setLoadState({state: Misc.LoadState.Show})
        } catch (e) {
            console.error(e);
            setLoadState({state: Misc.LoadState.Error, error: e.message})
        }
    };

// VON HIER
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

// BIS HIER


    const add = () => {
        setCrudState({state: Misc.LoadCrudState.Blank, message: ""});
        if (mode === Misc.LoadCrudState.Blank)
            setMode(Misc.LoadCrudState.Add);
        else
            setMode(Misc.LoadCrudState.Blank);
    }

    const edit = (eventId) => {

        let event = events.find(a => a.eventId === eventId);
         setCrudState({state: Misc.LoadCrudState.Delete, message: ""});
        setCurrentEvent(event);
        console.log("CurrentEvent:     ", event);

        console.log("MODUS: ",mode);
        if (mode === Misc.LoadCrudState.Blank) {
            setMode(Misc.LoadCrudState.Edit);
            console.log("EventId im Modus EDIT: ", eventId);
        }
        else
            setMode(Misc.LoadCrudState.Blank);
        console.log("EventId: ", eventId)
    }

    const deleteF = async (eventId)=>{
        try {
            await DataService.remove("events", eventId);
            setEvents(events.filter(e => e.eventId !== eventId))
            setMode(Misc.Blank)
            setCrudState({state: Misc.LoadCrudState.Delete, message: Misc.getTimeMessage("Successfully deleted")});
        } catch (e) {
            setCrudState({state: Misc.LoadCrudState.Error, message: e.response.data})
        }
    }
    //Layout
    return (
        <>
            {loadState.state === Misc.LoadState.Load && <Misc.Loading page="events"/>}
            {loadState.state === Misc.LoadState.Error && <Misc.Error message={loadState.error}/>}
            {loadState.state === Misc.LoadState.Show &&
            <Container fluid>
                <Row>
                    <Col lg="11">
                        <h3>Events ({events.length})</h3>
                    </Col>
                    <Col lg="1">
                    <Button size="sm" variant="success" onClick={add} active>
                            Add
                        </Button>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <h3>Events</h3>
                    </Col>
                    <Col>
                        {events.length}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EventList events={events}
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
                        {mode === Misc.LoadCrudState.Add && <EventSingle save={save}
                                                                            schoolClasses={schoolClasses}
                        />}
                        {mode === Misc.LoadCrudState.Edit && <EventSingle event={currentEvent}
                                                                            save={save}
                                                                            schoolClasses={schoolClasses}/>}
                    </Col>
                    <Col lg="12"></Col>
                </Row>
            </Container>}

        </>
    );
}
export default EventClassMain;