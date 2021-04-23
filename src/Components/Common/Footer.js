import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            A Project by Smile Gupta
            <br />
            <a
              href="https://codepen.io/smilegupta"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i className="lab la-codepen" style={{ fontSize: "16px" }} />{" "}
            </a>
            <a
              href="https://github.com/smilegupta"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i className="lab la-github" style={{ fontSize: "16px" }} />{" "}
            </a>
            <a
              href="https://smilegupta.hashnode.dev/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i
                className="lab la-blogger-b"
                style={{ fontSize: "16px" }}
              />{" "}
            </a>
            <a
              href="https://www.linkedin.com/in/smilegupta/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i
                className="lab la-linkedin-in"
                style={{ fontSize: "16px" }}
              />{" "}
            </a>
            <a
              href="https://smilegupta.github.io/portfolio-smilegupta/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i className="las la-globe" style={{ fontSize: "16px" }} />{" "}
            </a>
            <a
              href="https://twitter.com/smileguptaaa"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <i className="lab la-twitter" style={{ fontSize: "16px" }} />{" "}
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
