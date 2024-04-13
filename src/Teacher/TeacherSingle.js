import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";

const TeacherSingle = (props) => {

    const initialTeacherState = {
        teacherId: '',
        surname: 'AAA',
        firstname: 'AAAAA',
        shortName: 'AAD',
        sex: 'm',
        title: 'AA',
        phone: '',
        email: ''
    }   // JSON Object für einen SchoolClass

    const [teacher, setTeacher] = useState(initialTeacherState);
    const update = (event)=> {
        Misc.showLog("SchoolClassSingle -> update");
        const{name, value} = event.target;
        setTeacher({...teacher, [name]: value});
    }


    useEffect(() => {
            Misc.showLog("SchoolClassSingle -> useEffect: (props)");
            Misc.showLog(props.teacher);

            if (props.teacher)
                setTeacher(props.teacher);

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
                    <Form.Label htmlFor="teacherId">TeacherId</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="number" name="teacherId" value={teacher.teacherId} readOnly disabled onChange={update}/>
                </Col>
            </Row>

            <Row>
                 <Col sm="2">
                    <Form.Label htmlFor="title">Titel</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter Titel" name="title" value={teacher.title} onChange={update}/>
                </Col>

                <Col sm="2">
                    <Form.Label htmlFor="shortName">shortName</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter short name" name="shortName" value={teacher.shortName} onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Form.Label htmlFor="surname">Surname</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter surname" name="surname" value={teacher.surname} onChange={update}/>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="firstname">Firstname</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter firstname" name="firstname"  value={teacher.firstname}onChange={update}/>
                </Col>
            </Row>
            <Row>
                 <Col sm="2">
                    <Form.Label htmlFor="sex">Sex</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter sex" name="sex" value={teacher.sex} onChange={update}/>
                </Col>
                <Col sm="2">
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter Phone" name="phone" value={teacher.phone}onChange={update}/>
                </Col>
                  <Col sm="2">
                    <Form.Label htmlFor="email">Email</Form.Label>
                </Col>
                <Col sm="2">
                    <Form.Control type="text" placeholder="Enter email" name="email" value={teacher.email}onChange={update}/>
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <Button variant="success" onClick={() => props.save(teacher)}>{teacher.teacherId === '' ? "Insert" : "Update"}</Button>
                </Col>

            </Row>
        </Container>
    )

}

export default TeacherSingle;
