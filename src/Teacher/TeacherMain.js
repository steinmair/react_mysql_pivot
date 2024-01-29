import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import TeacherDataService from "../Services/TeacherDataService";
import data from "bootstrap/js/src/dom/data";
import {forEach} from "react-bootstrap/ElementChildren";

const TeacherMain = () => {
    // Zustände (States)
    const [teachers, setTeachers] = useState([]);

    // Business Logic
    // Lade die Liste der Teacher
    // fetch con React oder Methoden von Axios

    useEffect(() => {
        // lade die Liste der Teacher
        load();
    }, []);

    const load = async () => {
        console.log("loadA");
        TeacherDataService.getAll()
            .then(response =>setTeachers(response.data))
            .then(() => console.log(teachers.length));
        console.log("laodZ");

    }
    // Layout
    return(
          <>
            <h1>Lehrer/innen: {teachers.length}</h1>
          </>
      );
}

export default TeacherMain;