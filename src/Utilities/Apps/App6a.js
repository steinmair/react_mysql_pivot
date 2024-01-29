
import '../../App.css';
import React, {useEffect} from "react";
import {Row, Button, Container} from "react-bootstrap";

const App6a = () =>{
// Komponente beginnt mit const dann schreiben wir eine funktion diese gibt einen return zurück und das ist unser jsx Code
// JSX ist die vermischung zwischen Java und HTML

// function incNew(){
//     setCounter(counter + 2);
// }
// --> normale Funktionen wie diese funktioniert auch noch, man muss nicht eine errorFunction verwenden
const inc = () =>
{
    console.log("inc2");
    setCounter(counter + 1);
}
    // Daten müssen in states gespeichert werden (wie z.B Liste der Teacher)
    // wir manipulieren diesen state und diese werden dann angezeigt

    // Mit einem HOOK können wir Änderungen mitloggen


    const[counter, setCounter] = React.useState(0);

// HOOK: diese Funktion wird bei jeder Änderung des Counters aufgerufen
    useEffect(() => {
        console.log("useEffect (counter); " + counter);
    }, [counter]);

    useEffect(() => {
        console.log("Starte")
    }, []);

    useEffect(() => {
        console.log("Es wurde gerade gerendert...")
    });

    return(
      <>
        <h1>Hello World 6a</h1>
        <h1>Hello World 6a ({new Date().toLocaleString()})</h1>
        <h1>Counter: ({counter})</h1>
          <Container>
              <Row>
                <Button variant="success" onClick={() => {console.log("inc1");
                                                                setCounter(counter + 1)}}>
                    Increment1
                </Button>
                <Button variant="success" onClick={inc}>Increment2</Button>

              </Row>
          </Container>
      </>
  );
}

export default App6a;

// use state mit [] Klammern => Array oder Liste
// use state mit {} Klammern => Objekt (zB json)
