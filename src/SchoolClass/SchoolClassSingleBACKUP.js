import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";

const SchoolClassSingle = (props) => {

    const initialSchoolClassState = {
        schoolClassId: '',
        name: '',
        level: '',
        department: '',
        description: '',
        teacher: ''
    }   // JSON Object für einen SchoolClass

    const [schoolClass, setSchoolClass] = useState(initialSchoolClassState);
    const update = (event)=> {
        Misc.showLog("SchoolClassSingle -> update");
        const{name, value} = event.target;
        setSchoolClass({...schoolClass, [name]: value});
    }

    useEffect(() => {
            Misc.showLog("SchoolClassSingle -> useEffect: (props)");
            Misc.showLog(props.schoolClass);

            if (props.schoolClass)
                setSchoolClass(props.schoolClass);

    }, [props]);

    return (
        <Container fluid>
        <Row className="bg-secondary">
            <Col sm="12">
                    <h3></h3>
                </Col>
        </Row>
            <Row>
                <Col sm="12">
                    <h3>Stammdaten</h3>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlFor="schoolClassId">SchoolClassId</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="number" name="schoolClassId" value={schoolClass.schoolClassId} readOnly disabled onChange={update}/>
                </Col>
            </Row>

            <Row>
                 <Col sm="2">
                    <Form.Label htmlFor="name">Name</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={schoolClass.name} onChange={update}/>
                </Col>

                <Col sm="2">
                    <Form.Label htmlFor="level">Level</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter level" name="level" value={schoolClass.level} onChange={update}/>
                </Col>

                <Col sm="2">
                    <Form.Label htmlFor="department">Department</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter department" name="department" value={schoolClass.department} onChange={update}/>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="description">Description</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter desc" name="description" value={schoolClass.description} onChange={update}/>
                </Col>

                <Col sm="2">
                    <Form.Label htmlFor="teacher">Teacher</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter teacher" name="teacher" value={schoolClass.teacherId} onChange={update}/>
                </Col>
            </Row>


            <Row>
                <Col sm="2">
                    <Button variant="success" onClick={() => props.save(schoolClass)}>{schoolClass.schoolClassId === '' ? "Insert" : "Update"}</Button>
                </Col>

            </Row>
        </Container>
    )

}

export default SchoolClassSingle;
