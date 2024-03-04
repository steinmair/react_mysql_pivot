import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Main = () => {

    return(
      <>
          <Row>
              <Col sm={3}>
                  <ul>
                      <li><Link to="/teachers">teachers</Link></li>
                      <li><Link to="/schoolClasses">schoolClasses</Link></li>
                      <li><Link to="/departments/1/schoolClasses">Schulklassen der BG</Link></li>
                  </ul>
              </Col>
          </Row>
      </>
    );

}
export default Main;