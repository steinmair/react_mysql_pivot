import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";

const AbsenceSingle = (props) => {

    const initialAbsenceState = {
        absenceId: '',
        student: '',
        timeFrom: '',
        timeTo: '',
        reason:''
    }  // JSON Object für einen Absence

    const students = props.students

    const [absence, setAbsence] = useState(initialAbsenceState);
    const update = (event) => {
        Misc.showLog("AbsenceSingle -> update");
        const {name, value} = event.target;
        setAbsence({...absence,[name]: value});
        // if (name === "student"){
        //     setAbsence({...absence, [name]:{studentId: value}})
        // } else{
        //     setAbsence({...absence, [name]: value})
        //     console.log("Sind wir immer im else???")
        // }
    }

    useEffect(() => {
        console.log("Ausgewählter Absence: ", absence)
    }, [absence]);

    useEffect(() => {
        Misc.showLog("AbsenceSingle -> useEffect: (props)");
        Misc.showLog(props.absence)

        if (props.absence)
            setAbsence(props.absence)
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
                    <Form.Label htmlFor="absenceId">AbsenceId</Form.Label>
                    <Form.Control disabled type="number" name="absenceId" value={absence.absenceId} onChange={update}/>
                </Col>
                {/*<Col sm="3">*/}
                {/*    <Form.Group controlId="studentId">*/}
                {/*        <Form.Label>Schüerl/in</Form.Label>*/}
                {/*        <Form.Select name="student" aria-label="Student" onChange={update}>*/}
                {/*            <option>{absence.student.surname || "Bitte Auswählen"}</option>*/}
                {/*            {student.map(s => (*/}
                {/*                <option key={s.studentId} value={s.studentId}>{s.surname}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Select>*/}
                {/*    </Form.Group>*/}
                {/*</Col>*/}
                <Col sm="3">
                    <Form.Label htmlFor="reason">Reason</Form.Label>
                    <Form.Control type="text" name="reason" value={absence.reason} onChange={update}/>
                </Col>
                {/*<Col sm="3">*/}
                {/*    <Form.Group controlId="studentId">*/}
                {/*        <Form.Label>Schüler/in</Form.Label>*/}
                {/*        <Form.Select name="student" aria-label="Schüler" onChange={update}>*/}
                {/*            <option>{absence.student.surname || "Bitte Auswählen"}</option>*/}
                {/*            {student.map(s => (*/}
                {/*                <option key={s.studentId} value={s.studentId}>{s.surname}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Select>*/}
                {/*    </Form.Group>*/}
                {/*</Col>*/}
            </Row>
            <Row className="justify-content-around mb-4 fs-5">
                <Col sm="3">
                    <Form.Label htmlFor="timeFrom">Time From</Form.Label>
                    <Form.Control type="date" name="timeFrom" value={absence.timeFrom} onChange={update}/>
                </Col>
                <Col sm="3">
                    <Form.Label htmlFor="timTo">Time To</Form.Label>
                    <Form.Control type="date" name="timeTo" value={absence.timeTo} onChange={update}/>
                </Col>
            </Row>
            <Col className="m-2">
                <Button className="shadow" variant="success" onClick={() => props.save(absence)}>
                    {absence.absenceId === '' ? "Insert" : "Update"}
                </Button>
            </Col>
        </Container>
    )

}

export default AbsenceSingle;
