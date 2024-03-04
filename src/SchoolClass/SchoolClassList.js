import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import SchoolClass from "./SchoolClass";


const SchoolClassList = (props) => {
    const schoolClasses = props.schoolClasses;
    const [searchCriteria, setSearchCriteria] =
        useState({schoolClassId: "", name: "", department:"", level: "", description: "", teacher:""});

    const updateFilter = (event) => {
        const {name, value} = event.target;
        console.log(event)
        setSearchCriteria({...searchCriteria, [name]: value})
        console.log(searchCriteria)
    }



    return (
        <>
            <Row className="mb-3">
                <Col></Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter Name" name="name"
                                  value={searchCriteria.name} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <hr/>
            <Row className="mb-3">
                <Col>SchoolClassId</Col>
                <Col>Name</Col>
                <Col>Department</Col>
                <Col>Level</Col>
                <Col>Description</Col>
                <Col>Teacher</Col>
                <Col>Actions</Col>
            </Row>


            {schoolClasses.filter(schoolClass =>
                schoolClass.name.includes(searchCriteria.name)
                )
                .map((schoolClass, index) => (
                    <SchoolClass
                        key={schoolClass.schoolClassId}
                        index={index}
                        schoolClass={schoolClass}
                        delete={props.delete}
                        edit={props.edit}
                    />
                ))
            }

        </>
    )
}

export default SchoolClassList;