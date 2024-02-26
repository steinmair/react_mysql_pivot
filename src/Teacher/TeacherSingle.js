import teacher from "./Teacher";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const TeacherSingle = (props) => {
    const update = (event) => {
        console.log()

        const {name,value} = event.target;
        setTeacher({...teacher,[name]:value})
    };

    const save = () => {
    };


    const initialTeacherState = {
        teacherId: '',
        surname: 'AAA',
        firstname: 'AAA',
        shortName: 'AW',
        sex: 'm',
        email: '',
        phone: ''
    };

    const [teacher, setTeacher] = useState(initialTeacherState);

    useEffect(() => {
        if (props.teacher) {
            setTeacher(props.teacher)
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
                    <Form.Label htmlFor="teracherId">TeacherId</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="number" name="teacherId" value={teacher.teacherId} readOnly disabled
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="surname">Surname</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Surname" name="surname" value={teacher.surname}
                                  onChange={update}/>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="firstname">Firstname</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Firstname" name="firstname" value={teacher.firstname}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="title">Title</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Title" name="title" value={teacher.title}
                                  onChange={update}/>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="title">ShortName</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter ShortName" name="shortName" value={teacher.shortName}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="2">
                    <Form.Label htmlFor="sex">Sex</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control as="select" name="sex" value={teacher.sex} onChange={update}>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </Form.Control>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter Phone" name="phone" value={teacher.contactphone}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="2">
                    <Form.Label htmlFor="email">Email</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter E-Mail" name="email" value={teacher.email}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row className="mt-4 mb-5">
                <Col lg="1">
                    <Button size="sm-1" variant="success" onClick={() => props.save(teacher)}>
                        {teacher.teacherId === '' ? "Insert" : "Update"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherSingle;