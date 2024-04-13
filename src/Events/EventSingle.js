import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventSingle = (props) => {
    const initialEventState = {
        eventId: '',
        dateFrom: '',
        dateTo: '',
        destination: '',
        description: '',
        schoolClass:  ""
    };

    const schoolClasses = props.schoolClasses
    const [events, setEvent] = useState(initialEventState);


    const update = (event) => {
        Misc.showLog("EventSingle -> update");
        const {name, value} = event.target;
        if (name === "schoolClass"){
            setEvent({...events, [name]:{schoolClassId: value}})
        } else{
            setEvent({...events, [name]: value})
        }
    }

    useEffect(() => {
        Misc.showLog(props.event);

        if (props.event) {
            let updatedEvent = { ...props.event };

            // Konvertieren von timeTo in ein lesbares Format, falls vorhanden
            if (props.event.dateTo) {
                const dateTo = new Date(props.event.dateTo);
                // const formattedTimeTo = dateTimeTo.toLocaleString();
                const formattedDateTo = formatDate(dateTo);
                updatedEvent = { ...updatedEvent, dateTo: formattedDateTo };
            }

            // Konvertieren von timeFrom in ein lesbares Format, falls vorhanden
            if (props.event.dateFrom) {
                const dateFrom = new Date(props.event.dateFrom);
                // const formattedTimeFrom = dateTimeFrom.toLocaleString();
                const formattedDateFrom = formatDate(dateFrom);
                updatedEvent = { ...updatedEvent, dateFrom: formattedDateFrom };
            }
            setEvent(updatedEvent);
        }
    }, [props]);
    useEffect(() => {
        console.log("Erstellte Event :", events);
    },[events]);

    const [startDate, setStartDate] = useState(props.event && props.event.dateFrom ? new Date(props.event.dateFrom) : new Date());
    const [endDate, setEndDate] = useState(props.event && props.event.dateTo ? new Date(props.event.dateTo) : new Date());


    console.log(startDate);
    console.log(endDate);


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // notwendig um das Datum richtig zu formatieren
    const handleDateChangeStart = (date) => {
        setStartDate(date);
        const formattedDate = formatDate(date);
        console.log(formattedDate);
        update({ target: { name: 'dateFrom', value: formattedDate } });
    }

    const handleDateChangeEnd = (date) => {
        setEndDate(date);
        const formattedDate = formatDate(date);
        console.log(formattedDate);
        update({ target: { name: 'dateTo', value: formattedDate } });
    }


    return (
        <Container fluid className="mt-5 border shadow">
            <Row className="m-4">
                <Col sm="12">
                    <h3>Stammdaten</h3>
                </Col>
                <Col sm="1">
                    <Form.Label htmlFor="eventId">EventId</Form.Label>
                    <Form.Control disabled type="text" name="event" value={events.eventId} readOnly
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="justify-content-around m-4 mt-5  fs-5">

                <Col sm="3">
                    <Form.Label htmlFor="destination">Ziel</Form.Label>
                    <Form.Control type="text" name="destination" value={events.destination} onChange={update} />
                </Col>
                <Col sm="3">
                    <Form.Label htmlFor="description">Beschreibung</Form.Label>
                    <Form.Control type="text" name="description" value={events.description} onChange={update} />
                </Col>



            </Row>
            <Row className="justify-content-around m-4 mt-5 fs-5">

                {/*<Col sm="6">*/}
                {/*    <Form.Label htmlFor="timeFrom">TimeFrom</Form.Label>*/}
                {/*    <Form.Control type="text" name="timeFrom" value={absence.timeFrom} onChange={update} />*/}
                {/*</Col>*/}
                {/*<Col sm="6">*/}
                {/*    <Form.Label htmlFor="timeTo">TimeTo</Form.Label>*/}
                {/*    <Form.Control type="text" name="timeTo" value={absence.timeTo} onChange={update} />*/}
                {/*</Col>*/}


                {/*DATEPICKER PROBE*/}
                <Col sm="3">
                    <Form.Label htmlFor="dateFrom">Von:</Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChangeStart}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Von"
                        className="form-control"
                    />
                </Col>
                <Col sm="3">
                    <Form.Label htmlFor="dateTo">Bis:</Form.Label>
                    <DatePicker
                        selected={endDate}
                        onChange={handleDateChangeEnd}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Bis"
                        className="form-control"
                    />
                </Col>


            </Row>

            <Row className="justify-content-around m-4 mt-5 fs-5">

                <Col sm="3">
                    <Form.Group controlId="schoolClassId">
                        <Form.Label>Schulklasse</Form.Label>
                        <Form.Select name="schoolClass" aria-label="Schulklasse" onChange={update}>
                            <option>{events.schoolClass.name || "Bitte Auswählen"}</option>
                            {schoolClasses.map(s => (
                                <option key={s.schoolClassId} value={s.schoolClassId}>{s.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-around m-4 mt-5 fs-5">
            <Col className="m-2">
                <Button className="shadow" variant="success" onClick={() => props.save(events)}>
                    {events.eventId === '' ? "Insert" : "Update"}
                </Button>
            </Col>
            </Row>
        </Container>
    );
};

export default EventSingle;