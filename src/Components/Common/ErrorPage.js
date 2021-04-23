import { Row, Col, Image, Button } from "react-bootstrap";
import ErrorPageImage from "../../Images/error.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Row>
        <Col className="text-center mt-3">
          <Image src={ErrorPageImage} alt="empty" className="w-50 p-5" />
          <h4 className="w-100 text-muted">Look Like You're lost</h4>
          <h5 className="w-100 mt-2 text-muted">
            The Page You Are Looking For Is Not Available!
          </h5>
          <Link to="/">
            <Button className="btn btn-dark  mt-2 ml-2 p-2">Home Page</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ErrorPage;
