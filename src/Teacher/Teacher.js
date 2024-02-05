import React from "react";
import {Button, Col, Row} from "react-bootstrap";

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
                <Button variant={"success"} className="me-1" >Edit</Button>
                <Button variant={"danger"}>Delete</Button></Col>
        </Row>

        </>
    )
}
export default Teacher;