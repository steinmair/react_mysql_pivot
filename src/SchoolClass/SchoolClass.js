import React from "react";
import {Button, Col, Row} from "react-bootstrap";

const SchoolClass = (props) => {
    const schoolClass = props.schoolClass;

    return(
        <>
            <Row>
                <Col>{schoolClass.schoolClassId}</Col>
                <Col>{schoolClass.name}</Col>
                <Col>{schoolClass.department && schoolClass.department.nameShort}</Col>
                <Col>{schoolClass.level}</Col>
                <Col>{schoolClass.description}</Col>
                <Col>{schoolClass.teacher && `${schoolClass.teacher.title} ${schoolClass.teacher.surname} ${schoolClass.teacher.firstname}`}</Col>
                <Col className="mb-1">
                    <Button variant={"success"} className="me-1"  onClick={() => props.edit(schoolClass.schoolClassId)} >Edit</Button>
                    <Button variant={"danger"} className="me-1"  onClick={() => props.delete(schoolClass.schoolClassId)} >Delete</Button></Col>

            </Row>

        </>
    )
}
export default SchoolClass ;