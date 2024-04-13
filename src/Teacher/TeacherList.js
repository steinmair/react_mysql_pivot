import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import Teacher from "./Teacher";

const TeacherList = (props) => {
    const teachers = props.teachers;
    const [searchCriteria, setSearchCriteria] =
        useState({teacherId: "", surname: "A", firstname: "", shortName: "", sex: ""});

    const updateFilter = (event) => {
        const {name, value} = event.target;
        console.log(event)
        setSearchCriteria({...searchCriteria, [name]: value})
    console.log(searchCriteria)
    }


return (
        <>
           <Row>
                <Col></Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter search criteria" name="surname"
                                  value={searchCriteria.surname} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter search criteria" name="firstname"
                                  value={searchCriteria.firstname} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter search criteria xxx" name="shortName"
                                  value={searchCriteria.shortName} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Enter search criteria" name="sex"
                                  value={searchCriteria.sex} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>TeacherId</Col>
                <Col>Surname</Col>
                <Col>Firstname</Col>
                <Col>Shortname</Col>
                <Col>Sex</Col>
                <Col>Actions</Col>
                <Col>Weiterleitung</Col>
            </Row>
            {/*{teachers.map(t => <SchoolClass teacher={t}></SchoolClass>)}*/}
            {/*  {teachers.filter(teacher => teacher.surname.includes(searchCriteria.surname)).map(teacher => <SchoolClass*/}
            {/*    teacher={teacher}/>)}*/}

            {teachers.filter(teacher => teacher.surname.includes(searchCriteria.surname) &&
                                teacher.firstname.includes(searchCriteria.firstname)     &&
                                teacher.shortName.includes(searchCriteria.shortName)     &&
                                 teacher.sex.includes(searchCriteria.sex))
                .map((teacher,index) => <Teacher    key = {teacher.teacherId}
                                            teacher={teacher}
                                            edit={props.edit}
                                            delete={props.delete}/>)}

        </>
    )
}

export default TeacherList;