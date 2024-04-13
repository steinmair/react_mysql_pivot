import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Teacher = (props) => {
    const teacher = props.teacher;

    return(
        <>
        <Row>
            <Col>{teacher.teacherId}</Col>

            <Col>{teacher.surname}</Col>
            <Col>{teacher.firstname}</Col>
            <Col>{teacher.shortName}</Col>
            <Col>{teacher.sex}</Col>
            <Col className="mb-1">
                <Button variant={"success"} className="me-1" onClick={() => props.edit(teacher.teacherId)} active>Edit
                </Button>
                &nbsp;
                <Button variant={"danger"} onClick={() => props.delete(teacher.teacherId)}>Delete</Button>
            </Col>
            <Col className="mb-1">
                <Link to={`/teachers/${teacher.teacherId}/schoolClasses`}>
                    <Button size="sm" variant="primary"> Schulklassen</Button>
                </Link>
            </Col>
        </Row>

        </>
    )
}
export default Teacher;