import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";

const StudentSingle = (props) => {

    const initialSchoolClassState = {
        studentId: '',
        schoolClass: '',
        surname: '',
        firstname: '',
        sex: '',
    }  // JSON Object für einen Absence

    const schoolClasses = props.schoolClasses

    const [student, setStudent] = useState(initialSchoolClassState);
    const update = (event) => {
        Misc.showLog("StudentSingle -> update");
        const {name, value} = event.target;
        if (name === "schoolClass"){
            setStudent({...student, [name]:{schoolClassId: value}})
        } else{
            setStudent({...student, [name]: value})
        }
    }

    useEffect(() => {
        console.log("Ausgewählter Absence: ", student)
    }, [student]);

    useEffect(() => {
        Misc.showLog("AbsenceSingle -> useEffect: (props)");
        Misc.showLog(props.student)

        if (props.student)
            setStudent(props.student)
    }, [props]);
    return (
        <Container fluid className="mt-5 border shadow">
            <Row className="m-4">
                <Col sm="12">
                    <h3>Stammdaten</h3>
                </Col>
            </Row>
            <Row className="justify-content-around mb-4 fs-5">
                <Col sm="3">
                    <Form.Label htmlFor="studentId">StudentId</Form.Label>
                    <Form.Control disabled type="number" name="studentId" value={student.studentId} onChange={update}/>
                </Col>
                <Col sm="3">
                    <Form.Group controlId="schoolClassId">
                        <Form.Label>Schulklasse</Form.Label>
                        <Form.Select name="schoolClass" aria-label="Schulklasse" onChange={update}>
                            <option>{student.schoolClass.name || "Bitte Auswählen"}</option>
                            {schoolClasses.map(s => (
                                <option key={s.schoolClassId} value={s.schoolClassId}>{s.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-around mb-4 fs-5">
                <Col sm="3">
                    <Form.Label htmlFor="firstname">Vorname</Form.Label>
                    <Form.Control type="text" name="firstname" value={student.firstname} onChange={update}/>
                </Col>
                <Col sm="3">
                    <Form.Label htmlFor="surname">Nachname</Form.Label>
                    <Form.Control type="text" name="surname" value={student.surname} onChange={update}/>
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                <Col className="justify-content-center col-9 fs-5">
                    <Form.Label as="legend" htmlFor="sex">Geschlecht</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="checkbox"
                            id="männlich"
                            label="Männlich"
                            name="sex"
                            value="m"
                            checked={student.sex === 'm'}
                            onChange={update}
                        />
                        <Form.Check
                            inline
                            type="checkbox"
                            id="weiblich"
                            label="Weiblich"
                            name="sex"
                            value="f"
                            checked={student.sex === 'f'}
                            onChange={update}
                        />
                        {/* Weitere Radio-Buttons für andere Geschlechter können hier hinzugefügt werden */}
                    </div>
                </Col>
            </Row>
            <Col className="m-2">
                <Button className="shadow" variant="success" onClick={() => props.save(student)}>
                    {student.studentId === '' ? "Insert" : "Update"}
                </Button>
            </Col>
        </Container>
    )

}

export default StudentSingle;
