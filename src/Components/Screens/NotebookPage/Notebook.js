import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const Notebook = () => {
  return (
    <Container className="my-3">
      <Row className="mb-3">
        <Col className="text-right">
          <Link to="/home">
            <i className="las la-arrow-left" /> Go Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col
          sm={12}
          lg={12}
          xl={12}
          md={12}
          className="no-gutters text-md-left text-center"
        >
          <h3>My Notes <i className="las la-plus cursor-pointer" /> </h3>
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Notebook);
