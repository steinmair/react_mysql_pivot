import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import Student from "./Student";

const StudentList = (props) => {
    const students = props.students;
    const [searchCriteria, setSearchCriteria] =
        useState({surname: "", firstname: "", sex: ""});

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
                    <Form.Control type="text" placeholder="Surname" name="surname"
                                  value={searchCriteria.surname} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
               <Col>
                   <Form.Control type="text" placeholder="Firstname" name="firstname"
                                 value={searchCriteria.firstname} onChange={updateFilter} size="sm">
                   </Form.Control>
               </Col>
                <Col>
                    <Form.Control type="text" placeholder="Sex" name="sex"
                                  value={searchCriteria.sex} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>StudentID</Col>
                <Col>Surname</Col>
                <Col>Firstname</Col>
                <Col>Sex</Col>
                <Col>Schoolclass</Col>
                <Col>Department</Col>
                <Col>Actions</Col>
                <Col>DETAIL</Col>
            </Row>
            {/*{teachers.map(t => <SchoolClass teacher={t}></SchoolClass>)}*/}
            {/*  {teachers.filter(teacher => teacher.surname.includes(searchCriteria.surname)).map(teacher => <SchoolClass*/}
            {/*    teacher={teacher}/>)}*/}

            {students.filter(student => student.surname.includes(searchCriteria.surname) &&
                                student.firstname.includes(searchCriteria.firstname)     &&
                                 student.sex.includes(searchCriteria.sex))
                .map((student,index) => <Student    index = {index}
                                                    key = {student.teacherId}
                                                    student={student}
                                                    edit={props.edit}
                                                    delete={props.delete}/>)}

        </>
    )
}

export default StudentList;