import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Student = (props) => {
    const student = props.student;

    return(
        <>
        <Row>
            <Col>{student.studentId}</Col>

            <Col>{student.surname}</Col>
            <Col>{student.firstname}</Col>
            <Col>{student.sex}</Col>
            <Col>{student.schoolClass.name}</Col>
            <Col>{student.schoolClass.department.nameShort}</Col>
            <Col className="mb-1">
                <Button variant={"success"} className="me-1" onClick={() => props.edit(student.studentId)} active>Edit
                </Button>
                &nbsp;
                <Button variant={"danger"} onClick={() => props.delete(student.studentId)}>Delete</Button>
            </Col>
            <Col className="mb-1">
                <Link to={`/students/${student.studentId}/absences`}>
                    <Button size="sm" variant="primary">Absence</Button>
                </Link>
            </Col>
        </Row>

        </>
    )
}
export default Student;