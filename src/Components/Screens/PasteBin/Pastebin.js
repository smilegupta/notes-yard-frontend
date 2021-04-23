import { Fragment } from 'react'
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pastebin = () => {
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
                <Col sm={12} lg={12} xl={12} md={12} className="no-gutters">
                    <h4>
                        Paste Bin
                    </h4>
                    <br />
                </Col>
            </Row>
        </Fragment>
    )
}

export default Pastebin
