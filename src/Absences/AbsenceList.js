import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import Absence from "./Absence";

const AbsenceList = (props) => {
    const absences = props.absences;
    const [searchCriteria, setSearchCriteria] =
        useState({reason: ""});

    const updateFilter = (event) => {
        const {name, value} = event.target;
        console.log(event)
        setSearchCriteria({...searchCriteria, [name]: value})
    console.log(searchCriteria)
    }

return (
        <>
           <Row>
                <Col>
                    <Form.Control type="text" placeholder="Reason" name="reason"
                                  value={searchCriteria.surname} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>Schüler/in</Col>
                <Col>Time FROM</Col>
                <Col>Time TO</Col>
                <Col>Period</Col>
                <Col>Reason</Col>
                <Col>Actions</Col>
            </Row>
            {absences.filter(a => a.reason.includes(searchCriteria.reason) )
                .map((absence,index) => <Absence index = {index}
                                                 key = {absence.studentId}
                                                 absence={absence}
                                                 edit={props.edit}
                                                 delete={props.delete}/>)}
        </>
    )
}

export default AbsenceList;