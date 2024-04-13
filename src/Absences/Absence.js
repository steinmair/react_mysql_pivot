import React from "react";
import {Button, Col, Row} from "react-bootstrap";

const Absence = (props) => {
    const absence = props.absence;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return(
        <>
        <Row>
            <Col>{absence.student.firstname} {absence.student.surname}</Col>
            <Col>{formatDate(absence.timeFrom)}</Col>
            <Col>{formatDate(absence.timeTo)}</Col>
            <Col>{absence.period}</Col>
            <Col>{absence.reason}</Col>
            <Col className="mb-1">
                <Button variant={"success"} className="me-1" onClick={() => props.edit(absence.absenceId)} active>Edit
                </Button>
                &nbsp;
                <Button variant={"danger"} onClick={() => props.delete(absence.absenceId)}>Delete</Button>
            </Col>
        </Row>

        </>
    )
}
export default Absence;