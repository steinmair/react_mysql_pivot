import teacher from "./Teacher";
import React,{useState} from "react";
import {Button, Col, Container, Row, Form} from "react-bootstrap";
const TeacherSingle = () => {


    const update = () => {

    }

    const initialTeacherState = {
        teacherId: '',
        surname: 'AAA',
        firstname: 'AAA',
        shortName: 'AT1',
        sex: 'm'
    }

    const [teacher, setTeacher] = useState({});

    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <h3>Stammdaten</h3>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Control type="number" name="teacherId" value={teacher.teacherId} readOnly disabled
                                  onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlfor="surname">Surname</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter surname" name="surname" value={teacher.surname}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlfor="firstname">Firstname</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter firstname" name="firstname" value={teacher.firstname}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlfor="title">Title</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter title" name="title" value={teacher.title}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlfor="sex">Sex</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter sex" name="sex" value={teacher.sex}
                                  onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlfor="phone">Phone</Form.Label>
                </Col>
                <Col sm="4">
                    <Form.Control type="text" placeholder="Enter phone" name="phone" value={teacher.contactphone}
                                  onChange={update}/>
                </Col>
            </Row>
        </Container>
    )

}
export default TeacherSingle;