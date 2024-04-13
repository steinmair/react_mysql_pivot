import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Misc from "../Utilities/Apps/Misc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AbsenceSingle = (props) => {
    const initialAbsenceState = {
        absenceId: '',
        student: {
            studentId: props.students.studentId,
            sex: props.students.sex
        },
        reason: '',
        period: '',
        timeTo: '',
        timeFrom: ''
    };

    const [absence, setAbsence] = useState(initialAbsenceState);

    const update = (event) => {
        Misc.showLog("AbsenceSingle -> update");
        const {name, value} = event.target;
        setAbsence({...absence, [name]: value})
    }

    useEffect(() => {
        Misc.showLog(props.absence);

        if (props.absence) {
            let updatedAbsence = { ...props.absence };

            // Konvertieren von timeTo in ein lesbares Format, falls vorhanden
            if (props.absence.timeTo) {
                const dateTimeTo = new Date(props.absence.timeTo);
                // const formattedTimeTo = dateTimeTo.toLocaleString();
                const formattedTimeTo = formatDate(dateTimeTo);
                updatedAbsence = { ...updatedAbsence, timeTo: formattedTimeTo };
            }

            // Konvertieren von timeFrom in ein lesbares Format, falls vorhanden
            if (props.absence.timeFrom) {
                const dateTimeFrom = new Date(props.absence.timeFrom);
                // const formattedTimeFrom = dateTimeFrom.toLocaleString();
                const formattedTimeFrom = formatDate(dateTimeFrom);
                updatedAbsence = { ...updatedAbsence, timeFrom: formattedTimeFrom };
            }
            setAbsence(updatedAbsence);
        }
    }, [props]);
    useEffect(() => {
        console.log("Erstellte Abwesenheit :", absence);
    },[absence]);

    const [startDate, setStartDate] = useState(props.absence && props.absence.timeFrom ? new Date(props.absence.timeFrom) : new Date());
    const [endDate, setEndDate] = useState(props.absence && props.absence.timeTo ? new Date(props.absence.timeTo) : new Date());


    console.log(startDate);
    console.log(endDate);


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // notwendig um das Datum richtig zu formatieren
    const handleDateChangeStart = (date) => {
        setStartDate(date);
        const formattedDate = formatDate(date);
        console.log(formattedDate);
        update({ target: { name: 'timeFrom', value: formattedDate } });
    }

    const handleDateChangeEnd = (date) => {
        setEndDate(date);
        const formattedDate = formatDate(date);
        console.log(formattedDate);
        update({ target: { name: 'timeTo', value: formattedDate } });
    }


    return (
        <Container fluid className="mt-5 border shadow">
            <Row className="m-4">
                <Col sm="12">
                    <h3>Stammdaten</h3>
                </Col>
            </Row>
            <Row className="justify-content-around mb-4 fs-5">

                <Col sm="2">
                    <Form.Label htmlFor="studentId">SchülerId</Form.Label>
                    <Form.Control disabled type="text" name="student" value={absence.student.studentId}/>
                </Col>

                <Col sm="3">
                    <Form.Label htmlFor="reason">Reason</Form.Label>
                    <Form.Control type="text" name="reason" value={absence.reason} onChange={update} />
                </Col>
                <Col sm="3">
                    <Form.Label htmlFor="period">Period</Form.Label>
                    <Form.Control type="text" name="period" value={absence.period} onChange={update} />
                </Col>
            </Row>
            <Row className="justify-content-around mb-4 fs-5">

                {/*<Col sm="6">*/}
                {/*    <Form.Label htmlFor="timeFrom">TimeFrom</Form.Label>*/}
                {/*    <Form.Control type="text" name="timeFrom" value={absence.timeFrom} onChange={update} />*/}
                {/*</Col>*/}
                {/*<Col sm="6">*/}
                {/*    <Form.Label htmlFor="timeTo">TimeTo</Form.Label>*/}
                {/*    <Form.Control type="text" name="timeTo" value={absence.timeTo} onChange={update} />*/}
                {/*</Col>*/}


                {/*DATEPICKER PROBE*/}
                <Col sm="6">
                    <Form.Label htmlFor="timeFrom">Beginn der Abwesenheit  </Form.Label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChangeStart}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Beginn der Abwesenheit"
                        className="form-control"
                    />
                </Col>
                <Col sm="6">
                    <Form.Label htmlFor="timeTo">Ende der Abwesenheit  </Form.Label>
                    <DatePicker
                        selected={endDate}
                        onChange={handleDateChangeEnd}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Ende der Abwesenheit"
                        className="form-control"
                    />
                </Col>

            </Row>

            <Col className="m-2">
                <Button className="shadow" variant="success" onClick={() => props.save(absence)}>
                    {absence.absenceId === '' ? "Insert" : "Update"}
                </Button>
            </Col>
        </Container>
    );
};

export default AbsenceSingle;