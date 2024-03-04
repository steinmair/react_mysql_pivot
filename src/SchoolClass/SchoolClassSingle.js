
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const SchoolClassSingle = (props) => {
    const update = (event) => {
        console.log()

        const {name,value} = event.target;
        setSchoolClass({...schoolClass,[name]:value})
    };

    const save = () => {
    };


    const initialSchoolClassState = {
        schoolClassId: '',
        name: 'AAA',
        level: 'AAA',
        department: 'AW',
        description: 'm',
        teacher: ''

    };

    const [schoolClass, setSchoolClass] = useState(initialSchoolClassState);

    useEffect(() => {
        if (props.schoolClass) {
            setSchoolClass(props.schoolCLass)
        }
    }, [props]);

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col sm="12">
                    <hr/>
                    <h3>Stammdaten</h3>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="SchoolClassId">SchoolClassId</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="number" name="schoolClassId" value={schoolClass.schoolClassId} readOnly disabled
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="name">Name</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={schoolClass.name}
                                  onChange={update}/>
                </Col>

                <Col sm="2">
                    <Form.Label htmlFor="level">Level</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Level" name="level" value={schoolClass.level}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
            <Col sm="2">
                <Form.Label htmlFor="department">Department</Form.Label>
            </Col>
            <Col sm="4">
                <Form.Control type="text" placeholder="Enter Department" name="department" value={schoolClass.department && schoolClass.department.nameShort}
                              onChange={update}/>
            </Col>

                <Col sm="2">
                    <Form.Label htmlFor="description">Description</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Description" name="description" value={schoolClass.description}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="teacher">Teacher</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Teacher" name="teacher" value={schoolClass.teacherId}
                                  onChange={update}/>
                </Col>
            </Row>

            <Row className="mt-4 mb-5">
                <Col lg="1">
                    <Button size="sm-1" variant="success" onClick={() => props.save(schoolClass)}>
                        {schoolClass.schoolClassId === '' ? "Insert" : "Update"}
                    </Button>
                </Col>
            </Row>

        </Container>
    );
};

export default SchoolClassSingle;