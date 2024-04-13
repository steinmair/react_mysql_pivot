import React from "react";
import {Button, Col, Row} from "react-bootstrap";

const Event = (props) => {
    const event = props.event;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return(
        <>
        <Row>
            <Col>{event.schoolClass.name}</Col>
            <Col>{event.eventId}</Col>
            <Col>{formatDate(event.dateFrom)}</Col>
            <Col>{formatDate(event.dateTo)}</Col>
            <Col>{event.destination}</Col>
            <Col>{event.description === null ? "/" : event.description}</Col>
            <Col className="mb-1">
                <Button variant={"success"} className="me-1" onClick={() => props.edit(event.eventId)} active>Edit
                </Button>
                &nbsp;
                <Button variant={"danger"} onClick={() => props.delete(event.eventId)}>Delete</Button>
            </Col>
        </Row>

        </>
    )
}
export default Event
;