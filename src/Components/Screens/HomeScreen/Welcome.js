import { Row, Col, Image, Button, Container } from "react-bootstrap";
import HomeScreenImage from "../../../Images/homescreen.svg";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Container className="my-5">
    <Row>
      <Col className="text-center mt-3">
        {" "}
        <Image src={HomeScreenImage} alt="empty" className="w-50" />
        <h3 className="w-100 mt-md-4 mt-2">Welcome to Notes Yard</h3>
        <h6 className="w-100 mt-2 text-muted">
          Scribble Notes and Share Instatnously
        </h6>
        <h6 className="w-100 mt-2 text-muted">
          Make Markdown Files are Preview Them
        </h6>
        <h6 className="w-100 mt-2 text-muted">
          Makes Notebooks and Take Private Notes
        </h6>
        <Link to="/pastebin">
          <Button className="btn btn-dark  mt-2 ml-2 p-3"> Pastebin </Button>
        </Link>
        <Link to="/md-previewer">
          <Button className="btn btn-dark mt-2 ml-2 p-3">
            {" "}
            MD Previewer{" "}
          </Button>
        </Link>
      </Col>
    </Row>
     </Container>
  );
};

export default Welcome;
