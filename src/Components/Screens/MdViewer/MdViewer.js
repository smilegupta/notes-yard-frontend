import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { markdownText } from "../../../helper";

const MdViewer = () => {
  // State Variables
  const [markdown, setMarkdown] = useState(markdownText);

  // Function to Download Markdown File
  const markdownDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Container className="my-3">
      <Row className="mb-3">
        <Col className="text-right">
          <Link to="/">
            <i className="las la-arrow-left" /> Go Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={12} xl={12} md={12} className="no-gutters">
          <h4>MD Viewer  <i className="las la-download cursor-pointer" onClick={() => markdownDownload()} /> </h4>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6} xl={6} md={6} xs={12}>
          <textarea
            style={{ borderRadius: "0px", minHeight: "70vh" }}
            className="form-control w-100 h-100 p-4"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </Col>
        <Col sm={12} lg={6} xl={6} md={6} xs={12}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  );
};

export default MdViewer;
