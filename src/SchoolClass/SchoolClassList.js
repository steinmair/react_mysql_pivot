import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import SchoolClass from "./SchoolClass";

const SchoolClassList = (props) => {
    const schoolClasses = props.schoolClasses;
    const [searchCriteria, setSearchCriteria] =
        useState({schoolClassId: "", name: "", level: ""});

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
                {/*    Hier kommt dann der Name vom Master object rein (also der Lehrer)*/}
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter search criteria" name="name"
                                  value={searchCriteria.name} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col><h5>SchoolClassId</h5></Col>
                <Col><h5>Name</h5></Col>
                <Col><h5>Level</h5></Col>
                <Col><h5>Department</h5></Col>
                <Col><h5>Beschreibung</h5></Col>
                <Col><h5>Lehrer</h5></Col>
                <Col><h5>Actions</h5></Col>
                <Col><h5>Links</h5></Col>

            </Row>


            {schoolClasses.filter(schoolClass => schoolClass.name.includes(searchCriteria.name))
                .map((schoolClass,index) => <SchoolClass    index={index}
                                                            key = {schoolClass.schoolClassId}
                                                            schoolClass={schoolClass}
                                                            edit={props.edit}
                                                            delete={props.delete}/>)}

        </>
    )
}

export default SchoolClassList;