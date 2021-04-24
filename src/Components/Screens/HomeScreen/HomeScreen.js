import { Fragment, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { notebooks } from '../../../helper'
import NotebookCard from '../../Common/NotebookCard';
import CreateNotebook from "../../Modals/CreateNotebook";

const HomeScreen = ({ auth }) => {

  // State Variables
  const userId = auth.user.attributes.sub;
  const [modalStatus, setModalStatus] = useState(false);

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
            My Notebooks  <i className="las la-plus cursor-pointer" onClick={() => setModalStatus(true)} />
          </h3>
          <br />
        </Col>
      </Row>
      <Row>
        {
          notebooks.map((notebook, idx) => (
            <Col sm={6} lg={3} xl={3} md={4} xs={8} className="no-gutters mx-md-0 mx-auto" key={idx}>
               <Link to={`/notebook/${notebook.notebookId}`} >
                <NotebookCard name={notebook.name} notesCount={notebook.notesCount} pattern={notebook.pattern} />
              </Link>
            </Col>
          ))
        }
        <Col sm={6} lg={3} xl={3} md={4} xs={8} className="no-gutters mx-md-0 mx-auto"  onClick={() => setModalStatus(true)}>
        <div className="card notebook-card shadow mb-4 notebook-empty d-flex align-items-center justify-content-center">
          <i className="las la-plus-circle cursor-pointer" style={{fontSize: "22px"}}  />
            Create Notebook
        </div>
        </Col>
      </Row>
      <CreateNotebook
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        userId={userId}
      />
    </Fragment>
  )
}

export default withRouter(HomeScreen)
