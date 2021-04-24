import { Fragment } from 'react'
import { Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { notebooks } from '../../../dummyData'

const HomeScreen = () => {
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
        <Col sm={12} lg={12} xl={12} md={12} className="no-gutters text-md-left text-center">
          <h3>
            My Notebooks <i className="las la-plus"></i>
          </h3>
          <br />
        </Col>
      </Row>
      <Row>
        {
          notebooks.map((notebook, idx) => (
            <Col sm={6} lg={3} xl={3} md={4} xs={8} className="no-gutters mx-md-0 mx-auto" key={idx}>
              <div className="card notebook-card shadow mb-4" style={{ backgroundImage: `url(${notebook.patternType})` }}>
                <div className="notebook-cover">
                  <div className="notebook-nameslip p-2">
                    <h4> {notebook.name} </h4>
                    <h6>{notebook.sheetsCount} Notes</h6>
                  </div>
                  <div className="notebook-bookmark">
                    ...
                  </div>
                </div>
              </div>
            </Col>
          ))
        }
        <Col sm={6} lg={3} xl={3} md={4} xs={8} className="no-gutters mx-md-0 mx-auto">
        <div className="card notebook-card shadow mb-4 notebook-empty d-flex align-items-center justify-content-center">
          <i className="las la-plus-circle" style={{fontSize: "22px"}} />
            Create Notebook
        </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default withRouter(HomeScreen)
