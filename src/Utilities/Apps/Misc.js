import React from "react";
import {Link, useLocation} from "react-router-dom";
// import {Spinner} from 'react-bootstrap';

const LoadState = Object.freeze({
  Load: "load",
  Error: "error",
  Show: "show"
});

const LoadCrudState = Object.freeze({
  Add: "add",
  Edit: "edit",
  Delete: "delete",
  Blank: "blank",
  Error: "error",
});

const Error = (props) => {
    return (
        <>
            <h1 className="alert alert-danger">{props.message}</h1>
        </>
    );
};

const Loading = (props) => {
    return (
        <>
            <h1 className="alert alert-primary">Loading data ({props.page})</h1>
        </>
    );
};

const PageNotFound = () => {
    const location = useLocation();
    // console.log(location);

    return (
        <>
            {/*<h1>Page not found!</h1>*/}
            <img src="../images/StudentsAtWork.jpg" alt="Caution! Students at work."/>
            <h1>Page {location.pathname} not found!</h1>
            <h2>
                    But they are hopefully fixing the error <span style={{fontsize: "30px"}}>&#128514;</span>
            </h2>
            <Link to="/">Home</Link>
        </>
    );
};

function showLog(message) {
    console.log(message);
}

function showError(message) {
    console.log(message);
}

function getTimeMessage(message) {
    return message + " (" + (new Date().toLocaleString()) + ")";
}

const exportedObject = {
    LoadState,
    LoadCrudState,
    Error,
    Loading,
    PageNotFound,
    showLog, showError, getTimeMessage
};

export default exportedObject;

