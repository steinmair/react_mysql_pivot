import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const SchoolClass = (props) => {
    const schoolClass = props.schoolClass;

    return(
        <>
        <Row>
            <Col>{schoolClass.schoolClassId}</Col>

            <Col>{schoolClass.name}</Col>
            <Col>{schoolClass.level}</Col>
            <Col>{schoolClass.department.nameShort}</Col>
            <Col>{schoolClass.description === null ? "/" : schoolClass.description}</Col>
            <Col>{schoolClass.teacher.title} {schoolClass.teacher.surname} {schoolClass.teacher.firstname}</Col>
            <Col className="mb-1">
                <Button variant={"success"} className="me-1" onClick={() => props.edit(schoolClass.schoolClassId)} active>Edit
                </Button>
                &nbsp;
                <Button variant={"danger"} onClick={() => props.delete(schoolClass.schoolClassId)}>Delete</Button>
            </Col>

            <Col className="mb-1">
                <Link to={`/schoolclasses/${schoolClass.schoolClassId}/events`}>
                    <Button size="sm" variant="primary"> Events</Button>
                </Link>
            </Col>
        </Row>

        </>
    )
}
export default SchoolClass;