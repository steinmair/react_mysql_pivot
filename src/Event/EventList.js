import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import Event from "./Event";


const EventList = (props) => {
    const events = props.events;
    const [searchCriteria, setSearchCriteria] =
        useState({eventId: "", createdBy: "", dateCreated:"", schoolClass: "", dateFrom: "", dateTo:"", destination:"", description:""});

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
                <Col>EventId</Col>
                <Col>CreatedBy</Col>
                <Col>DateCreated</Col>
                <Col>SchoolClass</Col>
                <Col>DateFrom</Col>
                <Col>DateTo</Col>
                <Col>Destination</Col>
                <Col>Description</Col>
                <Col>Actions</Col>
            </Row>


            {events.filter(event =>
                event.name.includes(searchCriteria.name)
                )
                .map((event, index) => (
                    <Event
                        key={event.eventId}
                        index={index}
                        event={event}
                        delete={props.delete}
                        edit={props.edit}
                    />
                ))
            }

        </>
    )
}

export default EventList;