import React, {useState} from 'react'
import {Col, Row,Form} from "react-bootstrap";
import Absence from "./Event";
import Event from "./Event";

const EventList = (props) => {
    const events = props.events;
    const [searchCriteria, setSearchCriteria] =
        useState({destination: ""});

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
                    <Form.Control type="text" placeholder="Destination" name="destination"
                                  value={searchCriteria.destination} onChange={updateFilter} size="sm">
                    </Form.Control>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col><h5>SchoolClass</h5></Col>
                <Col><h5>Event ID</h5></Col>
                <Col><h5>Von</h5></Col>
                <Col><h5>Bis</h5></Col>
                <Col><h5>Ziel</h5></Col>
                <Col><h5>Beschreibung</h5></Col>
                <Col><h5>Actions</h5></Col>

            </Row>
            {events.filter(a => a.destination.includes(searchCriteria.destination) )
                .map((event,index) => <Event index = {index}
                                                 key = {event.schoolClassId}
                                                 event={event}
                                                 edit={props.edit}
                                                 delete={props.delete}/>)}
        </>
    )
}

export default EventList;