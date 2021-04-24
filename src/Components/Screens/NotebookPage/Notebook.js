import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const Notebook = () => {
  return (
    <Fragment>
      <Row className="mb-3">
        <Col className="text-right">
          <Link to="/">
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
    </Fragment>
  );
};

export default withRouter(Notebook);
