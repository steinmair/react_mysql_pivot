import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Event = (props) => {
    const event = props.event;

    return(
        <>
            <Row>
                <Col>{event.eventId}</Col>
                <Col>{event.dateFrom}</Col>
                <Col>{event.dateTo}</Col>
                <Col>{event.destination}</Col>
                <Col>{event.description}</Col>
                <Col className="mb-1">
                    <Button variant={"success"} className="me-1"  onClick={() => props.edit(event.eventId)} >Edit</Button>
                    <Button variant={"danger"} className="me-1"  onClick={() => props.delete(event.eventId)} >Delete</Button></Col>

                <Col>
                    <Link to={`/schoolClasses/${schoolClass.schoolClassId}/students`}>
                        <Button size="sm" variant="primary">
                            Schüler/innen
                        </Button>
                    </Link>
                </Col>
            </Row>

        </>
    )
}
export default Event ;